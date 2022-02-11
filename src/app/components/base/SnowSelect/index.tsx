import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  styled,
} from "@mui/material";
import { FC } from "react";
import { BaseInputStyles } from "styles/baseInputStyles";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { SnowSelectInterface } from "./types";

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  maxHeight: "45px",
  borderRadius: "10px",
  "& .MuiInputBase-input": BaseInputStyles({ theme }),
  ".MuiSelect-icon": {
    width: "42px",
    height: "42px",
    marginTop: "-8px",
    color: CssVariables.lightGrey,
  },
  ".MuiOutlinedInput-input": {
    color: CssVariables.grey,
  },
  "& :focus": {
    borderRadius: CssVariables.paperBorderRadius,
  },
  "& fieldset": {
    border: "none",
    borderRadius: CssVariables.paperBorderRadius,
  },
}));

const IconWrapper = styled("div")({
  marginRight: "6px",
});

export const SnowSelect: FC<SnowSelectInterface> = ({
  options,
  selectedValue,
  isFilter,
  onChange,
  ...rest
}) => {
  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    // setActiveId(e.target.value);
    onChange(e.target.value);
  };

  return (
    <StyledSelect
      margin="dense"
      fullWidth
      labelId="Select"
      value={selectedValue}
      IconComponent={ArrowDropDownRoundedIcon}
      onChange={(e) => handleSelectChange(e)}
      {...(isFilter && {
        startAdornment: (
          <InputAdornment position="start">
            <StyledFilterAltOutlinedIcon />
          </InputAdornment>
        ),
      })}
      {...rest}
    >
      {[...options].map((item) => {
        return (
          <MenuItem key={item.value} value={item.value}>
            {item.icon && <IconWrapper>{item.icon}</IconWrapper>}
            {item.label}
          </MenuItem>
        );
      })}
    </StyledSelect>
  );
};

const StyledFilterAltOutlinedIcon = styled(FilterAltOutlinedIcon)({
  color: CssVariables.grey,
});
