import {
  AXIAL_A4D_POOL_NAME,
  POOLS_MAP,
  PoolName,
  PoolTypes,
} from "../../constants"
import React, { ReactElement, useState } from "react"

import ConfirmTransaction from "../../components/confirm-transaction/ConfirmTransaction"
import Modal from "../../components/modal/Modal"
import PoolOverview from "../../components/pool-info-card/PoolOverview"
import TopMenu from "../../components/menu/TopMenu"
import { Zero } from "@ethersproject/constants"
import classNames from "classnames"
import styles from "./Farm.module.scss"
import usePoolData from "../../hooks/usePoolData"
import { BigNumber } from "ethers"
import FarmOverview from "../../components/farm-info-card/FarmOverview"

function Farm(): ReactElement | null {
  const [a4dPoolData, a4dUserShareData] = usePoolData(AXIAL_A4D_POOL_NAME)
  const [currentModal, setCurrentModal] = useState<string | null>(null)
  const [filter, setFilter] = useState<PoolTypes | "all" | "outdated">("all")
  const handleClickMigrate = () => {
    setCurrentModal("migrate")
  }

  function getPropsForPool(poolName: PoolName) {
    return {
      name: AXIAL_A4D_POOL_NAME,
      poolData: a4dPoolData,
      userShareData: a4dUserShareData,
      poolRoute: "/pools/a4d",
    }
  }
  return (
    <div className={styles.poolsPage}>
      <TopMenu activeTab="farm" />
      <ul className={styles.filters}>
        {[
          ["all", "ALL"] as const,
          // [PoolTypes.BTC, "BTC"] as const,
          // [PoolTypes.ETH, "ETH"] as const,
          // [PoolTypes.USD, "USD"] as const,
        ].map(([filterKey, text]) => (
          <li
            key={filterKey}
            className={classNames(styles.filterTab, {
              [styles.selected]: filter === filterKey,
            })}
            onClick={(): void => setFilter(filterKey)}
          >
            {text}
          </li>
        ))}
      </ul>
      <div className={styles.content}>
        <FarmOverview
          farmName="A4D Stablecoins"
          farmRoute="/farm"
          feeAPR="10%"
          tvl="$400.0m"
          myTVL="42.2k"
          hasShare
          isOutdated={false}
          isPaused={false}
          shouldMigrate={false}
          onClickMigrate={() => {
            console.log('migrate clicked')
          }}
          reserve="jkhkjh"
          totalAPR="234"
          userBalanceUSD="zs"
          tokens={[
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
              value: "99999999000000.0",
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
              value: "99999974000000.0",
            }
          ]}


        />
      </div>
      <Modal
        isOpen={!!currentModal}
        onClose={(): void => setCurrentModal(null)}
      >
        {currentModal === "confirm" ? <ConfirmTransaction /> : null}
      </Modal>
    </div>
  )
}

export default Farm
