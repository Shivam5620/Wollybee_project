import {
  IProductAge,
  IProductCategory,
  IProductInterest,
} from '@repo/ui/types';

// Assuming these are the correct types based on your imports
import {
  IProductAgeSelector,
  IProductCategorySelector,
  IProductInterestSelector,
} from './ProductCategorySelectorContainer';

// Define a union type for the data and source based on the selectors and models
type SelectorTypes =
  | IProductAgeSelector
  | IProductCategorySelector
  | IProductInterestSelector;
type ProductTypes = IProductAge | IProductCategory | IProductInterest;

// Use a generic type to make the function more flexible and type-safe
export const parseData = <T extends SelectorTypes, S extends ProductTypes>({
  data,
  source,
}: {
  data: T[];
  source: S[];
}): T[] => {
  const dataDummy = [...data];
  source?.forEach((a) => {
    const currentIndex = dataDummy.findIndex((b) => b.id === a.id);
    if (currentIndex !== -1) {
      // Use type assertion to access isSelected property safely
      (dataDummy[currentIndex] as any).isSelected = true; // Assuming isSelected exists on T
    }
  });
  return dataDummy;
};
