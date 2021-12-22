import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, Select, SelectChangeEvent, SelectProps, styled } from '@mui/material';
import { FC } from 'react';
import { BaseInputStyles } from "styles/baseInputStyles";
import { SnowSelectInterface } from './types';

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  maxHeight: '45px',
  borderRadius: '10px',
  '& .MuiInputBase-input': BaseInputStyles({ theme }),
  '& :focus': {
    borderRadius: '10px',
  },

  '& fieldset': {
    border: 'none',
    borderRadius: '10px',
  },
}));

const IconWrapper = styled('div')({
  marginRight: '6px',
});

export const SnowSelect: FC<SnowSelectInterface> = ({ options, selectedValue, onChange }) => {
  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    // setActiveId(e.target.value);
    onChange(e.target.value);
  };

  return (
    <StyledSelect
      margin="dense"
      fullWidth
      labelId="Select pool"
      value={selectedValue}
      IconComponent={KeyboardArrowDownIcon}
      onChange={(e) => handleSelectChange(e)}
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
