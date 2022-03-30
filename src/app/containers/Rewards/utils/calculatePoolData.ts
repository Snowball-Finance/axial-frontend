import {
  formatBNToPercentString,
  getContract,
  getProviderOrSigner,
  getTokenSymbolForPoolType,
} from "app/containers/utils/contractUtils";
import { pools } from "app/pools";
import { Pool, PoolTypes, RewardsState } from "../types";
import LPTOKEN_UNGUARDED_ABI from "abi/lpTokenUnguarded.json";
import { LpTokenUnguarded } from "abi/ethers-contracts/LpTokenUnguarded";
import {
  AXIAL_MASTERCHEF_CONTRACT_ADDRESS,
  Zero,
  ZERO_ADDRESS,
} from "../constants";

import { BigNumber, Contract, ethers } from "ethers";
import { extraRewardTokens } from "app/tokens";
import { parseUnits } from "ethers/lib/utils";
import { GlobalState } from "store/slice";

interface Props {
  pool: Pool;
  tokenPricesUSD: GlobalState["tokenPricesUSD"];
  library: any;
  chainId: number;
  useMasterchef?: boolean;
  masterchefApr?: RewardsState["masterchefApr"];
  masterchefBalances?: RewardsState["masterChefBalances"];
  account: string;
  swapStats?: RewardsState["swapStats"];
}
export const calculatePoolData = async (props: Props) => {
  const {
    pool,
    tokenPricesUSD,
    library,
    masterchefApr,
    masterchefBalances,
    account,
    useMasterchef,
    swapStats,
  } = props;
  const swapContract = new Contract(
    pool.swapAddress || pool.address,
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

      let masterchefPool;
      if (masterchefApr && masterchefBalances) {
        masterchefPool = masterchefApr[POOL.address];
      } else {
        return;
      }

      const lpTokenContract = getContract(
        POOL.lpToken.address,
        LPTOKEN_UNGUARDED_ABI,
        library,
        account ?? undefined
      ) as LpTokenUnguarded;
      const [totalLpTokenBalance] = await Promise.all([
        lpTokenContract.balanceOf(AXIAL_MASTERCHEF_CONTRACT_ADDRESS),
      ]);
      const poolApr = masterchefPool.apr ?? 0;

      let DEXLockedBN = BigNumber.from(0);

      if (masterchefPool.tokenPoolPrice > 0 && totalLpTokenBalance.gt("0x0")) {
        const totalLocked =
          masterchefPool.tokenPoolPrice * (+totalLpTokenBalance / 1e18);
        DEXLockedBN = BigNumber.from(totalLocked.toFixed(0)).mul(
          BigNumber.from(10).pow(18)
        );
      }

      let tokenPoolPriceBN = BigNumber.from(0);
      try {
        tokenPoolPriceBN = ethers.utils.parseUnits(
          masterchefPool.tokenPoolPrice.toFixed(2)
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

      const userMasterchefBalances = masterchefBalances[POOL.lpToken.symbol];
      if (!userMasterchefBalances) {
        return { poolData, userShareData: undefined };
      }

      const userLpTokenBalance = userMasterchefBalances.userInfo.amount;

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
            masterchefBalance: userMasterchefBalances,
          }
        : null;

      return { poolData, userShareData };
    } else {
      return;
    }
  }
  //@ts-ignore ignored because we will always have pool
  const userMasterchefBalances = masterchefBalances
    ? masterchefBalances[POOL.lpToken.symbol]
    : null;
  const effectivePoolTokens = POOL.underlyingPoolTokens || POOL.poolTokens;
  const isMetaSwap = POOL.swapAddress != null;

  const effectiveSwapContract = swapContract;

  // Swap fees, price, and LP Token data
  const [aParameter, isPaused, swapStorage] = await Promise.all([
    effectiveSwapContract.getA(),
    effectiveSwapContract.paused(),
    effectiveSwapContract?.swapStorage(),
  ]);

  const { adminFee, lpToken: lpTokenAddress, swapFee } = swapStorage;
  const lpTokenContract = getContract(
    lpTokenAddress,
    LPTOKEN_UNGUARDED_ABI,
    library,
    account ?? undefined
  ) as LpTokenUnguarded;
  const totalLpTokenBalance = await lpTokenContract.totalSupply();

  let poolApr: number | null = null,
    extraapr: number | null = null,
    extraUSDPerWeek = 0;
  if (masterchefApr) {
    poolApr = masterchefApr[POOL.address].apr ?? 0;

    //set extra APR
    if (masterchefApr[POOL.address].extraTokens.length > 0) {
      const TVL = +totalLpTokenBalance / 10 ** 18;
      for (const token of masterchefApr[POOL.address].extraTokens) {
        const extraReward = extraRewardTokens.find(
          (o) => o.address.toLowerCase() === token.address.toLowerCase()
        );
        if (extraReward) {
          const tokenPrice = tokenPricesUSD[extraReward.symbol];

          const tokensPerSec = ethers.BigNumber.from(token.tokenPerSec);
          extraUSDPerWeek +=
            (+tokensPerSec / 10 ** extraReward.decimals) * tokenPrice * 604_800;
        } else {
          console.error(`Not found mapping for token: ${token.address}`);
        }
      }
      if (extraUSDPerWeek > 0 && TVL > 0) {
        extraapr = ((extraUSDPerWeek * 52) / TVL) * 100;
      }
    }
  }

  //      lpTokenContract.add(masterchef)
  const userLpTokenBalance =
    useMasterchef && userMasterchefBalances
      ? userMasterchefBalances.userInfo.amount
      : await lpTokenContract.balanceOf(account || ZERO_ADDRESS);

  const virtualPrice = totalLpTokenBalance.isZero()
    ? BigNumber.from(10).pow(18)
    : await effectiveSwapContract.getVirtualPrice();

  // Pool token data
  const tokenBalances: BigNumber[] = await Promise.all(
    effectivePoolTokens.map(async (token, i) => {
      const balance = await effectiveSwapContract.getTokenBalance(i);
      return BigNumber.from(10)
        .pow(18 - token.decimals) // cast all to 18 decimals
        .mul(balance);
    })
  );
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
    const baseCalc =
      useMasterchef && masterchefApr
        ? BigNumber.from(masterchefApr[POOL.address].totalStaked)
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
    aParameter: aParameter,
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
        masterchefBalance: userMasterchefBalances,
      }
    : undefined;
  return { poolData, userShareData };
};
