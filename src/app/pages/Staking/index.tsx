/**
 *
 * StakingPage
 *
 */
import { useStakingPageSlice } from "./slice";
import { styled } from "@mui/material";
import { DepositAndWithdraw } from "./components/depositAndWithdraw";
import { OverallInfoCard } from "./components/overallInfo";
import { Max1040 } from "app/components/wrappers/max1040";
import { mobile } from "styles/media";

interface Props {}
export function StakingPage(props: Props) {
  useStakingPageSlice();

  return (
    <Wrapper>
      <InfoSection>
        <OverallInfoCard />
      </InfoSection>
      <Spacer />
      <DepositAndWithdrawSection>
        <DepositAndWithdraw />
      </DepositAndWithdrawSection>
    </Wrapper>
  );
}

const Spacer = styled("div")({
  height: "128px",
  [mobile]: {
    height: "32px",
  },
});

const DepositAndWithdrawSection = styled("div")({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  [mobile]: {
    flexDirection: "column-reverse",
  },
});

const InfoSection = styled("div")({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  [mobile]: {
    flexDirection: "column",
  },
});

const Wrapper = styled(Max1040)({
  margin: "auto",
  display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
  [mobile]: {
    padding: "0 36px",
  },
});
