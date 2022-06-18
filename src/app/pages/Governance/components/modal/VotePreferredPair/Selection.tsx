import { FC } from "react";
import { Checkbox, Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CardWrapper } from "app/components/wrappers/Card";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { useDispatch, useSelector } from "react-redux";
import {
  PoolsAndGaugesSelectors,
  selectIsLoadingUserPoolsAndGauges,
} from "app/containers/PoolsAndGauges/selectors";
import { GovernancePageSelectors } from "app/pages/Governance/selectors";
import { GaugeItem } from "app/containers/PoolsAndGauges/types";
import { GovernancePageActions } from "app/pages/Governance/slice";
import { AllocationInput } from "./AllocationInput";
import { formatNumber } from "common/format";

export const Selection: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const gauges = useSelector(PoolsAndGaugesSelectors.gauges);
  const selectedGauges = useSelector(
    GovernancePageSelectors.selectedVoteAllocationGaugesObj
  );
  const isLoading = useSelector(selectIsLoadingUserPoolsAndGauges);

  const handleGaugeClick = (gauge: GaugeItem) => {
    dispatch(GovernancePageActions.toggleSelectedGauge(gauge));
  };

  const valueFormatter = (data: GaugeItem) => {
    const pickleAPYMin = data.fullApy * 100 * 0.4;
    const pickleAPYMax = data.fullApy * 100;
    return `${formatNumber(pickleAPYMin, 2)} ~ ${formatNumber(
      pickleAPYMax,
      2
    )}`;
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <StyledCardWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <Text variant="body1" align="left">
                {t(translations.GovernancePage.VoteAllocation.Pairs())}
              </Text>
            </Grid>
            <Grid item xs={4}>
              <Text variant="body1" align="center">
                {t(translations.GovernancePage.VoteAllocation.YourAllocation())}
              </Text>
            </Grid>
            <Grid item xs={4}>
              <Text variant="body1" align="right">
                {t(translations.GovernancePage.VoteAllocation.Variation())}
              </Text>
            </Grid>
          </Grid>
        </Grid>

        {gauges.map((gauge: GaugeItem) => {
          return (
            <Grid item xs={12} key={gauge.address}>
              <Grid container>
                <Grid item xs={4}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Grid item>
                      <CustomCheckbox
                        checked={Object.keys(selectedGauges).includes(
                          gauge.address
                        )}
                        onChange={() => {
                          handleGaugeClick(gauge);
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Text variant="body1">{gauge.depositTokenName}</Text>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <AllocationInput data={gauge} />
                </Grid>

                <Grid item xs={4}>
                  <Text variant="body2" align="right">
                    {valueFormatter(gauge)}
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled(CardWrapper)({
  maxWidth: `calc(100vw - 65px)`,
});

const Text = styled(Typography)({
  color: CssVariables.white,
});

const CustomCheckbox = styled(Checkbox)({
  path: {
    fill: CssVariables.green,
  },
});
