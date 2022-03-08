import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const reverseSwapArrow: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primary;
  return (
    <svg
      width="62"
      height="38"
      viewBox="0 0 62 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.2067 8.14215V30.0605"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M54.6606 19.1021L45.2116 30.0612L35.7626 19.1021"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2809 29.2349V7.92542"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.83197 18.5802L16.281 7.92542L25.73 18.5802"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default reverseSwapArrow;
