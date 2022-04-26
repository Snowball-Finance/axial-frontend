import { FC } from "react";
import { Grid, styled, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";
import DocumentIcon from "assets/images/iconComponents/document";
import ExternalLinkIcon from "assets/images/iconComponents/externalLink";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";

export const ProposalDocument: FC = () => {
  //   const { t } = useTranslation();
  const fieldName = "document";
  const dispatch = useDispatch();
  const document = useSelector(
    GovernancePageSelectors.selectNewProposalField(fieldName)
  );

  const handleInputChange = (value: string) => {
    dispatch(
      GovernancePageActions.setNewProposalFields({ key: fieldName, value })
    );
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <DocumentIcon color={CssVariables.commonTextColor} />
          </Grid>

          <Grid item>
            <Text variant="body1">Proposal document</Text>
          </Grid>

          <Grid item>
            <ExternalLinkIcon color={CssVariables.primary} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <InputField
          margin="dense"
          size="small"
          onChange={({ target }) => handleInputChange(target.value)}
          value={document}
          fullWidth
          placeholder="Proposal document URL"
        />
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
});

const InputField = styled(TextField)({
  ".MuiInputBase-root": {
    color: CssVariables.white,
    fontSize: "16px",
    fontFamily: FontFamilies.IBMPlexSans,
    backgroundColor: CssVariables.swapInputbackground,
    border: `4px solid ${CssVariables.cardBorder}`,
    borderRadius: "20px",
  },
});
