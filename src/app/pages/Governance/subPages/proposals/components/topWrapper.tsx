import { Divider, styled } from "@mui/material";
import { FC } from "react";
import { NewProposalButton } from "./newProposalButton";
import { ProposalFilterSelect } from "./filterSelect";
import { SubmitPermission } from "./submitPermission";
import { mobile } from "styles/media";

export const TopWrapper: FC = () => {
  return (
    <Wrapper>
      <SubmitPermission />
      <RightWrapper>
        <ProposalFilterSelect />
        <DividerWrapper>
          <Divider orientation="vertical" />
        </DividerWrapper>
        <NewProposalButton />
      </RightWrapper>
    </Wrapper>
  );
};

const DividerWrapper = styled("div")({
  padding: "4px",
});

const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "16px",
  [mobile]: {
    flexDirection: "column",
  },
});

const RightWrapper = styled("div")({
  display: "flex",
  [mobile]: {
    flexDirection: "column",
    gap: "4px",
  },
});
