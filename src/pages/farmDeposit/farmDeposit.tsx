import React from 'react'
import { ReactElement } from "react"


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
    farmData: {
      name: "A4D Stablecoins",
      reserve: '1234.5678',
      isPaused: false,
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

    },
  }
  const myShareDataRows = [{
    title: "my TVL",
    value: "2523($2523)",
    sub: "0.0% of pool",
  }, {
    title: 'axial Rewards',
    value: '2211($1212)',
  }, {
    title: 'AVAX Rewards',
    value: '2211($1212)',
  }]
  const stats = [
    {
      title: "fee APR",
      value: "2523($2523)",

    },
    {
      title: 'Revard APR',
      value: '2211($1212)'
    },
    {
      title: 'total APR',
      value: '2211($1212)'
    },
  ]


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
      stats={stats}
      myShareDataRows={myShareDataRows}
      title={data.farmName}
      tokens={data.tokens}
      farmData={data.farmData}
    />
  )
}



export default FarmDeposit
