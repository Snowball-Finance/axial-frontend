import { FC } from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceSubPages } from "app/pages/Governance/routes";
import { styled } from "@mui/material";
import { mobile } from "styles/media";

export const NewProposalButton: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const canAddNewProposal = useSelector(GovernanceSelectors.canAddNewProposal);

  const handleClick = () => {
    dispatch(push(GovernanceSubPages.newProposal));
  };

  return (
    <StyledContainedButton disabled={!canAddNewProposal} onClick={handleClick}>
      {t(translations.GovernancePage.NewProposal())}
    </StyledContainedButton>
  );
};

const StyledContainedButton = styled(ContainedButton)(() => ({
  [mobile]: {
    width: "100%",
  },
}));
