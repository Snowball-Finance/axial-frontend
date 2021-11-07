import { injected, walletconnect, walletlink } from "../connectors"

import { AbstractConnector } from "@web3-react/abstract-connector"
import { BigNumber } from "@ethersproject/bignumber"
import axialLogo from "../assets/icons/logo_icon.svg" // this needs a smaller icon logo(24)
import coinbasewalletIcon from "../assets/icons/coinbasewallet.svg"
import daiLogo from "../assets/icons/dai.svg"
import fraxLogo from "../assets/icons/frax.svg"
import metamaskIcon from "../assets/icons/metamask.svg"
import tusdLogo from "../assets/icons/tusd.svg"
import usdcLogo from "../assets/icons/usdc.svg"
import usdtLogo from "../assets/icons/usdt.svg"
import walletconnectIcon from "../assets/icons/walletconnect.svg"

export const NetworkContextName = "NETWORK"
export const AXIAL_A4D_POOL_NAME = "A4D Stablecoins"
export type PoolName = typeof AXIAL_A4D_POOL_NAME

export enum ChainId {
  MAINNET = 43114,
  HARDHAT = 43114,
}
export enum PoolTypes {
  BTC,
  ETH,
  USD,
  OTHER,
}

export class Token {
  readonly addresses: { [chainId in ChainId]: string }
  readonly decimals: number
  readonly symbol: string
  readonly name: string
  readonly icon: string
  readonly geckoId: string
  readonly masterchefId: number
  readonly isSynthetic: boolean
  readonly isLPToken: boolean

  constructor(
    addresses: { [chainId in ChainId]: string },
    decimals: number,
    symbol: string,
    geckoId: string,
    name: string,
    icon: string,
    isSynthetic = false,
    isLPToken = false,
    masterchefId = 0,
  ) {
    this.addresses = addresses
    this.decimals = decimals
    this.symbol = symbol
    this.geckoId = geckoId
    this.name = name
    this.icon = icon
    this.isSynthetic = isSynthetic
    this.isLPToken = isLPToken
    this.masterchefId = masterchefId
  }
}

export const BLOCK_TIME = 500 // ms

export const AXIAL_A4D_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
  [ChainId.HARDHAT]: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
}

export const MERKLETREE_DATA: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "mainnetTestAccounts.json",
  [ChainId.HARDHAT]: "hardhat.json",
}

export const AXIAL_A4D_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0x3A7387f8BA3ebFFa4A0ECcB1733e940CE2275D3f",
  [ChainId.HARDHAT]: "0x3A7387f8BA3ebFFa4A0ECcB1733e940CE2275D3f",
}

export const AXIAL_MASTERCHEF_CONTRACT_ADDRESS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0x958C0d0baA8F220846d3966742D4Fb5edc5493D3",
  [ChainId.HARDHAT]: "0x958C0d0baA8F220846d3966742D4Fb5edc5493D3",
}

export const AXIAL_TOKEN_ADDRESS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0xcF8419A615c57511807236751c0AF38Db4ba3351",
  [ChainId.HARDHAT]: "0xcF8419A615c57511807236751c0AF38Db4ba3351",
}

export const AXIAL_LP_ADDRESS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: "0xf0d7EC33147Ec3bEfd24B880472307bF3a01BB8A",
  [ChainId.HARDHAT]: "0xf0d7EC33147Ec3bEfd24B880472307bF3a01BB8A",
}

export const AXIAL_A4D_SWAP_TOKEN = new Token(
  AXIAL_A4D_SWAP_TOKEN_CONTRACT_ADDRESSES,
  18,
  "a4dUSD",
  "a4dusd",
  "A4D DAI.e/USDC.e/USDT.e/TUSD",
  axialLogo,
  false,
  true,
  0,
)

// Stablecoins

const DAI_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
  [ChainId.HARDHAT]: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
}

export const DAI = new Token(
  DAI_CONTRACT_ADDRESSES,
  18,
  "DAI.e",
  "dai",
  "Dai",
  daiLogo,
  false,
  false,
)

const FRAX_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98",
  [ChainId.HARDHAT]: "0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98",
}
export const FRAX = new Token(
  FRAX_CONTRACT_ADDRESSES,
  18,
  "FRAX",
  "frax",
  "Frax",
  fraxLogo,
  false,
  false,
)

const TUSD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
  [ChainId.HARDHAT]: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
}
export const TUSD = new Token(
  TUSD_CONTRACT_ADDRESSES,
  18,
  "TUSD",
  "true-usd",
  "TUSD Coin",
  tusdLogo,
  false,
  false,
)

const USDT_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
  [ChainId.HARDHAT]: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
}
export const USDT = new Token(
  USDT_CONTRACT_ADDRESSES,
  6,
  "USDT.e",
  "tether",
  "Tether",
  usdtLogo,
  false,
  false,
)

const USDC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
  [ChainId.HARDHAT]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
}
export const USDC = new Token(
  USDC_CONTRACT_ADDRESSES,
  6,
  "USDC.e",
  "usd-coin",
  "USDC",
  usdcLogo,
  false,
  false,
)

export const AXIAL_A4D_POOL_TOKENS = [TUSD, USDC, DAI, USDT]

