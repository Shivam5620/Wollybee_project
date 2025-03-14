import React from 'react';

const BubbleTip = ({ color }: { color: string }) => {
  return (
    <svg
      width="97"
      height="54"
      viewBox="0 0 97 54"
      fill={"#CCCCCC"}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 -left-5"
    >
      <path
        d="M97 0H7.35021C5.83817 0.0096112 4.36564 0.476691 3.1305 1.33834C1.89537 2.19999 0.957215 3.41481 0.442274 4.81924C-0.0726671 6.22368 -0.139701 7.75027 0.250369 9.19343C0.64044 10.6366 1.46869 11.927 2.62378 12.8909L52.8689 54L97 0Z"
        fill={color}
      />
    </svg>
  );
};

export default BubbleTip;
