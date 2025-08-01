import React, { FC } from 'react'

const GreenLeapIcon: FC<React.SVGAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      stroke="#68d391"
      fill="#68d391"
      strokeWidth="0"
      viewBox="0 0 512 512"
      focusable="false"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M64 96H0c0 123.7 100.3 224 224 224v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C288 196.3 187.7 96 64 96zm384-64c-84.2 0-157.4 46.5-195.7 115.2 27.7 30.2 48.2 66.9 59 107.6C424 243.1 512 147.9 512 32h-64z"></path>
    </svg>
  )
}

export default GreenLeapIcon
