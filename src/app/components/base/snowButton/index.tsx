import { CircularProgress, styled } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button'
import { FC } from "react";

type CommonButtonProps = {
  loading?: boolean,
  height?: number,
  width?: number,

}

export type SnowButtonProps = ButtonProps & CommonButtonProps


export const SnowButton: FC<SnowButtonProps> = ({ ...props }) => {
  const { loading, children, ...rest } = props
  return (
    <StyledButton {...rest}  >
      {
        loading ?
          <CircularProgress style={{ color: 'white' }} size={22} /> :
          children
      }
    </StyledButton>
  )
}


const StyledButton = styled(Button)<SnowButtonProps>(({ height, width, theme }) => ({
  ...(height && { height }),
  ...(width && { width }),
  textTransform: 'none',
}))