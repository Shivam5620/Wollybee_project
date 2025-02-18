'use client';

import CustomError from '../../components/common/CustomError';

const Error = () => {
  return (
    <CustomError
      text="We encountered an error while fetching Users. Please try again
          later."
    />
  );
};

export default Error;
