import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const DocumentIcon: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primary;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.125 2.25H5.025C4.68685 2.25 4.36255 2.38433 4.12344 2.62344C3.88433 2.86255 3.75 3.18685 3.75 3.525V13.725C3.75 14.0632 3.88433 14.3875 4.12344 14.6266C4.36255 14.8657 4.68685 15 5.025 15H12.675C13.0132 15 13.3375 14.8657 13.5766 14.6266C13.8157 14.3875 13.95 14.0632 13.95 13.725V6.075L10.125 2.25Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.125 2.25V6.075H13.95"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4 9.2625H6.30005"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4 11.8125H6.30005"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.57505 6.7125H6.93755H6.30005"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DocumentIcon;
