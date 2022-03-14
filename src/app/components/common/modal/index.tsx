import React, { FC, forwardRef } from "react";
import { SnowModalProps } from "./types";
import { StyledDialog, Wrapper, ChildWrapper } from "./style";
import { styled, Zoom, ZoomProps } from "@mui/material";
import Close from "@mui/icons-material/Close";
import { CssVariables } from "styles/cssVariables/cssVariables";

const Transition = forwardRef<HTMLDivElement, ZoomProps>((props, ref) => {
  return <Zoom ref={props.ref} {...props} timeout={300} />;
});

export const SnowModal: FC<SnowModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  return (
    <StyledDialog
      TransitionComponent={Transition}
      fullScreen={false}
      open={isOpen}
      onClose={() => (onClose ? onClose() : null)}
    >
      <Wrapper>
        <TopWrapper>
          {title ? <Title>{title}</Title> : <div />}
          {onClose ? (
            <CloseWrapper onClick={() => onClose()}>
              <Close />
            </CloseWrapper>
          ) : (
            <div />
          )}
        </TopWrapper>
        <ChildWrapper>{children}</ChildWrapper>
      </Wrapper>
    </StyledDialog>
  );
};
const TopWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const CloseWrapper = styled("div")({
  cursor: "pointer",
});
const Title = styled("div")({
  fontSize: "20px",
  fontWeight: "bold",
  color: CssVariables.white,
});
