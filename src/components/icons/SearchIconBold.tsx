import { FC } from 'react'

const SearchIconBold: FC<React.SVGAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M17 16.5001L22 21.5001"
        stroke="#656565"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="round"
        {...props}
      />
      <path
        d="M2 10.0714C2 14.8053 5.83755 18.6429 10.5714 18.6429C12.9424 18.6429 15.0887 17.6801 16.6404 16.1243C18.1868 14.5739 19.1428 12.4343 19.1428 10.0714C19.1428 5.33756 15.3053 1.5 10.5714 1.5C5.83755 1.5 2 5.33756 2 10.0714Z"
        stroke="#656565"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
    </svg>
  )
}
export default SearchIconBold
