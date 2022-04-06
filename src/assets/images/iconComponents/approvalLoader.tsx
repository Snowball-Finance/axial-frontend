import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const ApprovalLoaderIcon: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primary;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2 0H10.8V7.2H13.2V0ZM13.2 16.8H10.8V24H13.2V16.8ZM24 10.8V13.2H16.8V10.8H24ZM7.2 13.2V10.8H0V13.2H7.2ZM15.6 6H18V8.4H15.6V6ZM20.4 3.6H18V6H20.4V3.6ZM8.4 6H6V8.4H8.4V6ZM3.6 3.6H6V6H3.6V3.6ZM15.6 18H18V20.4H20.4V18H18V15.6H15.6V18ZM6 18V15.6H8.4V18H6V20.4H3.6V18H6Z"
        fill={fill}
      />
    </svg>
  );
};

export default ApprovalLoaderIcon;
