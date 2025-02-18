import { IFilterClient, IProduct } from '@repo/ui/types';

export function IsFiltersSelected(
  filterState: IFilterClient,
  checkCommon: boolean,
) {
  const isCategoriesSelected = filterState.categories.find((a) => a.isSelected);
  const isAgesSelected = filterState.ages.find((a) => a.isSelected);
  const isInterestsSelected = filterState.interests.find((a) => a.isSelected);
  const isPricesSelected = filterState.prices.find((a) => a.isSelected);
  const isCommonSelected = checkCommon
    ? filterState.common.find((a) => a.isSelected)
    : false;

  if (
    isCategoriesSelected ||
    isAgesSelected ||
    isInterestsSelected ||
    isPricesSelected ||
    isCommonSelected
  ) {
    return true;
  }

  return false;
}

function hasIntersectionByIdOrName<T extends { id: number; name: string }>(
  list1: T[],
  list2: T[],
): boolean {
  // Create sets to store the ids and names from the first list
  const idsSet = new Set<number>();
  const namesSet = new Set<string>();

  // Populate the sets with ids and names from the first list
  for (const item of list1) {
    idsSet.add(item.id);
    namesSet.add(item.name);
  }

  // Check if any item in the second list matches by id or name
  for (const item of list2) {
    if (idsSet.has(item.id) || namesSet.has(item.name)) {
      return true; // Matching item found
    }
  }

  return false; // No matching item found
}

function validPrice(
  priceRangeList: {
    id: number;
    name: string;
    value: {
      min: number;
      max: number;
    };
    isSelected: boolean;
  }[],
  price: number,
): boolean {
  for (const range of priceRangeList) {
    if (range.value.min <= price && price <= range.value.max) {
      return true; // Exit early as soon as a valid range is found
    }
  }

  return false; // No matching item found
}

export const checkValidProduct = (
  filterState: IFilterClient,
  product: IProduct,
) => {
  // Check for Categories :
  if (
    hasIntersectionByIdOrName(
      filterState.categories?.filter((a) => a.isSelected),
      product.categories,
    )
  ) {
    return true;
  }
  // Check for Ages :
  if (
    hasIntersectionByIdOrName(
      filterState.ages?.filter((a) => a.isSelected),
      product.ages,
    )
  ) {
    return true;
  }
  // Check for Interests :
  if (
    hasIntersectionByIdOrName(
      filterState.interests?.filter((a) => a.isSelected),
      product.interests,
    )
  ) {
    return true;
  }

  return false;
};

export const getFilteredProductsByCommonFilters = (
  filterState: IFilterClient,
  products: IProduct[],
) => {
  // New Arrivals
  if (
    filterState.common.find((a) => {
      return a.isSelected && a.name == 'New Arrivals';
    })
  ) {
    return products.filter((a) => a.isNew);
  }

  // Most Rated
  if (
    filterState.common.find((a) => {
      return a.isSelected && a.name == 'Most Rated';
    })
  ) {
    return products.slice().sort((a, b) => {
      if (a.averageRating && b.averageRating) {
        return b.averageRating - a.averageRating;
      } else {
        return 0;
      }
    });
  }
  // Best Selling
  if (
    filterState.common.find((a) => {
      return a.isSelected && a.name == 'Best Sellers';
    })
  ) {
    return products.filter((a) => a.bestSelling);
  }
  // Price Low to High
  if (
    filterState.common.find((a) => {
      return a.isSelected && a.name == 'Price Low to High';
    })
  ) {
    return products.slice().sort((a, b) => a.price - b.price);
  }

  // Price High to low
  if (
    filterState.common.find((a) => {
      return a.isSelected && a.name == 'Price High to Low';
    })
  ) {
    return products.slice().sort((a, b) => b.price - a.price);
  }

  return products;
};

export const getFilteredProducts = (
  filterState: IFilterClient,
  products: IProduct[],
) => {
  let filteredProducts: IProduct[] = [];
  products.forEach((product) => {
    const isValid = checkValidProduct(filterState, product);
    const isAnyPriceFilterSelected = filterState.prices.filter(
      (a) => a.isSelected,
    );
    if (isValid || isAnyPriceFilterSelected.length > 0) {
      // we know at least one price filter is selected
      if (isValid) {
        filteredProducts.push(product);
      } else {
        let isPriceValid: boolean = false;
        isAnyPriceFilterSelected.forEach((a) => {
          if (
            product.discountedPrice >= a.value.min &&
            product.discountedPrice <= a.value.max
          ) {
            isPriceValid = true;
          }
        });

        if (isPriceValid) {
          filteredProducts.push(product);
        }
      }
    }
  });

  if (!IsFiltersSelected(filterState, false)) {
    filteredProducts = products;
  }

  // Common Filters :
  return getFilteredProductsByCommonFilters(filterState, filteredProducts);
};
