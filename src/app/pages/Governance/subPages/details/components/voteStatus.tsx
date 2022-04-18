import { Box, Skeleton, styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "app/containers/BlockChain/Governance/slice";
import {
  Proposal,
  ProposalState,
} from "app/containers/BlockChain/Governance/types";
import { Web3Selectors } from "app/containers/BlockChain/Web3/selectors";
import DangerIcon from "assets/images/iconComponents/dangerIcon";
import ThumbsDownIcon from "assets/images/iconComponents/thumbsDown";
import ThumbsUpIcon from "assets/images/iconComponents/thumbsUp";
import { formatNumber } from "common/format";
import { env } from "environment";
import { translations } from "locales/i18n";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";
interface Props {
  proposal: Proposal;
}

export const VoteStatus: FC<Props> = ({ proposal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLoading = useSelector(GovernanceSelectors.selectIsLoadingReceipt);
  const receipt = useSelector(GovernanceSelectors.selectReceipt);
  const isFor = receipt?.support || false;
  const hasVoted = receipt?.hasVoted || false;
  const isVotingFor = useSelector(GovernanceSelectors.selectIsVotingFor);
  const isVotingAgainst = useSelector(
    GovernanceSelectors.selectIsVotingAgainst
  );
  const library = useSelector(Web3Selectors.selectLibrary);

  useEffect(() => {
    if (library) {
      dispatch(GovernanceActions.getVotingReceipt({ proposal }));
    }
    return () => {};
  }, [library]);

  const longMessage = t(
    translations.GovernancePage.youVotedForAgainstThisProposalWithAmountGovernanceToken(),
    {
      forAgainst: isFor
        ? t(translations.GovernancePage.For())
        : t(translations.GovernancePage.Against()),
      amount: formatNumber(Number(receipt?.votes) || 0, 2),
      name: env.GOVERNANCE_TOKEN_NAME,
    }
  );
  const message = hasVoted
    ? longMessage
    : proposal.state === ProposalState.Active
    ? t(translations.GovernancePage.YouHaventVotedOnThisProposalYet())
    : t(translations.GovernancePage.YouDidntVoteOnThisProposal());

  const bg = isLoading
    ? CssVariables.white
    : !hasVoted
    ? CssVariables.mildYellow
    : isFor
    ? CssVariables.green
    : CssVariables.red;
  const color = !hasVoted ? CssVariables.commonTextColor : CssVariables.white;
  const icon = !hasVoted ? (
    <DangerIcon />
  ) : isFor ? (
    <ThumbsUpIcon color={CssVariables.white} />
  ) : (
    <ThumbsDownIcon color={CssVariables.white} />
  );
  const isActive = proposal.state === ProposalState.Active;

  const handleSwitchClick = () => {
    dispatch(GovernanceActions.vote({ proposal, voteFor: isFor ? 0 : 1 }));
  };

  return (
    <>
      <StyledSnowPaper {...{ color, bg }}>
        {isLoading || isVotingFor || isVotingAgainst ? (
          <StyledSkeleton variant="text" animation="wave" />
        ) : (
          <>
            <Box mr="8px" display="flex">
              {icon}
            </Box>
            <Message>{message}</Message>
          </>
        )}
      </StyledSnowPaper>
      {isActive && hasVoted && (
        <StyledContainedButton
          loading={isVotingFor || isVotingAgainst}
          onClick={handleSwitchClick}
        >
          {t(translations.GovernancePage.SwitchVote())}
        </StyledContainedButton>
      )}
    </>
  );
};

const StyledSkeleton = styled(Skeleton)({
  width: "100%",
  height: "40px",
});

const StyledContainedButton = styled(ContainedButton)({
  minHeight: "36px",
});

const Message = styled("p")({
  fontSize: "16px",
  color: CssVariables.commonTextColor,
});
const StyledSnowPaper = styled(SnowPaper)<{
  bg: CssVariables;
  color: CssVariables;
}>(({ color, bg }) => ({
  backgroundColor: bg,
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  color: color,
  minHeight: "80px",
  minWidth: "330px",
}));
