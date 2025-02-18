import React from 'react';

const ProductBenefitsCarouselWrapper = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => {
  return (
    <div className="sm:my-44 my-12">
      <svg
        viewBox="0 0 1440 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <mask
          id="mask0_3249_1216"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1440"
          height="108"
        >
          <rect width="1440" height="108" fill="white" />
        </mask>
        <g mask="url(#mask0_3249_1216)">
          <path
            d="M1486.16 54.967C1437.95 49.1876 1389.44 46.2915 1340.89 46.294C1206.02 46.294 1157.5 68.757 1063.35 74.4811C897.005 84.6285 900.734 23.5058 722.938 22.4434C539.483 21.3592 532.718 86.3631 395.534 61.4717C283.631 41.177 240.331 3.64465 127.366 8.41478C57.5267 11.3636 3.19053 37.3392 -31.6097 54.967L-32 214.701H1488.76L1486.16 54.967Z"
            fill={color}
          />
        </g>
      </svg>

      {children}
      <svg
        viewBox="0 0 1440 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <mask
          id="mask0_3249_1218"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1440"
          height="128"
        >
          <rect width="1440" height="128" fill="white" />
        </mask>
        <g mask="url(#mask0_3249_1218)">
          <path
            d="M1488.76 89.3486C1318.69 130.784 1186.47 122.956 1098.89 109.014C944.946 84.5133 928.142 40.9535 797.787 40.1295C616.587 38.9804 586.232 122.696 440.027 94.3355C320.774 71.1787 297.812 7.25895 195.645 9.05859C99.5267 10.7498 21.3183 69.0755 -31.2832 120.593V-401.953H1488.87L1488.76 89.3486Z"
            fill={color}
          />
        </g>
      </svg>
    </div>
  );
};

export default ProductBenefitsCarouselWrapper;
