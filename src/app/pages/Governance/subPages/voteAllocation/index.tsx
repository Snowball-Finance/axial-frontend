import { styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { Max1040 } from "app/components/wrappers/max1040";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import { env } from "environment";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { RewardsAllocationsTable } from "./components/rewardAllocationsTable";
import { SelectPairs } from "./components/select";
import { SelectedPairsTable } from "./components/selectedPairsTable";
import { VoteAllocationSubmit } from "./components/submitButton";

export const VoteAllocation = () => {
  const { t } = useTranslation();
  const account = useSelector(Web3Selectors.selectAccount);

  return (
    <StyledMax1040>
      {!account ? (
        t(translations.Common.ConnectToWallet())
      ) : (
        <SectionWrapper>
          <Title>
            {t(
              translations.GovernancePage.VoteAllocation.Voteforyourpreferredpair()
            )}
          </Title>
          <TopDesc>
            {t(translations.GovernancePage.VoteAllocation.TopDescs())}
          </TopDesc>
          <TopActions>
            <ActionsTitle>
              {t(
                translations.GovernancePage.VoteAllocation.Votethepairyouprefer()
              )}
            </ActionsTitle>
            <SelectPairs />
            <SelectedPairsTable />
            <VoteAllocationSubmit />
          </TopActions>
        </SectionWrapper>
      )}
      <SectionWrapper>
        <Title>
          {t(
            translations.GovernancePage.VoteAllocation.TOKEN_RewardAllocations(),
            { token: env.MAIN_TOKEN_NAME }
          )}
        </Title>
        <BottomDesc>
          {t(translations.GovernancePage.VoteAllocation.BottomDescs())}
        </BottomDesc>
        <RewardsAllocationsTable />
      </SectionWrapper>
    </StyledMax1040>
  );
};

const ActionsTitle = styled("p")({
  margin: 0,
  fontSize: "16px",
  color: CssVariables.black,
  lineHeight: "14px",
});

const TopActions = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const Title = styled("h1")({
  margin: 0,
  fontSize: "32px",
  fontWeight: "600",
  color: CssVariables.dark,
  textAlign: "center",
  marginBottom: "24px",
});

const TopDesc = styled("p")({
  maxWidth: "565px",
  margin: "0 auto",
  textAlign: "center",
  color: CssVariables.dark,
  marginBottom: "12px",
});

const BottomDesc = styled(TopDesc)({
  maxWidth: "800px",
});

const SectionWrapper = styled(SnowPaper)({
  padding: "16px",
});

const StyledMax1040 = styled(Max1040)({
  margin: "auto",
  paddingBottom: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});
