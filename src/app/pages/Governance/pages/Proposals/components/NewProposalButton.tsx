import { FC } from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceSubPages } from "app/pages/Governance/routes";

export const NewProposalButton: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const canAddNewProposal = useSelector(GovernanceSelectors.canAddNewProposal);

  const handleClick = () => {
    dispatch(push(GovernanceSubPages.newProposal));
  };

  return (
    <ContainedButton disabled={!canAddNewProposal} onClick={handleClick}>
      {t(translations.GovernancePage.NewProposal())}
    </ContainedButton>
  );
};
