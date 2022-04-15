import { Box, styled } from "@mui/material";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import { Proposal } from "app/containers/BlockChain/Governance/types";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import ThumbsDownIcon from "assets/images/iconComponents/thumbsDown";
import ThumbsUpIcon from "assets/images/iconComponents/thumbsUp";
import { translations } from "locales/i18n";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const VoteButtons: FC<{ proposal: Proposal }> = ({ proposal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const library = useSelector(Web3Selectors.selectLibrary);
  const isLoadingFor = useSelector(GovernanceSelectors.selectIsVotingFor);
  const isLoadingAgainst = useSelector(
    GovernanceSelectors.selectIsVotingAgainst
  );
  const receipt = useSelector(GovernanceSelectors.selectReceipt);
  const isGettingReceipt = useSelector(
    GovernanceSelectors.selectIsLoadingReceipt
  );

  const disabled = receipt?.hasVoted || isGettingReceipt || false;
  const handleForClick = () => {
    if (library) {
      dispatch(GovernanceActions.vote({ proposal, voteFor: 0 }));
    }
  };

  const handleAgainstClick = () => {
    if (library) {
      dispatch(GovernanceActions.vote({ proposal, voteFor: 1 }));
    }
  };

  return (
    <ButtonsWrapper>
      <ForButton
        disabled={disabled}
        loading={isLoadingFor}
        onClick={handleForClick}
      >
        <Box mr="8px">
          <ThumbsUpIcon color={CssVariables.white} />
        </Box>
        {t(translations.GovernancePage.VoteFor())}
      </ForButton>
      <AgainstButton
        disabled={disabled}
        loading={isLoadingAgainst}
        onClick={handleAgainstClick}
      >
        <Box mr="8px">
          <ThumbsDownIcon color={CssVariables.white} />
        </Box>
        {t(translations.GovernancePage.VoteAgainst())}
      </AgainstButton>
    </ButtonsWrapper>
  );
};

const BigButton = styled(ContainedButton)({
  flex: 1,
  height: "58px",
  minWidth: "calc(50% - 8px)",
});

const ForButton = styled(BigButton)({
  background: CssVariables.green,
  ":hover": {
    background: CssVariables.green,
  },
});
const AgainstButton = styled(BigButton)({
  background: CssVariables.red,
  ":hover": {
    background: CssVariables.red,
  },
});

const ButtonsWrapper = styled("div")({
  display: "flex",
  gap: "16px",
});
