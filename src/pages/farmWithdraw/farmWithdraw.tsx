import { PoolName } from "../../constants"
import React, { ReactElement } from "react"

import { BigNumber } from "@ethersproject/bignumber"

import FarmWithdrawPage from "../../components/farmWithdrawPage/FarmWithdrawPage"

interface Props {
  poolName: PoolName
}
function FarmWithdraw({ poolName }: Props): ReactElement {
  const data = {
    poolName: "A4D Stablecoins",
    reviewWithdrawData: {
      withdraw: [],
      rates: [],
      slippage: "0.1",
      priceImpact: BigNumber.from("0x00"),
      txnGasCost: {
        amount: BigNumber.from("0x8583b0"),
        valueUSD: null
      }
    },
    tokensData: [
      {
        name: "Dai",
        symbol: "DAI.e",
        icon: "/static/media/dai.664df0db.svg",
        inputValue: "0"
      },

    ],
    farmData: {
      name: "A4D Stablecoins",
      tokens: [
        {
          icon: "/static/media/dai.664df0db.svg",
          name: "Dai",
          symbol: "DAI.e",
          value: "100.21"
        },
        {
          icon: "/static/media/usdt.2499bf87.svg",
          name: "Tether",
          symbol: "USDT.e",
          value: "4.0"
        },
        {
          icon: "/static/media/tusd.b234bc44.svg",
          name: "TUSD Coin",
          symbol: "TUSD",
          value: "99.99"
        },
        {
          icon: "/static/media/usdc.1fa5e7f4.svg",
          name: "USDC",
          symbol: "USDC.e",
          value: "1.0"
        }
      ],
      reserve: '123.456',

    },
    //if userShareData is null or  userShareData.lpTokenBalance is equal to 0 then withdraw button will be disabled
    userShareData: {
      name: "A4D Stablecoins",
      share: BigNumber.from("0x00"),
      dataRows: [
        {
          title: "my TVL",
          value: "2523($2523)",
          sub: "0.0% of pool"
        },
        {
          title: 'axial Rewards',
          value: '2211($1212)'
        },
        {
          title: 'AVAX Rewards',
          value: '2211($1212)'
        },
      ],
      lpTokenBalance: BigNumber.from("0x00")
    },
    //by changing the FarmWithdraw Percent or Farm Withdraw token value , this field should be updated
    // and if in this field, error field has a value or lpTokenAmountToSpend field is equal to zero then withdraw button will be disabled
    withdrawFormState: {
      percentage: "",
      tokenInputs: {
        "DAI.e": {
          isEmpty: false,
          isValid: true,
          precision: 18,
          valueRaw: "0",
          valueSafe: "0"
        },
      },
      withdrawType: "ALL",
      error: null,
      lpTokenAmountToSpend: BigNumber.from("0x00")
    }
  }

  const onConfirmTransaction = async () => {
    await Promise.resolve(1)
    console.log('handle Confirm transaction in farmWithdraw')
  }

  const handleWithdrawPercentChange = (percent: string) => {
    console.log("on FarmWithdraw Percent Change", percent);
  }
  const handleTokenValueChange = ({ tokenValue, tokenSymbol }: { tokenValue: string, tokenSymbol: string }) => {
    console.log('on Farm Withdraw token value change', { tokenValue, tokenSymbol });
  }

  //if myShareData is null or  myShareData.lpTokenBalance is equal to 0 then withdraw button will be disabled

  return (
    <FarmWithdrawPage
      title={poolName}
      reviewData={data.reviewWithdrawData}
      tokensData={data.tokensData}
      farmData={data.farmData}
      myShareData={data.userShareData}
      formStateData={data.withdrawFormState}
      onTokenValueChange={handleTokenValueChange}
      onWithdrawPercentChange={handleWithdrawPercentChange}
      onConfirmTransaction={onConfirmTransaction}
    />
  )
}

export default FarmWithdraw
