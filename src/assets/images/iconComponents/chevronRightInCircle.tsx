import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const ChevronRightInCircle: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primary;
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.33337 8.5C1.33337 4.82 4.32004 1.83333 8.00004 1.83333C11.68 1.83333 14.6667 4.82 14.6667 8.5C14.6667 12.18 11.68 15.1667 8.00004 15.1667C4.32004 15.1667 1.33337 12.18 1.33337 8.5ZM2.66671 8.5C2.66671 11.44 5.06004 13.8333 8.00004 13.8333C10.94 13.8333 13.3334 11.44 13.3334 8.5C13.3334 5.56 10.94 3.16667 8.00004 3.16667C5.06004 3.16667 2.66671 5.56 2.66671 8.5Z"
        fill={fill}
      />
      <path
        d="M6.17768 5.34205C5.94077 5.5749 5.94077 5.95103 6.17768 6.18388L8.53455 8.50038L6.17768 10.8169C5.94077 11.0497 5.94077 11.4259 6.17768 11.6587C6.41458 11.8915 6.79727 11.8915 7.03417 11.6587L9.82232 8.9183C10.0592 8.68546 10.0592 8.30933 9.82232 8.07648L7.03417 5.33608C6.80334 5.10921 6.41458 5.10921 6.17768 5.34205Z"
        fill={fill}
      />
    </svg>
  );
};

export default ChevronRightInCircle;
