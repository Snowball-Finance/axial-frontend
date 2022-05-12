import {
  formatBNToPercentString,
  getContract,
  getProviderOrSigner,
  getTokenSymbolForPoolType,
} from "app/containers/utils/contractUtils";
import { pools } from "app/pools";
import { Pool, PoolTypes } from "../types";
import LPTOKEN_UNGUARDED_ABI from "abi/lpTokenUnguarded.json";
import { LpTokenUnguarded } from "abi/ethers-contracts/LpTokenUnguarded";
import { Zero, ZERO_ADDRESS } from "../constants";

import { BigNumber, Contract, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { all, call, select } from "redux-saga/effects";
import { Token } from "app/containers/Swap/types";
import { Web3Domains } from "app/containers/BlockChain/Web3/selectors";
import { GlobalDomains } from "app/appSelectors";
import { RewardsDomains } from "../selectors";

export interface CalculatePoolDataProps {
  pool: Pool;
  isRewardsPool?: boolean;
}
export function* calculatePoolData(props: CalculatePoolDataProps) {
  const { pool, isRewardsPool } = props;

  const library = yield select(Web3Domains.selectNetworkLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const tokenPricesUSD = yield select(GlobalDomains.tokenPricesUSD);
  const aprData = yield select(RewardsDomains.aprData);
  const poolsBalances = yield select(RewardsDomains.poolsBalances);
  const swapStats = yield select(RewardsDomains.swapStats);

  const poolEffectiveContract = new Contract(
    pool.swapAddress || pool.gauge_address,
    pool.swapABI,
    getProviderOrSigner(library, account)
  );
  const poolKey = pool.key;
  //@ts-ignore ignored because we will always have pool( POOL.poolType)
  const POOL: Pool = pools[poolKey];
  if (tokenPricesUSD == null || POOL.poolType === PoolTypes.LP) {
    if (!library) {
      return;
    }
    if (poolKey && library) {
      //@ts-ignore ignored because we will always have pool
      if (POOL.poolType !== PoolTypes.LP) {
        return;
      }
      let poolAprData;
      if (aprData && poolsBalances && aprData[POOL.address]) {
        poolAprData = aprData[POOL.address];
      } else {
        return;
      }
      const lpTokenContract = getContract(
        POOL.lpToken.address,
        LPTOKEN_UNGUARDED_ABI,
        library,
        account ?? undefined
      ) as LpTokenUnguarded;
      let totalLpTokenBalance = yield call(lpTokenContract.balanceOf, account);
      const poolApr = poolAprData?.apr ?? 0;
      let DEXLockedBN = BigNumber.from(0);
      if (poolAprData?.tokenPoolPrice > 0 && totalLpTokenBalance.gt("0x0")) {
        const totalLocked =
          poolAprData?.tokenPoolPrice * (+totalLpTokenBalance / 1e18);
        DEXLockedBN = BigNumber.from(totalLocked.toFixed(0)).mul(
          BigNumber.from(10).pow(18)
        );
      }
      let tokenPoolPriceBN = BigNumber.from(0);
      try {
        tokenPoolPriceBN = ethers.utils.parseUnits(
          poolAprData.tokenPoolPrice.toFixed(2)
        );
      } catch (error) {
        console.log("Error converting Float to BN");
      }
      const poolData = {
        name: poolKey,
        rapr: poolApr,
        tokens: [],
        reserve: BigNumber.from("0"),
        totalLocked: DEXLockedBN,
        virtualPrice: BigNumber.from("0"),
        adminFee: BigNumber.from("0"),
        swapFee: BigNumber.from("0"),
        aParameter: BigNumber.from("0"),
        volume: 0,
        utilization: null,
        apr: 0,
        extraapr: 0,
        lpTokenPriceUSD: tokenPoolPriceBN,
        lpToken: POOL.lpToken.symbol,
        isPaused: false,
      };
      const userPoolsBalances = poolsBalances[POOL.lpToken.symbol];
      if (!userPoolsBalances) {
        return { poolData, userShareData: undefined };
      }
      const userLpTokenBalance = userPoolsBalances.userInfo.amount;

      const share = userLpTokenBalance
        ?.mul(BigNumber.from(10).pow(18))
        .div(
          totalLpTokenBalance.isZero()
            ? BigNumber.from("1")
            : totalLpTokenBalance
        );
      const usdBalance = DEXLockedBN.isZero()
        ? BigNumber.from("0")
        : DEXLockedBN.mul(share).div(BigNumber.from(10).pow(18));

      const userShareData = account
        ? {
            name: poolKey,
            share: share,
            underlyingTokensAmount: userLpTokenBalance,
            usdBalance: usdBalance,
            tokens: [],
            lpTokenBalance: userLpTokenBalance,
            poolBalance: userPoolsBalances,
          }
        : null;
      return { poolData, userShareData };
    } else {
      return;
    }
  }
  //@ts-ignore ignored because we will always have pool
  let symbol = POOL.lpToken.symbol;

  const userPoolBalance = poolsBalances ? poolsBalances[symbol] : null;
  const effectivePoolTokens = POOL.underlyingPoolTokens || POOL.poolTokens;
  const isMetaSwap = POOL.swapAddress != null;

  // Swap fees, price, and LP Token data
  const [isPaused, swapStorage] = yield all([
    call(poolEffectiveContract.paused),
    call(poolEffectiveContract?.swapStorage),
  ]);

  let { adminFee, swapFee } = swapStorage;

  const lpTokenContract = getContract(
    pool.lpToken.address,
    LPTOKEN_UNGUARDED_ABI,
    library,
    account ?? undefined
  ) as LpTokenUnguarded;
  const totalLpTokenBalance = yield call(lpTokenContract.totalSupply);

  let poolApr: number | null = null,
    extraapr: number | null = null;
  if (aprData) {
    poolApr = aprData[POOL.address]?.apr || 0;
  }

  const userLpTokenBalance =
    isRewardsPool && userPoolBalance
      ? userPoolBalance.userInfo.amount
      : yield call(lpTokenContract.balanceOf, account || ZERO_ADDRESS);

  const virtualPrice = totalLpTokenBalance.isZero()
    ? BigNumber.from(10).pow(18)
    : yield call(poolEffectiveContract.getVirtualPrice);

  // Pool token data
  const tokenBalances: BigNumber[] = yield call(getTokenBalances, {
    effectivePoolTokens,
    effectiveSwapContract: poolEffectiveContract,
  });
  const tokenBalancesSum: BigNumber = tokenBalances.reduce((sum, b) =>
    sum.add(b)
  );
  const tokenBalancesUSD = effectivePoolTokens.map((token, i, arr) => {
    // use another token to estimate USD price of meta LP tokens
    const symbol =
      isMetaSwap && i === arr.length - 1
        ? getTokenSymbolForPoolType(POOL.poolType)
        : token.symbol;
    const balance = tokenBalances[i];
    return balance
      .mul(parseUnits(String(tokenPricesUSD[symbol] || 0), 18))
      .div(BigNumber.from(10).pow(18));
  });
  const tokenBalancesUSDSum: BigNumber = tokenBalancesUSD.reduce((sum, b) =>
    sum.add(b)
  );
  const lpTokenPriceUSD = tokenBalancesSum.isZero()
    ? Zero
    : tokenBalancesUSDSum.mul(BigNumber.from(10).pow(18)).div(tokenBalancesSum);

  function calculatePctOfTotalShare(lpTokenAmount: BigNumber): BigNumber {
    const apr = aprData[POOL.address] || aprData[POOL.swapAddress || ""];
    const baseCalc =
      isRewardsPool && aprData && apr
        ? BigNumber.from(apr.totalStaked)
        : totalLpTokenBalance;

    // returns the % of total lpTokens
    return lpTokenAmount
      .mul(BigNumber.from(10).pow(18))
      .div(baseCalc.isZero() ? BigNumber.from("1") : baseCalc);
  }

  // lpToken balance in wallet as a % of total lpTokens, plus lpTokens staked elsewhere
  const userShare = calculatePctOfTotalShare(userLpTokenBalance);
  const userPoolTokenBalances = tokenBalances.map((balance) => {
    return userShare.mul(balance).div(BigNumber.from(10).pow(18));
  });
  const userPoolTokenBalancesSum: BigNumber = userPoolTokenBalances.reduce(
    (sum, b) => sum.add(b)
  );
  const userPoolTokenBalancesUSD = tokenBalancesUSD.map((balance) => {
    return userShare.mul(balance).div(BigNumber.from(10).pow(18));
  });
  const userPoolTokenBalancesUSDSum: BigNumber =
    userPoolTokenBalancesUSD.reduce((sum, b) => sum.add(b));

  const poolTokens = effectivePoolTokens.map((token, i) => ({
    symbol: token.symbol,
    percent: formatBNToPercentString(
      tokenBalances[i]
        .mul(10 ** 5)
        .div(
          totalLpTokenBalance.isZero() ? BigNumber.from("1") : tokenBalancesSum
        ),
      5
    ),
    value: tokenBalances[i],
  }));
  const userPoolTokens = effectivePoolTokens.map((token, i) => ({
    symbol: token.symbol,
    percent: formatBNToPercentString(
      tokenBalances[i]
        .mul(10 ** 5)
        .div(
          totalLpTokenBalance.isZero() ? BigNumber.from("1") : tokenBalancesSum
        ),
      5
    ),
    value: userPoolTokenBalances[i],
  }));
  const poolAddress = POOL.address;
  const { oneDayVolume, apr, utilization } =
    swapStats && poolAddress in swapStats
      ? swapStats[poolAddress]
      : { oneDayVolume: 0, apr: 0, utilization: undefined };
  const poolData = {
    name: poolKey,
    rapr: poolApr,
    tokens: poolTokens,
    reserve: tokenBalancesUSDSum,
    totalLocked: totalLpTokenBalance,
    virtualPrice: virtualPrice,
    adminFee: adminFee,
    swapFee: swapFee,
    volume: oneDayVolume,
    utilization: utilization ? parseUnits(utilization, 18) : undefined,
    apr: apr,
    extraapr: extraapr,
    lpTokenPriceUSD,
    lpToken: POOL.lpToken.symbol,
    isPaused,
  };
  const userShareData = account
    ? {
        name: poolKey,
        share: userShare,
        underlyingTokensAmount: userPoolTokenBalancesSum,
        usdBalance: userPoolTokenBalancesUSDSum,
        tokens: userPoolTokens,
        lpTokenBalance: userLpTokenBalance,
        poolBalance: userPoolBalance,
      }
    : undefined;
  return { poolData, userShareData };
}

const getTokenBalances = async ({
  effectivePoolTokens,
  effectiveSwapContract,
}: {
  effectivePoolTokens: Token[];
  effectiveSwapContract: Contract;
}) => {
  const balances = await Promise.all(
    effectivePoolTokens.map(async (token, i) => {
      const balance = await effectiveSwapContract.getTokenBalance(i);
      return BigNumber.from(10)
        .pow(18 - token.decimals) // cast all to 18 decimals
        .mul(balance);
    })
  );
  return balances;
};
