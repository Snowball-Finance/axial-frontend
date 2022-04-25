import React, { FC, useEffect } from "react";
import { styled, Skeleton, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";
import { OutlinedButton } from "app/components/common/buttons/outlinedButton";
import { RewardsPageActions } from "app/pages/Rewards/slice";
import {
  getKeyFromPoolIndex,
  POOLS_INFO_MAP,
} from "app/pages/Rewards/constants";
import { RewardsPageSelectors } from "app/pages/Rewards/selectors";
import { CssVariables, FontFamilies } from "styles/cssVariables/cssVariables";
import { mobile } from "styles/media";

type TParams = { poolIndex: string };

export const CompoundWithSnowball: FC = () => {
  const { t } = useTranslation();

  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const poolAddress = POOLS_INFO_MAP[poolKey]?.snowglobeAddress;
  const poolPairName = POOLS_INFO_MAP[poolKey]?.pair;

  const compoundWithSnowballAPY = useSelector(
    RewardsPageSelectors.calculatedCompoundWithSnowballAPY
  );
  const loading = useSelector(RewardsPageSelectors.compoundWithSnowballLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (poolAddress) {
      dispatch(RewardsPageActions.poolInfoByAddress(poolAddress));
    }
  }, []);

  return (
    <Anchor
      target="_blank"
      rel="noreferrer"
      href={`https://app.snowball.network/compound-and-earn?pool=${poolPairName}`}
    >
      <Button disabled={!poolAddress} fullWidth>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Text variant="body1">
              {t(translations.RewardsPage.Deposit.CompoundWithSnowball())}
            </Text>
          </Grid>
          <Grid item>
            <Text variant="body1">
              {loading ? (
                <TextLoader width={20} />
              ) : poolAddress ? (
                `${parseFloat(compoundWithSnowballAPY).toFixed(2)}%`
              ) : (
                "0.00%"
              )}
            </Text>
          </Grid>
          <Grid item>
            <Text variant="body1">
              {t(translations.RewardsPage.Deposit.APY())}
            </Text>
          </Grid>
        </Grid>
      </Button>
    </Anchor>
  );
};

const Anchor = styled("a")({
  textDecoration: "none",
  textAlign: "center",
  fontFamily: FontFamilies.IBMPlexSans,
  width: "100%",
});

const TextLoader = styled(Skeleton)({
  backgroundColor: CssVariables.primary,
});

const Text = styled(Typography)({
  color: CssVariables.primary,
});

const Button = styled(OutlinedButton)({
  [mobile]: {
    width: "100%",
  },
});
