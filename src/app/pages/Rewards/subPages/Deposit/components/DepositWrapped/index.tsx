import React, { FC, useEffect } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";
import { CurrencyInput } from "./CurrencyInput";
import { AdvanceOption } from "app/components/common/advancedOptions";
import { useParams } from "react-router-dom";
import { getKeyFromPoolIndex } from "app/pages/Rewards/constants";
import { useDispatch, useSelector } from "react-redux";
import { pools } from "app/pools";
import { Pool } from "app/containers/Rewards/types";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import { DepositButton } from "./depositButton";
import { WalletBalance } from "./walletBalance";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { CompoundWithSnowball } from "./CompoundWithSnowball";
type TParams = { poolIndex: string };

export const DepositWrapped: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const pool = useSelector(RewardsPageSelectors.selectedPool);

  useEffect(() => {
    if (poolKey) {
      const pool = pools[poolKey] as Pool;
      dispatch(RewardsPageActions.setSelectedPool(pool));
    }
  }, [poolKey]);

  return (
    <StyledAddLiquidity>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <HeaderText variant="h4">
            {t(translations.RewardsPage.Deposit.Title())}
          </HeaderText>
        </Grid>

        <Grid item alignSelf="end">
          {pool && <WalletBalance token={pool?.lpToken} />}
        </Grid>

        <Grid item>
          <CurrencyInput />
        </Grid>

        <Grid item>
          <AdvanceOption />
        </Grid>

        <Grid item>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <DepositButton />
            </Grid>

            <Grid item>
              <OrText variant="body2">
                {t(translations.RewardsPage.Deposit.Or())}
              </OrText>
            </Grid>

            <Grid item>
              <CompoundWithSnowball />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledAddLiquidity>
  );
};

const StyledAddLiquidity = styled("div")({
  width: 600,
  margin: "0 auto",
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "40px",
});

const HeaderText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "26px",
});

const OrText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});
