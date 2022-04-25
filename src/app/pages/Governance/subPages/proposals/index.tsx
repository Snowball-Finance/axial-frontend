import { FC } from "react";
import { styled } from "@mui/material";
import { Max1040 } from "app/components/wrappers/max1040";
import { VotePower } from "../../components/votePower";
import { TopWrapper } from "./components/topWrapper";
import { ProposalsList } from "./components/list";
import { mobile } from "styles/media";
import { useStakingPageSlice } from "app/pages/Staking/slice";

export const Proposals: FC = () => {
  useStakingPageSlice();

  return (
    <StyledMax1040 m="auto" mt={2}>
      <Header>
        <VotePower />
      </Header>
      <TopWrapper />
      <ProposalsList />
    </StyledMax1040>
  );
};

const StyledMax1040 = styled(Max1040)(() => ({
  position: "relative",
  [mobile]: {
    padding: "0 16px",
  },
}));

const Header = styled("div")({
  display: "flex",
  gap: "6px",
  [mobile]: {
    flexDirection: "column",
    gap: "24px",
  },
});
