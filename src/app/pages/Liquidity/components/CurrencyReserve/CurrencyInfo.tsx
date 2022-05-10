import React, { FC } from "react";
import { styled, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { PoolTypes, TokenShareType } from "app/containers/Rewards/types";
import { commify, formatBNToString } from "app/containers/utils/contractUtils";
import { pools } from "app/pools";
import { tokens } from "app/tokens";
import { RewardsSelectors } from "app/containers/Rewards/selectors";
import { getKeyFromPoolIndex } from "../../constants";
import { mobile } from "styles/media";

type TParams = { poolIndex: string };

export const CurrencyInfo: FC = () => {
  const { poolIndex } = useParams<TParams>();
  const poolKey = getKeyFromPoolIndex(poolIndex) || "";
  const poolData = useSelector(RewardsSelectors.poolData(poolKey));
  console.log({
    poolKey,
    poolData,
    pools,
  });
  const formattedDecimals = pools[poolKey].poolType === PoolTypes.USD ? 2 : 4;

  return (
    <StyledInfo>
      <Grid container spacing={4}>
        {poolData?.tokens.map((infoItem: TokenShareType) => (
          <Grid item key={infoItem.symbol} xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={4}>
                <Grid container spacing={1}>
                  <Grid item>
                    <IconImage
                      src={tokens[infoItem.symbol].logo}
                      alt="icon"
                    ></IconImage>
                  </Grid>

                  <Grid item alignSelf="center">
                    <TokenText variant="body1">{infoItem.symbol}</TokenText>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <BalanceText variant="body1">{infoItem.percent}</BalanceText>
              </Grid>

              <Grid item xs={5}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={4} alignSelf="right">
                    <BalanceLabelText variant="body1" align="right">
                      TVL
                    </BalanceLabelText>
                  </Grid>

                  <Grid item xs zeroMinWidth alignSelf="left">
                    <BalanceText variant="body2" noWrap align="left">
                      $
                      {commify(
                        formatBNToString(infoItem.value, 18, formattedDecimals)
                      )}
                    </BalanceText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </StyledInfo>
  );
};

const StyledInfo = styled("div")({
  width: "100%",
  backgroundColor: CssVariables.swapInputbackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: 20,

  [mobile]: {
    padding: 10,
  },
});

const IconImage = styled("img")({
  width: "33px",
  height: "33px",

  [mobile]: {
    width: "25px",
  },
});

const TokenText = styled(Typography)({
  color: CssVariables.white,

  [mobile]: {
    fontSize: "1rem",
  },
});

const BalanceLabelText = styled(Typography)({
  color: CssVariables.white,
  fontWeight: "bold",
});

const BalanceText = styled(Typography)({
  color: CssVariables.white,
});
