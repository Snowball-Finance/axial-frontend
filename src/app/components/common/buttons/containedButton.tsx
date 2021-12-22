import { styled } from "@mui/material";

import { SnowButtonProps, SnowButton } from "app/components/base/snowButton";
import { FC } from "react";



export const ContainedButton: FC<SnowButtonProps> = (props) => {
  return <StyledButton variant='contained' {...props} />

}

const StyledButton = styled(SnowButton)(({ theme }) => ({}))