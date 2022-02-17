import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const ArrowUoIcon: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primary;
  return (
    <svg
      width="28"
      height="35"
      viewBox="0 0 28 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 27.7083V7.29163"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.83344 17.5L14.0001 7.29163L22.1668 17.5"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowUoIcon;
