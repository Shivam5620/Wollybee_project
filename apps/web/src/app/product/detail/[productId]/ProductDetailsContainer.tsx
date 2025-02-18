import { IProduct, IProductReview } from '@repo/ui/types';
import ProductImagesView from './ProductImagesView';
import ProductDetailView from './ProductDetailView';
import ProductDetailAccordion from './ProductDetailAccordion';
import MobileProductDetailAccordion from './MobileProductDetailAccordion';
import ProductBasketTracker from './ProductBasketTracker';
import ProductReviews from './ProductReviews';
import ProductsCarousel from './ProductsCarousel';
import SetProductContainer from './SetProductContainer';
import ProductBenefitsWrapper from './ProductBenefitsWrapper';

// This is a Server Component

const ProductDetailsContainer = ({
  product,
  reviews,
}: {
  product: IProduct;
  reviews: IProductReview[];
}) => {
  return (
    <div className="w-full md:my-10 justify-center overflow-hidden">
      <SetProductContainer product={product} />
      <div className="flex xl:px-[10%] lg:gap-10 gap-5 justify-between md:flex-row flex-col">
        <ProductImagesView images={product.images} />
        <ProductDetailView product={product} />
      </div>

      <ProductBasketTracker product={product} />
      {product.additionalInfo.length > 0 && (
        <MobileProductDetailAccordion product={product} />
      )}
      {product.additionalInfo.length > 0 && (
        <ProductDetailAccordion product={product} />
      )}
      <ProductBenefitsWrapper />
      <ProductsCarousel />
      <ProductReviews product={product} reviews={reviews} />
    </div>
  );
};

export default ProductDetailsContainer;
