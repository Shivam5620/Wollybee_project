import { IProductAge } from '@repo/ui/types';

export const getAgesLabel = (ages: IProductAge[]) => {
  let agesLabel = '';
  let min = 100;
  let isMaxNull = false;
  let max = 0;
  if (ages?.length > 0) {
    ages.forEach((age) => {
      if (age.min < min) {
        min = age.min;
      }
      if (age.max > max) {
        max = age.max;
      }
      if (age.max == null) {
        isMaxNull = true;
      }
    });
  }

  if (isMaxNull) {
    agesLabel += `${min}+`;
  } else {
    agesLabel += `${min}-${max}`;
  }

  return agesLabel;
};
