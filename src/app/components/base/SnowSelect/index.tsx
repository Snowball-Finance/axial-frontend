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
import React, { FC } from "react";
import { SnowSelectInterface } from "./types";
import { BaseInputStyles } from "../../../../styles/baseInputStyles";
import { CssVariables } from "../../../../styles/cssVariables/cssVariables";

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  maxHeight: "45px",
  borderRadius: CssVariables.buttonBorderRadius,
  border: `2px solid ${CssVariables.primary}`,
  boxShadow: "none",
  "& .MuiInputBase-input": {
    ...BaseInputStyles({ theme }),
    background: "transparent",
    paddingTop: "9px",
    paddingBottom: "9px",
    color: CssVariables.white,
  },
  ".MuiSelect-icon": {
    width: "42px",
    height: "42px",
    marginTop: "-8px",
    color: CssVariables.white,
  },
  "& .MuiPaper-root": {
    borderRadius: CssVariables.buttonBorderRadius,
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
      MenuProps={{
        classes: {
          paper: "selectPaper",
        },
      }}
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
