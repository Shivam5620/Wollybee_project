'use client';
import {
  IProduct,
  IProductAge,
  IProductCategory,
  IProductInterest,
} from '@repo/ui/types';
import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';
import ProductAdditionalInfo from './ProductAdditionalInfo';
import ProductMoreWaysToPlay from './ProductMoreWaysToPlay';
import ProductBenefits from './ProductBenefits';
import { IFile } from '@repo/ui/types/file';
import { Product } from '@repo/ui/enums';
import ProductCategoryContainerSelector from './ProductCategorySelectorContainer';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../../components/ui/accordion';
import { Button } from '../../../../components/ui/button';
import Loader from '../../components/common/Loader';
import { createProduct, editProduct } from './product.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { dashboardRoutes } from '@repo/ui/lib';

interface IProductDetailsContainerProps {
  product: IProduct;
  images: IFile[];
  type: Product;
  categories: IProductCategory[];
  ages: IProductAge[];
  interests: IProductInterest[];
  label?: string;
}
const ProductDetailsContainer = ({
  label = '',
  product,
  images,
  type = Product.READ,
  categories,
  ages,
  interests,
}: IProductDetailsContainerProps) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<IProduct>(product);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    // Write logic for validation.
    if (type == Product.UPDATE || type == Product.CREATE) {
      // product images
      const images = formValues.images.map((a) => {
        return a.id;
      });

      // additional info
      const additionalInfo = formValues.additionalInfo.map((a) => {
        const data = a.tabs.map((b) => {
          return {
            ...b,
            imageIds: b.images.map((c) => {
              return c.id;
            }),
          };
        });

        return {
          title: a.title,
          color: a.color,
          tabs: data,
        };
      });

      // benefits
      const benefits = formValues.benefits.map((a) => a.id);

      // categories
      const categories = formValues.categories.map((a) => a.id);
      // ages
      const ages = formValues.ages.map((a) => a.id);
      // categories
      const interests = formValues.interests.map((a) => a.id);

      const requestPayload = {
        name: formValues.name,
        description: formValues.description,
        discountedPrice: formValues.discountedPrice,
        discountPercentage: formValues.discountPercentage,
        minPlayers: formValues.minPlayers,
        maxPlayers: formValues.maxPlayers,
        price: formValues.price,
        imageIds: images,
        additionalInfo,
        moreWaysToPlayDescription: formValues.moreWaysToPlayDescription,
        moreWaysToPlayUrl: formValues.moreWaysToPlayUrl,
        benefitIds: benefits,
        categoryIds: categories,
        ageIds: ages,
        interestIds: interests,
      };
      setLoading(true);
      const data =
        type == Product.CREATE
          ? await createProduct(requestPayload)
          : await editProduct({ id: product.id, payload: requestPayload });
      if ('error' in data) {
        toast(data.error.message);
        router.push(`${dashboardRoutes.products}`);
      }
      if ('success' in data) {
        toast(data.message);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader
        text={
          type == Product.CREATE ? 'Creating Product..' : 'Editing Product..'
        }
      />
    );
  }

  return (
    <div>
      <section className="flex justify-between">
        {label && (
          <label className="font-bold text-lg text-secondary-color">
            {label}
          </label>
        )}

        {type != Product.READ && (
          <>
            <Button
              className="bg-primary-color text-black hover:text-white"
              onClick={handleSubmit}
            >
              {type == Product.CREATE ? 'CREATE PRODUCT' : 'EDIT PRODUCT'}
            </Button>
          </>
        )}
      </section>

      <Accordion type="single" collapsible>
        <AccordionItem value="product-details">
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent>
            <ProductDetails
              type={type}
              initialValues={formValues}
              setFormValues={setFormValues}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-images">
          <AccordionTrigger>Product Images</AccordionTrigger>
          <AccordionContent>
            <ProductImages
              images={images}
              type={type}
              initialValues={formValues}
              setFormValues={setFormValues}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-more-ways-to-play">
          <AccordionTrigger>Product More ways to play</AccordionTrigger>
          <AccordionContent>
            <ProductMoreWaysToPlay
              type={type}
              initialValues={formValues}
              setFormValues={setFormValues}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-benefits">
          <AccordionTrigger>Product Benefits</AccordionTrigger>
          <AccordionContent>
            <ProductBenefits
              setFormValues={setFormValues}
              images={images}
              type={type}
              initialValues={formValues}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-additional-info">
          <AccordionTrigger>Product Additional Info</AccordionTrigger>
          <AccordionContent>
            <ProductAdditionalInfo
              setFormValues={setFormValues}
              images={images}
              type={type}
              initialValues={formValues}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-categories">
          <AccordionTrigger>Product Categories</AccordionTrigger>
          <AccordionContent>
            <div className="shadow-lg p-5">
              <ProductCategoryContainerSelector
                setFormValues={setFormValues}
                categories={categories}
                ages={ages}
                interests={interests}
                type={type}
                initialValues={formValues}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductDetailsContainer;
