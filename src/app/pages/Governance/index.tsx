/**
 *
 * Governance
 *
 */

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { translations } from "locales/i18n";
import { Box, styled } from "@mui/material";
import { PageHead } from "./components/pageHead";
import { GovernanceBody } from "./body";
import { useGovernancePageSlice } from "./slice";
import { Max1040 } from "app/components/wrappers/max1040";
import { mobile } from "styles/media";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";

export function GovernancePage() {
  useGovernancePageSlice();
  const account = useSelector(Web3Selectors.selectAccount);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (account) {
      dispatch(GovernanceActions.getGovernanceTokenBalance());
    }
    dispatch(GovernanceActions.setSyncedProposalsWithBlockchain(false));
    return () => {};
  }, [account]);
  return (
    <>
      <Helmet>
        <title>{t(translations.GovernancePage.Governance())}</title>
        <meta
          name="description"
          content={`${t(translations.GovernancePage.Description())}`}
        />
      </Helmet>
      {/* <NavigationTabs /> */}
      <Box mb={4} />
      <StyledMax1040>
        <PageHead
          title={t(translations.GovernancePage.Governance())}
          description={t(translations.GovernancePage.Description())}
        />
      </StyledMax1040>
      <Box mb={4} />
      <GovernanceBody />
    </>
  );
}
const StyledMax1040 = styled(Max1040)(() => ({
  position: "relative",
  width: "100%",
  margin: "auto",
  [mobile]: {
    padding: "0 16px",
  },
}));
