import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const ThumbsDownIcon: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primary;
  return (
    <svg
      width="31"
      height="26"
      viewBox="0 0 31 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.3813 16.3159L14.4853 21.2698C13.8669 21.7974 12.8647 21.7974 12.2357 21.2788C11.8518 20.9569 11.6919 20.5008 11.7985 20.0537L12.8114 15.9582H6.78745C4.49515 15.9582 2.94918 13.9909 3.85543 12.2203L7.3312 5.41531C7.66172 4.76253 8.42938 4.3333 9.28233 4.3333H18.8673C20.0401 4.3333 20.9997 5.1381 20.9997 6.12174V15.055C20.9997 15.5289 20.7758 15.985 20.3813 16.3159ZM23.1429 6.12174C23.1429 5.1381 24.1024 4.3333 25.2752 4.3333C26.448 4.3333 27.4076 5.1381 27.4076 6.12174V13.2755C27.4076 14.2592 26.448 15.064 25.2752 15.064C24.1024 15.064 23.1429 14.2592 23.1429 13.2755V6.12174Z"
        fill={fill}
      />
    </svg>
  );
};

export default ThumbsDownIcon;
