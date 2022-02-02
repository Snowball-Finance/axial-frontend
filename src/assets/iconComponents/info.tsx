import React, { FC } from "react";
import { CssVariables } from "../../styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const InfoIcon: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primaryBlue;
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1358_11540)">
        <path
          d="M8.19343 15.4516C11.8753 15.4516 14.8601 12.4669 14.8601 8.78495C14.8601 5.10305 11.8753 2.11829 8.19343 2.11829C4.51153 2.11829 1.52676 5.10305 1.52676 8.78495C1.52676 12.4669 4.51153 15.4516 8.19343 15.4516Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.25339 6.78493C6.41012 6.33937 6.71949 5.96366 7.12669 5.72435C7.53389 5.48503 8.01265 5.39755 8.47817 5.4774C8.94369 5.55725 9.36593 5.79928 9.6701 6.16061C9.97428 6.52195 10.1408 6.97927 10.1401 7.45159C10.1401 8.78492 8.14005 9.45159 8.14005 9.45159"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.19336 12.1183H8.19969"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1358_11540">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.193359 0.784912)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InfoIcon;
