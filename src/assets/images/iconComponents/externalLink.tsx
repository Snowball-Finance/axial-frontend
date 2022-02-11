import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const ExternalLinkIcon: FC<IconProps> = ({ color }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.64 3.06C14.76 3.12 14.88 3.24 14.94 3.36C15 3.42 15 3.54 15 3.6V7.2C15 7.56 14.76 7.8 14.4 7.8C14.04 7.8 13.8 7.56 13.8 7.2V5.04L8.22 10.62C8.1 10.74 7.98 10.8 7.8 10.8C7.62 10.8 7.5 10.74 7.38 10.62C7.14 10.38 7.14 10.02 7.38 9.78L12.96 4.2H10.8C10.44 4.2 10.2 3.96 10.2 3.6C10.2 3.24 10.44 3 10.8 3H14.4C14.46 3 14.58 3 14.64 3.06ZM13.2 13.2V9.6C13.2 9.24 12.96 9 12.6 9C12.24 9 12 9.24 12 9.6V13.2C12 13.56 11.76 13.8 11.4 13.8H4.8C4.44 13.8 4.2 13.56 4.2 13.2V6.6C4.2 6.24 4.44 6 4.8 6H8.4C8.76 6 9 5.76 9 5.4C9 5.04 8.76 4.8 8.4 4.8H4.8C3.78 4.8 3 5.58 3 6.6V13.2C3 14.22 3.78 15 4.8 15H11.4C12.42 15 13.2 14.22 13.2 13.2Z"
        fill={fill}
      />
    </svg>
  );
};

export default ExternalLinkIcon;
