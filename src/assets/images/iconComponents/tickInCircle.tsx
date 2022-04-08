import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { IconProps } from "./types";

const TickInCircleIcon: FC<IconProps> = ({ color }) => {
  const fill = color ?? CssVariables.primary;
  return (
    <svg
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31 0C48.1208 0 62 13.8792 62 31C62 48.1208 48.1208 62 31 62C13.8792 62 0 48.1208 0 31C0 13.8792 13.8792 0 31 0ZM31 6.2C17.3033 6.2 6.2 17.3033 6.2 31C6.2 44.6967 17.3033 55.8 31 55.8C44.6967 55.8 55.8 44.6967 55.8 31C55.8 17.3033 44.6967 6.2 31 6.2ZM41.208 19.508L24.8 35.9159L20.792 31.908C19.5814 30.6973 17.6186 30.6973 16.408 31.908C15.1973 33.1186 15.1973 35.0814 16.408 36.292L22.608 42.492C23.8186 43.7027 25.7814 43.7027 26.992 42.492L45.592 23.892C46.8027 22.6814 46.8027 20.7186 45.592 19.508C44.3814 18.2973 42.4186 18.2973 41.208 19.508Z"
        fill={fill}
      />
    </svg>
  );
};

export default TickInCircleIcon;
