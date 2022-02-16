import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const ThumbsUpIcon: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primary;
  return (
    <svg
      width="30"
      height="26"
      viewBox="0 0 30 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2631 9.6841L15.9792 4.73012C16.5777 4.20253 17.5475 4.20253 18.1563 4.72118C18.5277 5.0431 18.6825 5.49915 18.5793 5.94626L17.5991 10.0418H23.4288C25.6471 10.0418 27.1432 12.0091 26.2765 13.7796L22.9129 20.5847C22.5827 21.2374 21.8398 21.6667 21.0144 21.6667H11.7282C10.5933 21.6667 9.66464 20.8619 9.66464 19.8782V10.945C9.66464 10.471 9.88132 10.015 10.2631 9.6841ZM7.60105 19.8783C7.60105 20.8619 6.67244 21.6667 5.53746 21.6667C4.40249 21.6667 3.47388 20.8619 3.47388 19.8783V12.7245C3.47388 11.7408 4.40249 10.936 5.53746 10.936C6.67244 10.936 7.60105 11.7408 7.60105 12.7245V19.8783Z"
        fill={fill}
      />
    </svg>
  );
};

export default ThumbsUpIcon;
