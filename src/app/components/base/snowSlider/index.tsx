import { styled } from "@mui/material";
import Slider, { SliderProps } from "@mui/material/Slider";
import React, { FC } from "react";

interface SnowSliderProps extends SliderProps {}

export const SnowSlider: FC<SnowSliderProps> = (props) => {
  return <StyledSlider {...props} />;
};

const StyledSlider = styled(Slider)(({ theme }) => ({}));
