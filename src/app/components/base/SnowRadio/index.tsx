import React, { FC } from "react";
import { styled, Radio } from "@mui/material";
import { RadioProps } from "@mui/material/Radio";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";

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
  border: `2px solid ${CssVariables.green}`,
  backgroundColor: "transparent",
  "input:hover ~ &": {
    backgroundColor: CssVariables.green,
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: CssVariables.primaryDisabled,
  },

  [mobile]: {
    width: 16,
    height: 16,
  },
});

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: CssVariables.green,
  "&:before": {
    display: "block",
    width: CssVariables.radioWidth,
    height: CssVariables.radioHeight,
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: CssVariables.green,
  },
});
