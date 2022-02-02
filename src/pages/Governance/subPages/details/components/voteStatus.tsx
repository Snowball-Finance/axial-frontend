import { Box, Skeleton, styled } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DangerIcon from "../../../../../assets/iconComponents/dangerIcon";
import ThumbsDownIcon from "../../../../../assets/iconComponents/thumbsDown";
import ThumbsUpIcon from "../../../../../assets/iconComponents/thumbsUp";
import { SnowPaper } from "../../../../../components/injectedByNewStructure/base/SnowPaper";
import { ContainedButton } from "../../../../../components/injectedByNewStructure/common/buttons/containedButton";
import { selectIsLoadingReceipt, selectReceipt, selectIsVotingFor, selectIsVotingAgainst } from "../../../../../containers/BlockChain/Governance/selectors";
import { GovernanceActions } from "../../../../../containers/BlockChain/Governance/slice";
import { Proposal, ProposalStates } from "../../../../../containers/BlockChain/Governance/types";
import { selectLibrary } from "../../../../../containers/BlockChain/Web3/selectors";
import { env } from "../../../../../environment";
import { CssVariables } from "../../../../../styles/cssVariables/cssVariables";
import { formatNumber } from "../../../../../utils/format";
interface Props {
  proposal: Proposal;
}

export const VoteStatus: FC<Props> = ({ proposal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLoading = useSelector(selectIsLoadingReceipt);
  const receipt = useSelector(selectReceipt);
  const isFor = receipt?.support || false;
  const hasVoted = receipt?.hasVoted || false;
  const isVotingFor = useSelector(selectIsVotingFor);
  const isVotingAgainst = useSelector(selectIsVotingAgainst);
  const library = useSelector(selectLibrary);

  useEffect(() => {
    if (library) {
      dispatch(GovernanceActions.getVotingReceipt({ proposal }));
    }
    return () => {};
  }, [library]);

  const longMessage = t(
    "youVotedForAgainstThisProposalWithAmountGovernanceToken",
    {
      forAgainst: isFor
        ? t("For")
        : t("Against"),
      amount: formatNumber(receipt?.votes || 0, 2),
      name: env.GOVERNANCE_TOKEN_NAME,
    }
  );
  const message = hasVoted
    ? longMessage
    : proposal.state === ProposalStates.active
    ? t("YouHaventVotedOnThisProposalYet")
    : t("YouDidntVoteOnThisProposal");

  const bg = isLoading
    ? CssVariables.white
    : !hasVoted
    ? CssVariables.mildYellow
    : isFor
    ? CssVariables.green
    : CssVariables.red;
  const color = !hasVoted ? CssVariables.dark : CssVariables.white;
  const icon = !hasVoted ? (
    <DangerIcon />
  ) : isFor ? (
    <ThumbsUpIcon color={CssVariables.white} />
  ) : (
    <ThumbsDownIcon color={CssVariables.white} />
  );
  const isActive = proposal.state === ProposalStates.active;

  const handleSwitchClick = () => {
    dispatch(GovernanceActions.vote({ proposal, voteFor: !isFor }));
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
          {t("SwitchVote")}
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
  color: CssVariables.dark,
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
