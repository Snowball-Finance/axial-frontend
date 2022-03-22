import React, { FC, useState } from "react";
import { styled, Grid, Typography } from "@mui/material";

import { CssVariables } from "styles/cssVariables/cssVariables";
import { ContainedButton } from "app/components/common/buttons/containedButton";
import { AdvanceOption } from "./AdvanceOption";
import { CurrencyInput } from "../../../../components/CurrencyInput";
import { SnowModal } from "app/components/common/modal";
import { DepositModal } from "app/pages/Liquidity/components/modal/Deposit";

export const AddLiquidity: FC = () => {
  const [open, setOpen] = useState<boolean>(false); //TODO: implemented for testing, please change the functionality while integration

  return (
    <>
      <StyledAddLiquidity>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <HeaderText variant="h4">ADD LIQUIDITY</HeaderText>
          </Grid>

          {[1, 2, 3, 4].map((inputItem) => (
            <Grid item key={inputItem}>
              <Grid container direction="column" spacing={1}>
                <Grid item alignSelf="end">
                  <BalanceText variant="body2">
                    Wallet balance: 0.00
                  </BalanceText>
                </Grid>

                <Grid item>
                  <CurrencyInput />
                </Grid>
              </Grid>
            </Grid>
          ))}

          <Grid item>
            <AdvanceOption />
          </Grid>

          <Grid item alignSelf="center">
            <ContainedButton width={220} onClick={() => setOpen(true)}>
              Deposit
            </ContainedButton>
          </Grid>
        </Grid>
      </StyledAddLiquidity>

      {open && (
        <SnowModal isOpen={open} onClose={() => setOpen(false)}>
          <DepositModal />
        </SnowModal>
      )}
    </>
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

const BalanceText = styled(Typography)({
  color: CssVariables.white,
  fontSize: "16px",
});
