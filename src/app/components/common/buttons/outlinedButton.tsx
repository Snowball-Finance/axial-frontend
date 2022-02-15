import { styled } from "@mui/material";

import { SnowButtonProps, SnowButton } from "app/components/base/snowButton";
import { FC } from "react";



export const OutlinedButton: FC<SnowButtonProps> = (props) => {
  return <StyledButton variant='outlined' {...props} />

}

const StyledButton = styled(SnowButton)(({ theme }) => ({
  borderRadius: "10px",
  borderWidth: "2px",

  "&:hover" :{
    borderWidth: "2px"
  }
}))