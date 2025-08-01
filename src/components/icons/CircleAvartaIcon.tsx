import React, { FC } from 'react'

const CircleAvartaIcon: FC<React.SVGAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      height="40"
      width="40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <circle
          cx="20"
          cy="20"
          fill="#3dbb992e"
          r="20"
        ></circle>
        <g transform="translate(6.666666666666666, 6.666666666666666) scale(0.5555555555555556)">
          <path
            clipRule="evenodd"
            d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM24 39C32.2843 39 39 32.2843 39 24C39 15.7157 32.2843 9 24 9C15.7157 9 9 15.7157 9 24C9 32.2843 15.7157 39 24 39Z"
            fill="#3dbb9a"
            fillRule="evenodd"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default CircleAvartaIcon
