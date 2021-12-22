import { styled } from "@mui/material";
import Slider, { SlideProps } from "@mui/material/Slide";
import { FC } from "react";

export const SnowSlider: FC<SlideProps> = (props) => {
  return <StyledSlider {...props} />
}

const StyledSlider = styled(Slider)(({ theme }) => ({}))