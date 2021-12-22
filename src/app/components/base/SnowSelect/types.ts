import { ReactNode } from 'react';

export interface OptionSnowSelectInterface {
  icon?: ReactNode;
  label: ReactNode;
  value: string;
}
export interface SnowSelectInterface {
  options: OptionSnowSelectInterface[];
  selectedValue: string | number;
  onChange: (value: string) => void;
}
