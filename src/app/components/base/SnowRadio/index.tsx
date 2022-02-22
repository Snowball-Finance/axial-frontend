import React, { FC } from "react";
import { styled, Radio } from "@mui/material";
import { RadioProps } from "@mui/material/Radio";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const SnowRadio: FC<RadioProps> = (props) => {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
};

const BpIcon = styled("span")({
  borderRadius: "50%",
  width: CssVariables.radioWidth,
  height: CssVariables.radioHeight,
  border: `2px solid ${CssVariables.primary}`,
  backgroundColor: "transparent",
  "input:hover ~ &": {
    backgroundColor: CssVariables.primary,
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: CssVariables.primaryDisabled,
  },
});

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: CssVariables.primary,
  "&:before": {
    display: "block",
    width: CssVariables.radioWidth,
    height: CssVariables.radioHeight,
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: CssVariables.primary,
  },
});
