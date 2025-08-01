import React, { FC } from "react";

const TelegramIcon: FC<React.SVGAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 28 28"
      fill="none"
    >
      <g clipPath="url(#clip0_217_801)">
        <path
          d="M23.7417 0.656286L1.10986 13.7129C0.226072 14.2207 0.338376 15.4512 1.21728 15.8223L6.40771 18L20.436 5.63675C20.7046 5.3975 21.0854 5.76371 20.856 6.04203L9.09326 20.3731V24.3037C9.09326 25.4561 10.4849 25.9102 11.1685 25.0752L14.269 21.3008L20.353 23.8496C21.0464 24.1426 21.8374 23.708 21.9644 22.961L25.48 1.86722C25.646 0.880895 24.5864 0.168004 23.7417 0.656286Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_217_801">
          <rect
            width="25"
            height="25"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TelegramIcon;
