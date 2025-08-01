import React, { FC } from "react";

const ZoomOutIcon: FC<React.SVGAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
    >
      <g clip-path="url(#clip0_21_476)">
        <circle cx="23" cy="23" r="23" fill="white" />
        <path
          d="M19.25 31.75V29.25H27.5L13 14.75L14.75 13L29.25 27.5V19.25H31.75V31.75H19.25Z"
          fill="#22933F"
        />
      </g>
      <defs>
        <clipPath id="clip0_21_476">
          <rect width="46" height="46" rx="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ZoomOutIcon;
