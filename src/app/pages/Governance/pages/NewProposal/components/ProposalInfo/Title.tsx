import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { InputField } from "../InputField";

export const Title: FC = () => {
  const { t } = useTranslation();

  const fieldName = "title";
  const dispatch = useDispatch();
  const title = useSelector(
    GovernancePageSelectors.selectNewProposalField(fieldName)
  );

  const handleInputChange = (value: string) => {
    dispatch(
      GovernancePageActions.setNewProposalFields({ key: fieldName, value })
    );
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Text variant="h2">
          {t(translations.GovernancePage.Titleofnewproposal())}
        </Text>
      </Grid>

      <Grid item>
        <InputField
          onChange={({ target }) => handleInputChange(target.value)}
          fullWidth
          variant="outlined"
          size="small"
          margin="dense"
          value={title}
          placeholder="Title of new proposal"
        />
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
