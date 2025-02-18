'use client';

import React, { useEffect, useState } from 'react';
import ProductReviewAnalytics from '../../../components/reviews/ProductReviewAnalytics';
import {
  IProduct,
  IProductReview,
  IProductReviewFilterOption,
} from '@repo/ui/types';
import ProductReviewForm from './ProductReviewForm';
import ProductReviewCard from '../../../components/reviews/ProductReviewCard';
import { Button } from '../../../../ui/components/ui/button';
import SortReviewDropDown from '../../../components/reviews/SortReviewDropdown';
import CustomPagination from '../../../components/common/CustomPagination';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { routes } from '@repo/ui/lib/constants';

const filterOptionsData: IProductReviewFilterOption[] = [
  {
    id: 0,
    name: 'Recent Review',
    value: 'Recent Review',
    isSelected: false,
  },
  {
    id: 1,
    name: 'Photo Review',
    value: 'Photo Review',
    isSelected: false,
  },
  {
    id: 2,
    name: 'Text Review',
    value: 'Text Review',
    isSelected: false,
  },
  {
    id: 3,
    name: 'Top Rated',
    value: 'Top Rated',
    isSelected: false,
  },
];

const ProductReviews = ({
  product,
  reviews = [],
}: {
  product: IProduct;
  reviews: IProductReview[];
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showFeedbackForm, setShowFeedBackForm] = useState<boolean>(false);
  const [productReviews, setProductReviews] =
    useState<IProductReview[]>(reviews);

  const [filterOptions, setFilterOptions] = useState(filterOptionsData);
  const [filteredProductReviews, setFilteredProductReviews] = useState<
    IProductReview[]
  >([]);

  useEffect(() => {
    setProductReviews(reviews);
  }, [reviews]);

  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash === '#product-detail-reviews') {
      const element = document.getElementById('product-detail-reviews');
      if (element) {
        // Calculate the position to scroll to (200px above the element)
        const offset = 40;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const scrollPosition = elementPosition - offset;

        // Smoothly scroll to the calculated position
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  useEffect(() => {
    // Recent Review
    if (filterOptions[0].isSelected) {
      const recentReviews = reviews.slice().sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        const bDate = new Date(b.createdAt);
        const aDate = new Date(a.createdAt);
        return bDate.getTime() - aDate.getTime();
      });
      setFilteredProductReviews(recentReviews);
      return;
    }

    // Photo Review
    if (filterOptions[1].isSelected) {
      setFilteredProductReviews(
        reviews.filter((a) => {
          return a.media_urls.length > 0;
        }),
      );
      return;
    }

    // Text Review
    if (filterOptions[2].isSelected) {
      setFilteredProductReviews(
        reviews.filter((a) => {
          return a.media_urls.length == 0;
        }),
      );
      return;
    }

    // Top Rated
    if (filterOptions[3].isSelected) {
      const topRatedReviews = reviews
        .slice()
        .sort((a, b) => b.rating - a.rating);
      setFilteredProductReviews(topRatedReviews);
      return;
    }

    // If no option is selected then we should reset
    setFilteredProductReviews(reviews);
  }, [filterOptions]);

  function countRatings(reviews: IProductReview[]) {
    // Initialize an array to hold counts for each rating
    const ratingCounts = Array.from({ length: 5 }, () => ({
      count: 0,
      rating: 0,
    }));

    let totalRatings = 0;

    reviews.forEach((review) => {
      // Determine the index in the ratingCounts array based on the rating (scaled by 2 for 0.5 increments)
      totalRatings += review.rating;
      const index = Math.round(review.rating) - 1;
      // Increment the count for the corresponding rating
      ratingCounts[index].count++;
      ratingCounts[index].rating += review.rating;
    });

    // Format the result in the desired structure
    const result = ratingCounts.map((item, index) => ({
      count: item.count,
      rating: item.count == 0 ? 0 : item.rating / item.count,
    }));

    // Return the formatted result
    return {
      averageRating: reviews.length == 0 ? 0 : totalRatings / reviews.length,
      reviewsCount: reviews.length,
      result,
    };
  }

  const analyticsData = countRatings(reviews);

  const userAlreadyReviewed = reviews.find(
    (review) => review.user.email == session?.user?.email,
  );

  return (
    <>
      <h1
        id="product-detail-reviews"
        className="text-center md:text-6xl text-5xl mt-4 md:my-0 py-3 md:py-4 md:mt-5 text-tertiary-green font-cheri "
      >
        Reviews
      </h1>
      <div className="flex sm:flex-row flex-col  px-3 sm:px-0 w-full justify-center mx-auto">
        {reviews.length > 0 && <ProductReviewAnalytics data={analyticsData} />}
        <div>
          <div className="flex flex-row-reverse gap-2 items-center md:justify-normal justify-between">
            {!showFeedbackForm && (
              <Button
                disabled={userAlreadyReviewed ? true : false}
                onClick={() => {
                  if (userAlreadyReviewed) {
                    return;
                  }

                  if (session?.user.id && !userAlreadyReviewed) {
                    setShowFeedBackForm(true);
                  } else {
                    router.push(
                      `${routes.login}?redirect=${routes.productDetail}/${product.id}`,
                    );
                  }
                }}
                className="font-heyComic lg:w-56 text-lg hover:bg-primary-color bg-tertiary-green text-white rounded-full"
              >
                {userAlreadyReviewed ? 'Already Reviewed' : 'Write a Review'}
              </Button>
            )}

            {reviews.length > 0 && (
              <SortReviewDropDown
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                className="lg:w-44 h-10 w-32 border-2 border-secondary-color"
                label="Sort By"
              />
            )}

            {reviews.length == 0 && !showFeedbackForm && (
              <div className="text-center px-5 font-heyComic text-lg md:text-4xl text-tertiary-red">
                No reviews yet
              </div>
            )}
          </div>

          {session?.user?.id && showFeedbackForm ? (
            <ProductReviewForm
              onCancel={() => {
                setShowFeedBackForm(false);
              }}
              product={product}
            />
          ) : (
            <>
              {filteredProductReviews?.map((a) => (
                <ProductReviewCard key={a.id} review={a} />
              ))}
            </>
          )}

          {productReviews.length > 0 && (
            <CustomPagination
              defaultPage={1}
              items={productReviews}
              itemsPerPage={3}
              onChangePage={(value: IProductReview[]) => {
                setFilteredProductReviews(value);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
