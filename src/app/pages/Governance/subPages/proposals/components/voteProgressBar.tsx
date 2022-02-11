import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/system";
import { FC } from "react";
import { CssVariables } from "styles/cssVariables/cssVariables";

export enum VoteProgressBarType {
  for = "for",
  against = "against",
}

interface VoteProgressBarProps {
  percent: number;
  type: VoteProgressBarType;
  title: string;
  height?: string;
}
export const VoteProgressBar: FC<VoteProgressBarProps> = ({
  percent,
  title,
  type,
  height,
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <StyledLinearProgress
        variant="determinate"
        value={percent}
        type={type}
        height={height ?? "6px"}
      />
    </Wrapper>
  );
};

const StyledLinearProgress = styled(LinearProgress)<{
  type: VoteProgressBarType;
  height: string;
}>(({ type, height }) => {
  let mainColor = CssVariables.primary;
  let bg = CssVariables.mildBlue;

  switch (type) {
    case VoteProgressBarType.for:
      mainColor = CssVariables.green;
      bg = CssVariables.mildGreen;
      break;

    case VoteProgressBarType.against:
      mainColor = CssVariables.red;
      bg = CssVariables.mildRed;
      break;
    default:
      break;
  }

  return {
    borderRadius: 5,
    height,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: bg,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: mainColor,
    },
  };
});

const Title = styled("p")({
  marginTop: 0,
  marginBottom: "0px",
  fontSize: "12px",
});

const Wrapper = styled("div")({
  width: "100%",
});
