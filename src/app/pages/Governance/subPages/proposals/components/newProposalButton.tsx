import { Box, styled } from "@mui/material";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { GovernanceSelectors } from "app/containers/BlockChain/Governance/selectors";
import { GovernanceSubPages } from "app/pages/Governance/routes";
import AddInCircleIcon from "assets/images/iconComponents/addInCircle";
import { push } from "connected-react-router";
import { translations } from "locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const NewProposalButton = () => {
  const dispatch = useDispatch();
  const canAddNewProposal = useSelector(
    GovernanceSelectors.canAddNewProposal
  );

  const handleClick = () => {
    dispatch(push(GovernanceSubPages.newProposal));
  };

  const { t } = useTranslation();
  return (
    <StyledButton disabled={!canAddNewProposal} onClick={handleClick}>
      <Box mr={1} display="flex">
        <AddInCircleIcon
          color={!canAddNewProposal ? CssVariables.grey : CssVariables.white}
        />
      </Box>
      {t(translations.GovernancePage.NewProposal())}
    </StyledButton>
  );
};

const StyledButton = styled(ContainedButton)({
  fontSize: "16px",
  height: "48px",
});
