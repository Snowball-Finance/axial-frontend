/**
*
* Rewards
*
*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { useRewardsSlice } from './slice';
import usePoolData from "./hooks/usePoolData";
import { AXIAL_AA3D_POOL_NAME, AXIAL_AC4D_POOL_NAME, AXIAL_AM3D_POOL_NAME, AXIAL_AS4D_POOL_NAME, AXIAL_JLP_POOL_NAME, PoolName, USDC_AM3D_POOL_NAME } from "app/constants";

export function Rewards() {
  useRewardsSlice()

  const [as4dPoolData, as4dUserShareData] = usePoolData(AXIAL_AS4D_POOL_NAME)
  const [ac4dPoolData, ac4dUserShareData] = usePoolData(AXIAL_AC4D_POOL_NAME)
  const [am3dPoolData, am3dUserShareData] = usePoolData(AXIAL_AM3D_POOL_NAME)
  const [aa3dPoolData, aa3dUserShareData] = usePoolData(AXIAL_AA3D_POOL_NAME)
  const [usdcAm3dPoolData, usdcAm3dUserShareData] = usePoolData(
    USDC_AM3D_POOL_NAME,
  )
  const [jlpPoolData, jlpUserShareData] = usePoolData(AXIAL_JLP_POOL_NAME)

  function getPropsForPool(poolName: PoolName) {
    if (poolName === AXIAL_AS4D_POOL_NAME) {
      return {
        name: AXIAL_AS4D_POOL_NAME,
        poolData: as4dPoolData,
        userShareData: as4dUserShareData,
        poolRoute: "/rewards/as4d",
      }
    } else if (poolName === AXIAL_AC4D_POOL_NAME) {
      return {
        name: AXIAL_AC4D_POOL_NAME,
        poolData: ac4dPoolData,
        userShareData: ac4dUserShareData,
        poolRoute: "/rewards/ac4d",
      }
    } else if (poolName === AXIAL_AM3D_POOL_NAME) {
      return {
        name: AXIAL_AM3D_POOL_NAME,
        poolData: am3dPoolData,
        userShareData: am3dUserShareData,
        poolRoute: "/rewards/am3d",
      }
    } else if (poolName === AXIAL_AA3D_POOL_NAME) {
      return {
        name: AXIAL_AA3D_POOL_NAME,
        poolData: aa3dPoolData,
        userShareData: aa3dUserShareData,
        poolRoute: "/rewards/aa3d",
      }
    } else if (poolName === USDC_AM3D_POOL_NAME) {
      return {
        name: USDC_AM3D_POOL_NAME,
        poolData: usdcAm3dPoolData,
        userShareData: usdcAm3dUserShareData,
        poolRoute: "/rewards/usdc",
      }
    } else if (poolName === AXIAL_JLP_POOL_NAME) {
      return {
        name: AXIAL_JLP_POOL_NAME,
        poolData: jlpPoolData,
        userShareData: jlpUserShareData,
        poolRoute: "/rewards/jlp",
      }
    } else {
      throw new Error("Not mapped Pool")
    }
  }
console.log(getPropsForPool(AXIAL_AS4D_POOL_NAME))

  return (
    <></>
  );

};
