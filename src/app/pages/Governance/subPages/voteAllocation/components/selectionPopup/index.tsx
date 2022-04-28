import { Box, ClickAwayListener, styled } from "@mui/material";
import { SnowPaper } from "app/components/base/SnowPaper";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { useDispatch } from "react-redux";
import { PoolProviders } from "./poolProviders";
import { PoolsList } from "./poolsList";
import { PairSelectionSearchInput } from "./search";

export const SelectionPopup = () => {
  const dispatch = useDispatch();

  const handleClickAway = () => {
    dispatch(GovernancePageActions.setIsVoteAllocationSelectionOpen(false));
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Wrapper>
          <PairSelectionSearchInput />
          <PoolProviders />
          <PoolsList />
        </Wrapper>
      </Box>
    </ClickAwayListener>
  );
};

const Wrapper = styled(SnowPaper)<any>(() => ({
  position: "absolute",
  top: "calc(100% + 4px)",
  width: "100%",
  zIndex: 1,
  right: 0,
  padding: "16px 12px",
}));
