import { styled, TextField } from "@mui/material";
import {
  DatePickerProps,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { FC } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";

interface Props
  extends Omit<DatePickerProps, "onChange" | "value" | "renderInput"> {
  value?: Date;
  onChange?: (value: Date) => void;
}

export const SnowDatePicker: FC<Props> = ({ value, onChange, ...rest }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledDatePicker
        value={value}
        renderInput={(params) => <StyledTextField {...params} />}
        onChange={(date: any) => {
          onChange && onChange(date);
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
};
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    textAlign: "right",
    paddingLeft: 20,
  },
  input: {
    fontSize: "26px !important",
    color: CssVariables.commonTextColor,
    fontFamily: FontFamilies.FugazOne,
    margin: 0,
    width: "340px",
    border: "none !important",
  },
  fieldset: {
    border: "none !important",
  },
}));

const StyledDatePicker = styled(MobileDatePicker)<DatePickerProps>({});
