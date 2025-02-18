import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  Between,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Or,
  Repository,
} from 'typeorm';
import { ProductCategoryService } from '../product-category/product-category.service';
import { ProductAgeService } from '../product-age/product-age.service';
import { ProductInterestService } from '../product-interest/product-interest.service';
import {
  GetProductFilterDto,
  GetProductsQueryDto,
} from './dto/get-product-filters.dto';
import { FileService } from '../file/file.service';
import { ProductAdditionalInfo } from './entities/product-additional-info.entity';
import { ProductAdditionalInfoTab } from './entities/product-additional-info-tab.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

const relations = ['categories', 'images', 'benefits', 'interests', 'ages'];

const additionalFields = [
  'reviews',
  'additionalInfo',
  'additionalInfo.tabs',
  'additionalInfo.tabs.images',
];

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private readonly productCategoryService: ProductCategoryService,
    private readonly productAgeService: ProductAgeService,
    private readonly productInterestService: ProductInterestService,
    private readonly fileService: FileService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      imageIds,
      benefitIds,
      categoryIds,
      interestIds,
      ageIds,
      additionalInfo,
      ...productData
    } = createProductDto;

    return await this.productRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // -------------------------------------------------------------------------
        // SAVE THE PRODUCT
        // -------------------------------------------------------------------------
        const newProduct = transactionalEntityManager.create(
          Product,
          productData,
        );
        const savedProduct = await transactionalEntityManager.save(newProduct);

        // -------------------------------------------------------------------------
        // VALIDATE AND SAVE IMAGES
        // -------------------------------------------------------------------------
        const productImages = await this.fileService.findByIds(imageIds);
        if (productImages.length !== imageIds.length) {
          throw new NotFoundException('One or more images not found');
        }

        // if (!productImages.every((image) => image.type !== FileType.product)) {
        //   throw new BadRequestException('Invalid images for product');
        // }

        savedProduct.images = productImages;

        // -------------------------------------------------------------------------
        // VALIDATE AND SAVE BENEFITS
        // -------------------------------------------------------------------------
        const productBenefits = await this.fileService.findByIds(benefitIds);
        if (productBenefits.length !== benefitIds.length) {
          throw new NotFoundException('One or more benefits not found');
        }

        // if (!productImages.every((image) => image.type !== FileType.product)) {
        //   throw new BadRequestException('Invalid images for product');
        // }

        savedProduct.benefits = productBenefits;

        // -------------------------------------------------------------------------
        // VALIDATE AND SAVE CATEGORIES
        // -------------------------------------------------------------------------
        if (Array.isArray(categoryIds) && categoryIds.length) {
          const productCategories =
            await this.productCategoryService.findByIds(categoryIds);
          if (productCategories.length !== categoryIds.length) {
            throw new NotFoundException('One or more categories not found');
          }
          savedProduct.categories = productCategories;
        }

        // -------------------------------------------------------------------------
        // VALIDATE AND SAVE INTERESTS
        // -------------------------------------------------------------------------
        if (Array.isArray(interestIds) && interestIds.length) {
          const productInterests =
            await this.productInterestService.findByIds(interestIds);
          if (productInterests.length !== interestIds.length) {
            throw new NotFoundException('One or more interests not found');
          }
          savedProduct.interests = productInterests;
        }

        // -------------------------------------------------------------------------
        // VALIDATE AND SAVE AGES
        // -------------------------------------------------------------------------
        if (Array.isArray(ageIds) && ageIds.length) {
          const productAges = await this.productAgeService.findByIds(ageIds);
          if (productAges.length !== ageIds.length) {
            throw new NotFoundException('One or more ages not found');
          }
          savedProduct.ages = productAges;
        }

        await transactionalEntityManager.save(savedProduct);

        // -------------------------------------------------------------------------
        // SAVE ADDITIONAL INFO
        // -------------------------------------------------------------------------
        if (Array.isArray(additionalInfo) && additionalInfo.length) {
          for (const singleAdditionalInfo of additionalInfo) {
            const { tabs, ...additionalInfoData } = singleAdditionalInfo;
            const newAdditionalInfo = transactionalEntityManager.create(
              ProductAdditionalInfo,
              {
                ...additionalInfoData,
                product: savedProduct,
              },
            );

            const savedAdditionalInfo =
              await transactionalEntityManager.save(newAdditionalInfo);

            const newAdditionalInfoTabs = [];
            if (Array.isArray(tabs) && tabs.length) {
              for (const additionalInfoTab of tabs) {
                const { imageIds, ...additionalInfoTabData } =
                  additionalInfoTab;
                const additionalInfoTabImages =
                  await this.fileService.findByIds(imageIds);
                if (additionalInfoTabImages.length !== imageIds.length) {
                  throw new NotFoundException(
                    'One or more images for additional info tab not found',
                  );
                }
                const newAdditionalInfoTab = transactionalEntityManager.create(
                  ProductAdditionalInfoTab,
                  {
                    ...additionalInfoTabData,
                    additionalInfo: savedAdditionalInfo,
                    images: additionalInfoTabImages,
                  },
                );
                newAdditionalInfoTabs.push(newAdditionalInfoTab);
              }
              // Save the additional info tabs for product additional info
              await transactionalEntityManager.save(newAdditionalInfoTabs);
            }
            savedAdditionalInfo.tabs = newAdditionalInfoTabs;
          }
        }

        return transactionalEntityManager.findOne(Product, {
          where: { id: savedProduct.id },
          relations,
        });
      },
    );
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: [...relations, 'reviews'],
    });

    // Add review count and average rating to products
    return products.map((product) =>
      this.calculateReviewCountAndAverageRating(product, true),
    );
  }

  async findOne(options: FindOneOptions<Product>) {
    if (!options.relations)
      options.relations = [...relations, ...additionalFields];
    const product = await this.productRepository.findOne(options);

    if (product) {
      return this.calculateReviewCountAndAverageRating(product);
    }

    return product;
  }

  findByIds(ids: number[], options?: FindManyOptions<Product>) {
    if (!options.relations) options.relations = relations;
    return this.productRepository.find({ where: { id: In(ids) }, ...options });
  }

  findPaginated(options: IPaginationOptions, query: GetProductsQueryDto) {
    const where: FindOptionsWhere<Product> = {};

    // Product Age
    if (Array.isArray(query.ageIds) && query.ageIds.length) {
      where.ages = { id: In(query.ageIds) };
    }

    // Product Category
    if (Array.isArray(query.categoryIds) && query.categoryIds.length) {
      where.categories = { id: In(query.categoryIds) };
    }

    // Product Interest
    if (Array.isArray(query.interestIds) && query.interestIds.length) {
      where.interests = { id: In(query.interestIds) };
    }

    // Price
    if (query.prices?.length) {
      where.price = Or(
        ...query.prices.map((range) => Between(range.min, range.max)),
      );
    }

    return paginate<Product>(this.productRepository, options, {
      where,
      relations,
      order: { id: 'ASC' },
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Find the existing product
        const existingProduct = await transactionalEntityManager.findOne(
          Product,
          {
            where: { id },
            relations: [...relations, ...additionalFields],
          },
        );

        if (!existingProduct) {
          throw new NotFoundException(`Product with id ${id} not found`);
        }

        const {
          imageIds,
          benefitIds,
          // moreWaysToPlay,
          categoryIds,
          interestIds,
          ageIds,
          // additionalInfo,
          ...productData
        } = updateProductDto;

        // Update product properties
        Object.assign(existingProduct, productData);

        // Handle images
        if (imageIds) {
          const productImages = await this.fileService.findByIds(imageIds);
          if (productImages.length !== imageIds.length) {
            throw new NotFoundException('One or more images not found');
          }
          existingProduct.images = productImages;
        }

        // Handle benefits
        if (benefitIds) {
          const productBenefits = await this.fileService.findByIds(benefitIds);
          if (productBenefits.length !== benefitIds.length) {
            throw new NotFoundException('One or more benefits not found');
          }
          existingProduct.benefits = productBenefits;
        }

        // Handle moreWaysToPlay
        // if (moreWaysToPlay) {
        //   if (moreWaysToPlay.imageId) {
        //     const moreWaysToPlayImage = await this.fileService.findOne(
        //       moreWaysToPlay.imageId,
        //     );
        //     if (!moreWaysToPlayImage) {
        //       throw new NotFoundException(
        //         'Image not found for product more ways to play',
        //       );
        //     }
        //     moreWaysToPlay.image = moreWaysToPlayImage;
        //   }

        //   const existingMoreWaysToPlay =
        //     await transactionalEntityManager.findOne(ProductMoreWaysToPlay, {
        //       where: { product: existingProduct },
        //     });

        //   if (existingMoreWaysToPlay) {
        //     Object.assign(existingMoreWaysToPlay, moreWaysToPlay);
        //     await transactionalEntityManager.save(existingMoreWaysToPlay);
        //   } else {
        //     const newMoreWaysToPlay = transactionalEntityManager.create(
        //       ProductMoreWaysToPlay,
        //       {
        //         ...moreWaysToPlay,
        //         product: existingProduct,
        //       },
        //     );
        //     await transactionalEntityManager.save(newMoreWaysToPlay);
        //   }
        // }

        // Handle categories
        if (Array.isArray(categoryIds)) {
          const productCategories =
            await this.productCategoryService.findByIds(categoryIds);
          if (productCategories.length !== categoryIds.length) {
            throw new NotFoundException('One or more categories not found');
          }
          existingProduct.categories = productCategories;
        }

        // Handle interests
        if (Array.isArray(interestIds)) {
          const productInterests =
            await this.productInterestService.findByIds(interestIds);
          if (productInterests.length !== interestIds.length) {
            throw new NotFoundException('One or more interests not found');
          }
          existingProduct.interests = productInterests;
        }

        // Handle ages
        if (Array.isArray(ageIds)) {
          const productAges = await this.productAgeService.findByIds(ageIds);
          if (productAges.length !== ageIds.length) {
            throw new NotFoundException('One or more ages not found');
          }
          existingProduct.ages = productAges;
        }

        // Handle additional info
        // if (Array.isArray(additionalInfo) && additionalInfo.length) {
        //   // Delete existing additional info for this product
        //   await transactionalEntityManager.delete(ProductAdditionalInfo, {
        //     product: existingProduct,
        //   });

        //   for (const singleAdditionalInfo of additionalInfo) {
        //     const { tabs, ...additionalInfoData } = singleAdditionalInfo;
        //     const newAdditionalInfo = transactionalEntityManager.create(
        //       ProductAdditionalInfo,
        //       {
        //         ...additionalInfoData,
        //         product: existingProduct,
        //       },
        //     );

        //     const savedAdditionalInfo =
        //       await transactionalEntityManager.save(newAdditionalInfo);

        //     const newAdditionalInfoTabs = [];
        //     if (Array.isArray(tabs) && tabs.length) {
        //       for (const additionalInfoTab of tabs) {
        //         const { imageIds, ...additionalInfoTabData } =
        //           additionalInfoTab;
        //         const additionalInfoTabImages =
        //           await this.fileService.findByIds(imageIds);
        //         if (additionalInfoTabImages.length !== imageIds.length) {
        //           throw new NotFoundException(
        //             'One or more images for additional info tab not found',
        //           );
        //         }
        //         const newAdditionalInfoTab = transactionalEntityManager.create(
        //           ProductAdditionalInfoTab,
        //           {
        //             ...additionalInfoTabData,
        //             additionalInfo: savedAdditionalInfo,
        //             images: additionalInfoTabImages,
        //           },
        //         );
        //         newAdditionalInfoTabs.push(newAdditionalInfoTab);
        //       }
        //       // Save the additional info tabs for product additional info
        //       await transactionalEntityManager.save(newAdditionalInfoTabs);
        //     }
        //     savedAdditionalInfo.tabs = newAdditionalInfoTabs;
        //   }
        // }

        // Clear the get products cache
        await this.cacheManager.del('products');

        // Save the updated product
        return transactionalEntityManager.save(existingProduct);
      },
    );
  }

  async remove(id: number) {
    const deleted = await this.productRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Clear the get products cache
    await this.cacheManager.del('products');

    return;
  }

  async getFilters(): Promise<GetProductFilterDto> {
    const categories = await this.productCategoryService.findAll();
    const ages = await this.productAgeService.findAll();
    const interests = await this.productInterestService.findAll();
    const max = await this.productRepository.maximum('price');

    const prices: Array<{ min: number; max: number }> = [];
    if (!isNaN(max)) {
      let i = 0;
      while (i <= max) {
        prices.push({ min: i, max: i + 500 - 1 });
        i = i + 500;
      }
    }

    return {
      categories,
      ages,
      interests,
      prices,
    };
  }

  private calculateReviewCountAndAverageRating(
    product: Product,
    deleteReviews = false,
  ) {
    let totalRating = 0;
    let reviewCount = 0;

    for (const review of product.reviews) {
      totalRating += review.rating;
      reviewCount++;
    }

    product.reviewCount = reviewCount;
    product.averageRating = 0;
    if (reviewCount > 0) product.averageRating = totalRating / reviewCount;

    if (deleteReviews) delete product.reviews;
    return product;
  }
}
