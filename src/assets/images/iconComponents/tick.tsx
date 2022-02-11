import React, { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

export const Tick: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.green;
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.25 2.25L4.75 9.75L1.75 6.75"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
