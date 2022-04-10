import { styled } from "@mui/material";
import { Max1040 } from "app/components/wrappers/max1040";
import { mobile } from "styles/media";
import { DepositAndWithdraw } from "./components/depositAndWithdraw";

export const VeAxialPage = () => {
  return (
    <Wrapper>
      <DepositAndWithdrawSection>
        <DepositAndWithdraw />
      </DepositAndWithdrawSection>
    </Wrapper>
  );
};

const DepositAndWithdrawSection = styled("div")({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  [mobile]: {
    flexDirection: "column-reverse",
  },
});

const Wrapper = styled(Max1040)({
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [mobile]: {
    padding: 0,
    width: "100%",
  },
});
