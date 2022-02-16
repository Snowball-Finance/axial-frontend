import { SelectProps } from "@mui/material";
import { ReactNode } from "react";

export interface OptionSnowSelectInterface {
  icon?: ReactNode;
  label: ReactNode;
  value: string;
}
export interface SnowSelectInterface extends Omit<SelectProps, "onChange"> {
  options: OptionSnowSelectInterface[];
  selectedValue: string | number;
  isFilter?: boolean;
  onChange: (value: string) => void;
}
