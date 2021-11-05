import React from 'react'
import { ReactElement } from "react"

import { BigNumber } from "@ethersproject/bignumber"

import FarmDepositPage from './farmDepositPage'




function FarmDeposit(): ReactElement | null {
  const data = {
    farmName: 'farmNNAme',
    tokens: [
      {
        symbol: "DAI.e",
        name: "Dai",
        icon: "/static/media/dai.664df0db.svg",
        max: "0.21333162088331379",
        inputValue: ""
      },

    ],
    exceedsWallet: false,
    farmData: {
      name: "A4D Stablecoins",
      rapy: 0,
      tokens: [
        {
          icon: "/static/media/dai.664df0db.svg",
          name: "Dai",
          symbol: "DAI.e",
          value: "100.21",
        },
        {
          icon: "/static/media/usdt.2499bf87.svg",
          name: "Tether",
          symbol: "USDT.e",
          value: "4.0",
        },
        {
          icon: "/static/media/tusd.b234bc44.svg",
          name: "TUSD Coin",
          symbol: "TUSD",
          value: "99.99",
        },
        {
          icon: "/static/media/usdc.1fa5e7f4.svg",
          name: "USDC",
          symbol: "USDC.e",
          value: "1.0",
        }
      ],
      reserve: BigNumber.from("0x15b2159fbe6b014f5c"),

    },

  }
  const onConfirmTransaction = (): any => {
    console.log('confirmClick');
  }
  const updateTokenFormValue = () => {
    console.log('updateTokenFormValue');
  }
  return (
    <FarmDepositPage
      onConfirmTransaction={onConfirmTransaction}
      onChangeTokenInputValue={updateTokenFormValue}
      onToggleDepositWrapped={() =>
        console.log('onToggleDepositWrapped')
      }
      title={data.farmName}
      tokens={data.tokens}
      exceedsWallet={data.exceedsWallet}
      farmData={data.farmData}
    />
  )
}



export default FarmDeposit
