import { FC } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { Proposal } from "app/containers/BlockChain/Governance/types";
import { GovernanceSubPages } from "app/pages/Governance/routes";
import { styled } from "@mui/material";
import { mobile } from "styles/media";

interface Props {
  proposal: Proposal;
}

export const DetailsButton: FC<Props> = ({ proposal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDetailsClick = () => {
    dispatch(push(`${GovernanceSubPages.proposals}/${proposal.governance_id}`));
  };

  return (
    <StyledContainedButton onClick={handleDetailsClick}>
      {t(translations.Common.Details())}
    </StyledContainedButton>
  );
};

const StyledContainedButton = styled(ContainedButton)(() => ({
  [mobile]: {
    width: "100%",
  },
}));