export type Pool = {
  name: PoolName
  lpToken: Token
  poolTokens: Token[]
  isSynthetic: boolean
  addresses: { [chainId in ChainId]: string }
  type: PoolTypes
  route: string
  migration?: PoolName
  metaSwapAddresses?: { [chainId in ChainId]: string }
  underlyingPoolTokens?: Token[]
  underlyingPool?: PoolName
  isOutdated?: boolean // pool can be outdated but not have a migration target
}
export type PoolsMap = {
  [poolName: string]: Pool
}
export const POOLS_MAP: PoolsMap = {
  [AXIAL_A4D_POOL_NAME]: {
    name: AXIAL_A4D_POOL_NAME,
    addresses: AXIAL_A4D_SWAP_ADDRESSES,
    lpToken: AXIAL_A4D_SWAP_TOKEN,
    poolTokens: AXIAL_A4D_POOL_TOKENS,
    isSynthetic: false,
    type: PoolTypes.USD,
    route: "a4d",
  },
}

// maps a symbol string to a token object
export type TokensMap = {
  [symbol: string]: Token
}

export const TOKENS_MAP = Object.keys(POOLS_MAP).reduce((acc, poolName) => {
  const pool = POOLS_MAP[poolName as PoolName]
  const newAcc = { ...acc }
  pool.poolTokens.forEach((token) => {
    newAcc[token.symbol] = token
  })
  newAcc[pool.lpToken.symbol] = pool.lpToken
  return newAcc
}, {} as TokensMap)

export type TokenToPoolsMap = {
  [tokenSymbol: string]: string[]
}
export const TOKEN_TO_POOLS_MAP = Object.keys(POOLS_MAP).reduce(
  (acc, poolName) => {
    const pool = POOLS_MAP[poolName as PoolName]
    const newAcc = { ...acc }
    pool.poolTokens.forEach((token) => {
      newAcc[token.symbol] = (newAcc[token.symbol] || []).concat(
        poolName as PoolName,
      )
    })
    return newAcc
  },
  {} as TokenToPoolsMap,
)

export type LPTokenToPoolsMap = {
  [tokenSymbol: string]: PoolName
}
export const LPTOKEN_TO_POOL_MAP = Object.keys(POOLS_MAP).reduce(
  (acc, poolName) => {
    const pool = POOLS_MAP[poolName as PoolName]
    const newAcc = { ...acc }
    newAcc[pool.lpToken.symbol] = poolName as PoolName
    return newAcc
  },
  {} as LPTokenToPoolsMap,
)

export const TRANSACTION_TYPES = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
  SWAP: "SWAP",
  MIGRATE: "MIGRATE",
}

export const POOL_FEE_PRECISION = 10

export enum SWAP_TYPES {
  DIRECT = "swapDirect", // route length 2
  SYNTH_TO_SYNTH = "swapSynthToSynth", // route length 2
  SYNTH_TO_TOKEN = "swapSynthToToken", // route length 3
  TOKEN_TO_SYNTH = "swapTokenToSynth", // route length 3
  TOKEN_TO_TOKEN = "swapTokenToToken", // route length 4
  INVALID = "invalid",
}

export function getIsVirtualSwap(swapType: SWAP_TYPES): boolean {
  return (
    swapType === SWAP_TYPES.SYNTH_TO_SYNTH ||
    swapType === SWAP_TYPES.SYNTH_TO_TOKEN ||
    swapType === SWAP_TYPES.TOKEN_TO_SYNTH ||
    swapType === SWAP_TYPES.TOKEN_TO_TOKEN
  )
}

export const SWAP_CONTRACT_GAS_ESTIMATES_MAP = {
  [SWAP_TYPES.INVALID]: BigNumber.from("999999999"), // 999,999,999
  [SWAP_TYPES.DIRECT]: BigNumber.from("200000"), // 157,807
  [SWAP_TYPES.TOKEN_TO_TOKEN]: BigNumber.from("2000000"), // 1,676,837
  [SWAP_TYPES.TOKEN_TO_SYNTH]: BigNumber.from("2000000"), // 1,655,502
  [SWAP_TYPES.SYNTH_TO_TOKEN]: BigNumber.from("1500000"), // 1,153,654
  [SWAP_TYPES.SYNTH_TO_SYNTH]: BigNumber.from("700000"), // 681,128 //
  addLiquidity: BigNumber.from("400000"), // 386,555
  removeLiquidityImbalance: BigNumber.from("350000"), // 318,231
  removeLiquidityOneToken: BigNumber.from("250000"), // 232,947
  migrate: BigNumber.from("650000"), // 619,126
  virtualSwapSettleOrWithdraw: BigNumber.from("400000"),
}

export interface WalletInfo {
  name: string
  icon: string
  connector: AbstractConnector
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    name: "MetaMask",
    icon: metamaskIcon,
    connector: injected,
  },
  WALLET_CONNECT: {
    name: "WalletConnect",
    icon: walletconnectIcon,
    connector: walletconnect,
  },
  WALLET_LINK: {
    name: "Coinbase Wallet",
    icon: coinbasewalletIcon,
    connector: walletlink,
  },
}

// "axial" in bytes32 form
export const SYNTH_TRACKING_ID =
  "0x534144444c450000000000000000000000000000000000000000000000000000"

// FLAGS
export const IS_VIRTUAL_SWAP_ACTIVE = false
// FLAGS END
