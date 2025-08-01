import React, { FC } from "react";

const ZoomInIcon: FC<React.SVGAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M21.5 21.5H12.1667V19.1667H17.5333L2.83333 4.46667V9.83333H0.5L0.5 0.5H9.83333V2.83333H4.46667L19.1667 17.5333V12.1667H21.5V21.5Z"
        fill="white"
      />
    </svg>
  );
};

export default ZoomInIcon;
