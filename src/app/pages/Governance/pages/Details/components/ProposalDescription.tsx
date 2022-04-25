import { FC } from "react";
import { Grid, styled, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";

// import { translations } from "locales/i18n";
import { CssVariables } from "styles/cssVariables/cssVariables";

export const ProposalDescription: FC = () => {
  // const { t } = useTranslation();

  return (
    <StyledPoolCard>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Text variant="body1">Proposal description</Text>
        </Grid>

        <Grid item>
          <Text variant="body2">
            As was announced today
            (https://twitter.com/AxialDeFi/status/1464783059547410434) we have
            officially partnered with OrcaDAO (https://www.avai.finance/). After
            frequent request from our community, and in support of our new
            partners. I propose that we launch a new pool consisting of
            AVAI-MIM-USDC.e. USDC.e was chosen since it has the greatest
            liquidity on Avalanche. MIM was chosen because it also has
            sufficient liquidity, and it is brought to Avalanche through the
            Anyswap bridge. We chose MIM over DAI.e or USDT.e because both DAI.e
            and USDT.e are brought over the Avax Bridge (AB), and part of our
            mission is to better facilitate trades between assets from
            dissimilar bridges. As part of our relationship with OrcaDAO, they
            will provide liquidity reward incentives to this pool alongside our
            AXIAL rewards. This is meant to begin a conversation about this
            pool, prior to an official proposal and vote.
          </Text>
        </Grid>
      </Grid>
    </StyledPoolCard>
  );
};

const StyledPoolCard = styled("div")({
  backgroundColor: CssVariables.poolCardBackground,
  border: `4px solid ${CssVariables.cardBorder}`,
  borderRadius: "20px",
  padding: "20px",
});

const Text = styled(Typography)({
  color: CssVariables.white,
});
