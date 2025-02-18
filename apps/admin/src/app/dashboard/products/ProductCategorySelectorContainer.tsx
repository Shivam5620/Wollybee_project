'use client';
import {
  IProduct,
  IProductAge,
  IProductCategory,
  IProductInterest,
} from '@repo/ui/types';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Product } from '@repo/ui/enums';

export interface IProductCategorySelector extends IProductCategory {
  isSelected: boolean;
}
export interface IProductAgeSelector extends IProductAge {
  isSelected: boolean;
}
export interface IProductInterestSelector extends IProductInterest {
  isSelected: boolean;
}

interface IProductCategoryContainerSelectorProps {
  categories: IProductCategory[];
  ages: IProductAge[];
  interests: IProductInterest[];
  type?: Product;
  initialValues: IProduct;
  setFormValues: (values: any) => void;
}

const ProductCategoryContainerSelector = ({
  categories,
  ages,
  interests,
  type = Product.READ,
  initialValues,
  setFormValues,
}: IProductCategoryContainerSelectorProps) => {
  const [categoriesData, setCategoriesData] = useState<
    IProductCategorySelector[]
  >(
    categories.map((a) => {
      const currentCategory = initialValues.categories.find(
        (b) => a.id === b.id,
      );
      return {
        ...a,
        isSelected: !!currentCategory,
      };
    }),
  );

  const [agesData, setAgesData] = useState<IProductAgeSelector[]>(
    ages.map((a) => {
      const currentAge = initialValues.ages.find((b) => a.id === b.id);
      return {
        ...a,
        isSelected: !!currentAge,
      };
    }),
  );

  const [interestData, setInterestData] = useState<IProductInterestSelector[]>(
    interests.map((a) => {
      const currentInterest = initialValues.interests.find(
        (b) => a.id === b.id,
      );
      return {
        ...a,
        isSelected: !!currentInterest,
      };
    }),
  );

  useEffect(() => {
    handleSave();
  }, [agesData, categoriesData, interestData]);

  const handleSave = () => {
    setFormValues({
      ...initialValues,
      ages: agesData.filter((a) => a.isSelected),
      categories: categoriesData.filter((a) => a.isSelected),
      interests: interestData.filter((a) => a.isSelected),
    });
  };

  const handleCheckChange = (id: number, value: boolean, dataType: string) => {
    let dummyData: (
      | IProductAgeSelector
      | IProductCategorySelector
      | IProductInterestSelector
    )[] = [];

    if (dataType === 'categories') {
      const categoriesDummyData = categoriesData.map((category) =>
        category.id === id ? { ...category, isSelected: value } : category,
      );
      if (categoriesDummyData.every((item) => 'description' in item)) {
        setCategoriesData(categoriesDummyData as IProductCategorySelector[]);
      }
    } else if (dataType === 'ages') {
      const agesDummyData = agesData.map((age) =>
        age.id === id ? { ...age, isSelected: value } : age,
      );
      if (agesDummyData.every((item) => !('description' in item))) {
        setAgesData(agesDummyData as IProductAgeSelector[]);
      }
    } else if (dataType === 'interests') {
      const interestsDummyData = interestData.map((interest) =>
        interest.id === id ? { ...interest, isSelected: value } : interest,
      );
      setInterestData(interestsDummyData as IProductInterestSelector[]);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <label className="text-sm text-primary-black font-bold">
          Product Categories Selector
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-10 w-full px-2">
        <section>
          <label className="text-secondary-color text-xs">
            Select Category :{' '}
          </label>
          <section className="py-5 grid grid-cols-12">
            {categoriesData.map((a) => (
              <p key={a.name} className="col-span-3 flex gap-2 items-center py-1 text-sm text-primay-color-200">
                {' '}
                <Checkbox
                  checked={a.isSelected}
                  onCheckedChange={(value: boolean) => {
                    handleCheckChange(a.id, value, 'categories');
                  }}
                  disabled={type == Product.READ}
                  className="rounded-none h-5 w-5"
                />{' '}
                {a.name}
              </p>
            ))}
          </section>
        </section>

        <section>
          <label className="text-secondary-color text-xs">
            Select Interests :{' '}
          </label>
          <section className="py-5 grid grid-cols-12">
            {interestData.map((a) => (
              <p key={a.name} className="col-span-3 flex gap-2 items-center py-1 text-sm text-primay-color-200">
                {' '}
                
                <Checkbox
                  checked={a.isSelected}
                  onCheckedChange={(value: boolean) => {
                    handleCheckChange(a.id, value, 'interests');
                  }}
                  className="rounded-none h-5 w-5"
                  disabled={type == Product.READ}
                />{' '}
                {a.name} 
              </p>
            ))}
          </section>
        </section>

        <section>
          <label className="text-secondary-color text-xs">Select Ages : </label>
          <section className="py-5 grid grid-cols-12">
            {agesData.map((a) => (
              <p key={a.name} className="col-span-3 flex gap-2 items-center py-1 text-sm text-primay-color-200">
                {' '}
                <Checkbox
                  checked={a.isSelected}
                  onCheckedChange={(value: boolean) => {
                    handleCheckChange(a.id, value, 'ages');
                  }}
                  className="rounded-none h-5 w-5"
                  disabled={type == Product.READ}
                />{' '}
                {a.name}
              </p>
            ))}
          </section>
        </section>
      </div>
    </>
  );
};

export default ProductCategoryContainerSelector;
