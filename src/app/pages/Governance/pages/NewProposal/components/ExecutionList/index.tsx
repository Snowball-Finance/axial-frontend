import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CardWrapper } from "app/components/wrappers/Card";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { ExecutionListItem } from "./ExecutionListItem";

export const ExecutionList: FC = () => {
  const { t } = useTranslation();

  const submittedExecutionContexts = useSelector(
    GovernancePageSelectors.submittedExecutionContexts
  );

  if (submittedExecutionContexts.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Text variant="h2">
          {t(translations.GovernancePage.ExecutionList())}
        </Text>
      </Grid>

      <Grid item>
        <Grid container direction="column" spacing={2}>
          {submittedExecutionContexts.map((item, index) => {
            return (
              <Grid item key={index}>
                <CardWrapper>
                  <ExecutionListItem
                    description={item.description}
                    contractAddress={item.contractAddress}
                    avaxValue={item.avaxValue}
                    data={item.data}
                    index={index}
                  />
                </CardWrapper>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

const Text = styled(Typography)({
  color: CssVariables.white,
  textTransform: "uppercase",
});
