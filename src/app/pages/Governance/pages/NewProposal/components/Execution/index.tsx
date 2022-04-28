import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CardWrapper } from "app/components/wrappers/Card";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { GovernancePageState } from "app/pages/Governance/types";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { InputField } from "../InputField";

export const Execution: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const canSubmitNewExecutionContext = useSelector(
    GovernancePageSelectors.canSubmitNewExecutionContext
  );
  const executionFields = useSelector(
    GovernancePageSelectors.currentExecutionContext
  );
  const { avaxValue, contractAddress, data, description } = executionFields;

  const handleInputChange = (
    key: keyof GovernancePageState["currentExecutionContext"],
    value: string
  ) => {
    dispatch(
      GovernancePageActions.setCurrentExecutionContextField({ key, value })
    );
  };

  const handleAddExecutionClick = () => {
    dispatch(
      GovernancePageActions.addToSubmittedExecutionContexts(executionFields)
    );
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Text variant="h2">{t(translations.GovernancePage.Execution())}</Text>
      </Grid>

      <Grid item>
        <CardWrapper>
          <Grid container spacing={2}>
            <Grid item container spacing={1} xs={12}>
              <Grid item xs={12}>
                <Title variant="body1">
                  {t(translations.GovernancePage.Description())}
                </Title>
              </Grid>
              <Grid item xs={12}>
                <InputField
                  onChange={({ target }) =>
                    handleInputChange("description", target.value)
                  }
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="dense"
                  placeholder="A short description of execution context"
                  value={description}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={1} xs={12}>
              <Grid item xs={12}>
                <Title variant="body1">
                  {t(translations.GovernancePage.ContractAddress())}
                </Title>
              </Grid>
              <Grid item xs={12}>
                <InputField
                  onChange={({ target }) =>
                    handleInputChange("contractAddress", target.value)
                  }
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="dense"
                  placeholder="The addresses of the contracts for each execution"
                  value={contractAddress}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={1} xs={12}>
              <Grid item xs={12}>
                <Title variant="body1">
                  {t(translations.GovernancePage.AVAXValue())}
                </Title>
              </Grid>
              <Grid item xs={12}>
                <InputField
                  onChange={({ target }) =>
                    handleInputChange("avaxValue", target.value)
                  }
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="dense"
                  placeholder="The amount of AVAX to send each contract on execution"
                  value={avaxValue}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={1} xs={12}>
              <Grid item xs={12}>
                <Title variant="body1">
                  {t(translations.GovernancePage.Data())}
                </Title>
              </Grid>
              <Grid item xs={12}>
                <InputField
                  onChange={({ target }) =>
                    handleInputChange("data", target.value)
                  }
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="dense"
                  placeholder="Encoded function parameters for each execution"
                  value={data}
                  multiline
                  rows={10}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid item container justifyContent="flex-end">
                <OutlinedButton
                  startIcon={<AddIcon />}
                  onClick={handleAddExecutionClick}
                  disabled={!canSubmitNewExecutionContext}
                >
                  {t(translations.GovernancePage.AddExecution())}
                </OutlinedButton>
              </Grid>
            </Grid>
          </Grid>
        </CardWrapper>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});

const Title = styled(Typography)({
  color: CssVariables.white,
});
