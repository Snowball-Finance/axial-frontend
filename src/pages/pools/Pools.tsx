import {
  AXIAL_AS4D_POOL_NAME,
  AXIAL_AC4D_POOL_NAME,
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
import styles from "./Pools.module.scss"
import usePoolData from "../../hooks/usePoolData"

function Pools(): ReactElement | null {
  const [as4dPoolData, as4dUserShareData] = usePoolData(AXIAL_AS4D_POOL_NAME)
  const [ac4dPoolData, ac4dUserShareData] = usePoolData(AXIAL_AC4D_POOL_NAME)
  const [currentModal, setCurrentModal] = useState<string | null>(null)
  const [filter, setFilter] = useState<PoolTypes | "all" | "outdated">("all")
  const handleClickMigrate = () => {
    setCurrentModal("migrate")
  }

  function getPropsForPool(poolName: PoolName) {
    if (poolName === AXIAL_AS4D_POOL_NAME) {
      return {
        name: AXIAL_AS4D_POOL_NAME,
        poolData: as4dPoolData,
        userShareData: as4dUserShareData,
        poolRoute: "/pools/as4d",
      }
    } else {
      return {
        name: AXIAL_AC4D_POOL_NAME,
        poolData: ac4dPoolData,
        userShareData: ac4dUserShareData,
        poolRoute: "/pools/ac4d",
      }
    }
  }

  const visiblePoolList = Object.values(POOLS_MAP)
    .filter(
      ({ type, migration, isOutdated }) =>
        filter === "all" ||
        type === filter ||
        (filter === "outdated" && (migration || isOutdated)),
    )

  return (
    <div className={styles.poolsPage}>
      {/*
       THis code is being temporarly commented out until we have move pools to filter by
      <ul className={styles.filters}>
        {[
          ["all", "ALL"] as const,
          [PoolTypes.BTC, "BTC"] as const,
          [PoolTypes.ETH, "ETH"] as const,
          [PoolTypes.USD, "USD"] as const,
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
      </ul> */}
      <div className={styles.content}>
        {visiblePoolList
          .map(
            ({ name, migration, isOutdated }) =>
              [getPropsForPool(name), migration, isOutdated] as const,
          )
          .sort(
            ([a, aMigration, aIsOutdated], [b, bMigration, bIsOutdated]) => {
              // 1. active pools
              // 2. user pools
              // 3. higher TVL pools
              if (aMigration || bMigration || aIsOutdated || bIsOutdated) {
                return aMigration || aIsOutdated ? 1 : -1
              } else if (
                (a.userShareData?.usdBalance || Zero).gt(Zero) ||
                (b.userShareData?.usdBalance || Zero).gt(Zero)
              ) {
                return (a.userShareData?.usdBalance || Zero).gt(
                  b.userShareData?.usdBalance || Zero,
                )
                  ? -1
                  : 1
              } else {
                return (a.poolData?.reserve || Zero).gt(
                  b.poolData?.reserve || Zero,
                )
                  ? -1
                  : 1
              }
            },
          )
          .map(([poolProps, migrationPool]) => (
            <PoolOverview
              key={poolProps.name}
              {...poolProps}
              onClickMigrate={
                migrationPool ? () => handleClickMigrate() : undefined
              }
            />
          ))}
        {visiblePoolList.length === 0 && <p className={styles.noPools}>No pools were found.</p>}
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

export default Pools
