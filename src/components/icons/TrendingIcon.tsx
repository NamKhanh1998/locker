import React, { FC } from 'react'

const TrendingIcon: FC<React.SVGAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      stroke="#f90"
      fill="#f90"
      strokeWidth="0"
      viewBox="0 0 448 512"
      focusable="false"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M323.56 51.2c-20.8 19.3-39.58 39.59-56.22 59.97C240.08 73.62 206.28 35.53 168 0 69.74 91.17 0 209.96 0 281.6 0 408.85 100.29 512 224 512s224-103.15 224-230.4c0-53.27-51.98-163.14-124.44-230.4zm-19.47 340.65C282.43 407.01 255.72 416 226.86 416 154.71 416 96 368.26 96 290.75c0-38.61 24.31-72.63 72.79-130.75 6.93 7.98 98.83 125.34 98.83 125.34l58.63-66.88c4.14 6.85 7.91 13.55 11.27 19.97 27.35 52.19 15.81 118.97-33.43 153.42z"></path>
    </svg>
  )
}

export default TrendingIcon
