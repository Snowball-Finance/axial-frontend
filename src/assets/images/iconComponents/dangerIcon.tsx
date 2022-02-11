import { FC } from "react";
import { IconProps } from "./types";

const DangerIcon: FC<IconProps> = ({ color }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.86441 2.57344L1.21774 12.0001C1.10132 12.2017 1.03972 12.4303 1.03907 12.6631C1.03842 12.8959 1.09874 13.1249 1.21403 13.3271C1.32932 13.5294 1.49556 13.6979 1.69621 13.816C1.89687 13.9341 2.12494 13.9975 2.35774 14.0001H13.6511C13.8839 13.9975 14.1119 13.9341 14.3126 13.816C14.5133 13.6979 14.6795 13.5294 14.7948 13.3271C14.9101 13.1249 14.9704 12.8959 14.9697 12.6631C14.9691 12.4303 14.9075 12.2017 14.7911 12.0001L9.14441 2.57344C9.02556 2.37751 8.85822 2.21552 8.65854 2.1031C8.45885 1.99067 8.23357 1.93161 8.00441 1.93161C7.77525 1.93161 7.54996 1.99067 7.35028 2.1031C7.15059 2.21552 6.98326 2.37751 6.86441 2.57344V2.57344Z"
        stroke="#FB8B24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6V8.66667"
        stroke="#FB8B24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11.333H8.00633"
        stroke="#FB8B24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DangerIcon;
