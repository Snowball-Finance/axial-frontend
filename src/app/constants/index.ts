export const e = 1;
// import axialLogo from "assets/icons/logo_icon.svg"; // this needs a smaller icon logo(24)
// import daiLogo from "assets/icons/dai.svg";
// import fraxLogo from "assets/icons/frax.svg";
// import tsdLogo from "assets/icons/tsd.svg";
// import mimLogo from "assets/icons/mim.svg";
// import tusdLogo from "assets/icons/tusd.svg";
// import usdcLogo from "assets/icons/usdc.svg";
// import usdtLogo from "assets/icons/usdt.svg";
// import avaiLogo from "assets/icons/avai.svg";

// export const AXIAL_AS4D_POOL_NAME = "AS4D Stablecoins";
// export const AXIAL_AC4D_POOL_NAME = "AC4D Stablecoins";
// export const AXIAL_AM3D_POOL_NAME = "AM3D Stablecoins";
// export const AXIAL_AA3D_POOL_NAME = "AA3D Stablecoins";
// export const AXIAL_JLP_POOL_NAME = "JLP AVAX-AXIAL";
// export const USDC_AM3D_POOL_NAME = "USDC-AM3D Metapool";

// export type PoolName =
//   | typeof AXIAL_AS4D_POOL_NAME
//   | typeof AXIAL_AC4D_POOL_NAME
//   | typeof AXIAL_JLP_POOL_NAME
//   | typeof AXIAL_AM3D_POOL_NAME
//   | typeof AXIAL_AA3D_POOL_NAME
//   | typeof USDC_AM3D_POOL_NAME;

// export enum ChainId {
//   MAINNET = 43114,
//   HARDHAT = 43114,
// }

// export enum PoolTypes {
//   BTC,
//   ETH,
//   USD,
//   LP,
//   OTHER,
// }

// export const USDC_AM3D_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x26694e4047eA77cC96341f0aC491773aC5469d72",
//   [ChainId.HARDHAT]: "0x26694e4047eA77cC96341f0aC491773aC5469d72",
// };

// export const USDC_AM3D_SWAP_DEPOSIT_ADDRESSES: {
//   [chainId in ChainId]: string;
// } = {
//   [ChainId.MAINNET]: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
//   [ChainId.HARDHAT]: "0xba5f105A3E3D7C0eAa36AAa1e3BE11D77F1A6162",
// };

// export const USDC_AM3D_SWAP_TOKEN_CONTRACT_ADDRESSES: {
//   [chainId in ChainId]: string;
// } = {
//   [ChainId.MAINNET]: "0xA57E0D32Aa27D3b1D5AFf6a8A786C6A4DADb818F",
//   [ChainId.HARDHAT]: "0xA57E0D32Aa27D3b1D5AFf6a8A786C6A4DADb818F",
// };

// export const AXIAL_AS4D_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
//   [ChainId.HARDHAT]: "0x2a716c4933A20Cd8B9f9D9C39Ae7196A85c24228",
// };

// export const AXIAL_AM3D_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
//   [ChainId.HARDHAT]: "0x90c7b96AD2142166D001B27b5fbc128494CDfBc8",
// };

// export const AXIAL_AA3D_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x6EfbC734D91b229BE29137cf9fE531C1D3bf4Da6",
//   [ChainId.HARDHAT]: "0x6EfbC734D91b229BE29137cf9fE531C1D3bf4Da6",
// };

// export const AXIAL_AC4D_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
//   [ChainId.HARDHAT]: "0x8c3c1C6F971C01481150CA7942bD2bbB9Bc27bC7",
// };

// export const MERKLETREE_DATA: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "mainnetTestAccounts.json",
//   [ChainId.HARDHAT]: "hardhat.json",
// };

// export const AXIAL_AS4D_SWAP_TOKEN_CONTRACT_ADDRESSES: {
//   [chainId in ChainId]: string;
// } = {
//   [ChainId.MAINNET]: "0x3A7387f8BA3ebFFa4A0ECcB1733e940CE2275D3f",
//   [ChainId.HARDHAT]: "0x3A7387f8BA3ebFFa4A0ECcB1733e940CE2275D3f",
// };

// export const AXIAL_AM3D_SWAP_TOKEN_CONTRACT_ADDRESSES: {
//   [chainId in ChainId]: string;
// } = {
//   [ChainId.MAINNET]: "0xc161E4B11FaF62584EFCD2100cCB461A2DdE64D1",
//   [ChainId.HARDHAT]: "0xc161E4B11FaF62584EFCD2100cCB461A2DdE64D1",
// };

// export const AXIAL_AA3D_SWAP_TOKEN_CONTRACT_ADDRESSES: {
//   [chainId in ChainId]: string;
// } = {
//   [ChainId.MAINNET]: "0xaD556e7dc377d9089C6564f9E8d275f5EE4da22d",
//   [ChainId.HARDHAT]: "0xaD556e7dc377d9089C6564f9E8d275f5EE4da22d",
// };

// export const AXIAL_AC4D_SWAP_TOKEN_CONTRACT_ADDRESSES: {
//   [chainId in ChainId]: string;
// } = {
//   [ChainId.MAINNET]: "0x4da067E13974A4d32D342d86fBBbE4fb0f95f382",
//   [ChainId.HARDHAT]: "0x4da067E13974A4d32D342d86fBBbE4fb0f95f382",
// };

// export const AXIAL_MASTERCHEF_CONTRACT_ADDRESS: {
//   [chainId in ChainId]: string;
// } = {
//   [ChainId.MAINNET]: "0x958C0d0baA8F220846d3966742D4Fb5edc5493D3",
//   [ChainId.HARDHAT]: "0x958C0d0baA8F220846d3966742D4Fb5edc5493D3",
// };

// export const AXIAL_TOKEN_ADDRESS: {
//   [chainId in ChainId]: string;
// } = {
//   [ChainId.MAINNET]: "0xcF8419A615c57511807236751c0AF38Db4ba3351",
//   [ChainId.HARDHAT]: "0xcF8419A615c57511807236751c0AF38Db4ba3351",
// };

// export const AXIAL_JLP_ADDRESS: {
//   [chainId in ChainId]: string;
// } = {
//   [ChainId.MAINNET]: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
//   [ChainId.HARDHAT]: "0x5305A6c4DA88391F4A9045bF2ED57F4BF0cF4f62",
// };

// export class Token {
//   readonly addresses: { [chainId in ChainId]: string };
//   readonly decimals: number;
//   readonly symbol: string;
//   readonly name: string;
//   readonly icon: string;
//   readonly geckoId: string;
//   readonly masterchefId: number;
//   readonly isSynthetic: boolean;
//   readonly isLPToken: boolean;

//   constructor(
//     addresses: { [chainId in ChainId]: string },
//     decimals: number,
//     symbol: string,
//     geckoId: string,
//     name: string,
//     icon: string,
//     isSynthetic = false,
//     isLPToken = false,
//     masterchefId = 0
//   ) {
//     this.addresses = addresses;
//     this.decimals = decimals;
//     this.symbol = symbol;
//     this.geckoId = geckoId;
//     this.name = name;
//     this.icon = icon;
//     this.isSynthetic = isSynthetic;
//     this.isLPToken = isLPToken;
//     this.masterchefId = masterchefId;
//   }
// }

// export type Pool = {
//   name: PoolName;
//   lpToken: Token;
//   poolTokens: Token[];
//   isSynthetic: boolean;
//   addresses: { [chainId in ChainId]: string };
//   type: PoolTypes;
//   route: string;
//   migration?: PoolName;
//   metaSwapAddresses?: { [chainId in ChainId]: string };
//   swapRouterAddresses?: { [chainId in ChainId]: string };
//   underlyingPoolTokens?: Token[];
//   underlyingPool?: PoolName;
//   isOutdated?: boolean; // pool can be outdated but not have a migration target
// };

// export type PoolsMap = {
//   [poolName: string]: Pool;
// };

// export const AXIAL_AS4D_SWAP_TOKEN = new Token(
//   AXIAL_AS4D_SWAP_TOKEN_CONTRACT_ADDRESSES,
//   18,
//   "as4dUSD",
//   "as4dusd",
//   "AS4D DAI.e/USDC.e/USDT.e/TUSD",
//   axialLogo,
//   false,
//   true,
//   0
// );

// export const AXIAL_AC4D_SWAP_TOKEN = new Token(
//   AXIAL_AC4D_SWAP_TOKEN_CONTRACT_ADDRESSES,
//   18,
//   "ac4dUSD",
//   "ac4dusd",
//   "AC4D TSD/MIM/FRAX/DAI.e",
//   axialLogo,
//   false,
//   true,
//   1
// );

// export const AXIAL_AM3D_SWAP_TOKEN = new Token(
//   AXIAL_AM3D_SWAP_TOKEN_CONTRACT_ADDRESSES,
//   18,
//   "am3dUSD",
//   "am3dusd",
//   "AM3D MIM/USDC.e/DAI.e",
//   axialLogo,
//   false,
//   true,
//   3
// );

// export const AXIAL_AA3D_SWAP_TOKEN = new Token(
//   AXIAL_AA3D_SWAP_TOKEN_CONTRACT_ADDRESSES,
//   18,
//   "aa3dUSD",
//   "aa3dusd",
//   "AA3D AVAI/MIM/USDC.e",
//   axialLogo,
//   false,
//   true,
//   4
// );

// export const USDC_AM3D_SWAP_TOKEN = new Token(
//   USDC_AM3D_SWAP_TOKEN_CONTRACT_ADDRESSES,
//   18,
//   "usdcAM3DUSD",
//   "usdcam3dusd",
//   "Axial USDC/AM3D",
//   axialLogo,
//   false,
//   true,
//   5
// );

// export const AXIAL_JLP_POOL_TOKEN = new Token(
//   AXIAL_JLP_ADDRESS,
//   18,
//   "JLP",
//   "jlpavaxaxial",
//   "JLP AVAX-AXIAL",
//   axialLogo,
//   false,
//   true,
//   2
// );

// const TUSD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
//   [ChainId.HARDHAT]: "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB",
// };

// export const TUSD = new Token(
//   TUSD_CONTRACT_ADDRESSES,
//   18,
//   "TUSD",
//   "true-usd",
//   "TUSD Coin",
//   tusdLogo,
//   false,
//   false
// );

// const USDCe_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
//   [ChainId.HARDHAT]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
// };

// export const USDCe = new Token(
//   USDCe_CONTRACT_ADDRESSES,
//   6,
//   "USDC.e",
//   "usd-coin",
//   "USDC.e",
//   usdcLogo,
//   false,
//   false
// );

// const DAI_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
//   [ChainId.HARDHAT]: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
// };

// export const DAI = new Token(
//   DAI_CONTRACT_ADDRESSES,
//   18,
//   "DAI.e",
//   "dai",
//   "Dai",
//   daiLogo,
//   false,
//   false
// );

// const USDT_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
//   [ChainId.HARDHAT]: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
// };
// export const USDT = new Token(
//   USDT_CONTRACT_ADDRESSES,
//   6,
//   "USDT.e",
//   "tether",
//   "Tether",
//   usdtLogo,
//   false,
//   false
// );

// const TSD_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x4fbf0429599460D327BD5F55625E30E4fC066095",
//   [ChainId.HARDHAT]: "0x4fbf0429599460D327BD5F55625E30E4fC066095",
// };
// export const TSD = new Token(
//   TSD_CONTRACT_ADDRESSES,
//   18,
//   "TSD",
//   "teddy-dollar",
//   "Teddy Dollar",
//   tsdLogo,
//   false,
//   false
// );

// const MIM_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x130966628846BFd36ff31a822705796e8cb8C18D",
//   [ChainId.HARDHAT]: "0x130966628846BFd36ff31a822705796e8cb8C18D",
// };
// export const MIM = new Token(
//   MIM_CONTRACT_ADDRESSES,
//   18,
//   "MIM",
//   "magic-internet-money",
//   "Magic Internet Money",
//   mimLogo,
//   false,
//   false
// );

// const USDC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
//   [ChainId.HARDHAT]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
// };
// export const USDC = new Token(
//   USDC_CONTRACT_ADDRESSES,
//   6,
//   "USDC",
//   "usd-coin",
//   "Native USDC",
//   usdcLogo,
//   false,
//   false
// );
// const FRAX_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
//   [ChainId.HARDHAT]: "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64",
// };
// export const FRAX = new Token(
//   FRAX_CONTRACT_ADDRESSES,
//   18,
//   "FRAX",
//   "frax",
//   "Frax",
//   fraxLogo,
//   false,
//   false
// );

// const AVAI_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x346A59146b9b4a77100D369a3d18E8007A9F46a6",
//   [ChainId.HARDHAT]: "0x346A59146b9b4a77100D369a3d18E8007A9F46a6",
// };

// export const AVAI = new Token(
//   AVAI_CONTRACT_ADDRESSES,
//   18,
//   "AVAI",
//   "orca-avai",
//   "Orca AVAI",
//   avaiLogo,
//   false,
//   false
// );

// export const AXIAL_AS4D_POOL_TOKENS = [TUSD, USDCe, DAI, USDT];
// export const AXIAL_AC4D_POOL_TOKENS = [TSD, MIM, FRAX, DAI];
// export const AXIAL_AM3D_POOL_TOKENS = [MIM, USDCe, DAI];
// export const AXIAL_AA3D_POOL_TOKENS = [AVAI, MIM, USDCe];
// export const USDC_AM3D_POOL_TOKENS = [USDC, ...AXIAL_AM3D_POOL_TOKENS];
// export const USDC_AM3D_UNDERLYING_POOL_TOKENS = [USDC, AXIAL_AM3D_SWAP_TOKEN];

// export const POOLS_MAP: PoolsMap = {
//   [AXIAL_AS4D_POOL_NAME]: {
//     name: AXIAL_AS4D_POOL_NAME,
//     addresses: AXIAL_AS4D_SWAP_ADDRESSES,
//     lpToken: AXIAL_AS4D_SWAP_TOKEN,
//     poolTokens: AXIAL_AS4D_POOL_TOKENS,
//     isSynthetic: false,
//     type: PoolTypes.USD,
//     route: "as4d",
//   },
//   [AXIAL_AC4D_POOL_NAME]: {
//     name: AXIAL_AC4D_POOL_NAME,
//     addresses: AXIAL_AC4D_SWAP_ADDRESSES,
//     lpToken: AXIAL_AC4D_SWAP_TOKEN,
//     poolTokens: AXIAL_AC4D_POOL_TOKENS,
//     isSynthetic: false,
//     type: PoolTypes.USD,
//     route: "ac4d",
//   },
//   [AXIAL_JLP_POOL_NAME]: {
//     name: AXIAL_JLP_POOL_NAME,
//     addresses: AXIAL_JLP_ADDRESS,
//     lpToken: AXIAL_JLP_POOL_TOKEN,
//     poolTokens: [],
//     isSynthetic: false,
//     type: PoolTypes.LP,
//     route: "jlp",
//   },
//   [AXIAL_AM3D_POOL_NAME]: {
//     name: AXIAL_AM3D_POOL_NAME,
//     addresses: AXIAL_AM3D_SWAP_ADDRESSES,
//     lpToken: AXIAL_AM3D_SWAP_TOKEN,
//     poolTokens: AXIAL_AM3D_POOL_TOKENS,
//     isSynthetic: false,
//     type: PoolTypes.USD,
//     route: "am3d",
//   },
//   [AXIAL_AA3D_POOL_NAME]: {
//     name: AXIAL_AA3D_POOL_NAME,
//     addresses: AXIAL_AA3D_SWAP_ADDRESSES,
//     lpToken: AXIAL_AA3D_SWAP_TOKEN,
//     poolTokens: AXIAL_AA3D_POOL_TOKENS,
//     isSynthetic: false,
//     type: PoolTypes.USD,
//     route: "aa3d",
//   },
//   [USDC_AM3D_POOL_NAME]: {
//     name: USDC_AM3D_POOL_NAME,
//     lpToken: USDC_AM3D_SWAP_TOKEN,
//     poolTokens: USDC_AM3D_POOL_TOKENS,
//     addresses: USDC_AM3D_SWAP_DEPOSIT_ADDRESSES,
//     isSynthetic: false,
//     type: PoolTypes.USD,
//     metaSwapAddresses: USDC_AM3D_SWAP_ADDRESSES,
//     underlyingPoolTokens: USDC_AM3D_UNDERLYING_POOL_TOKENS,
//     underlyingPool: AXIAL_AM3D_POOL_NAME,
//     route: "usdc",
//   },
// };

// const TEDDY_CONTRACT_ADDRESS: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x094bd7B2D99711A1486FB94d4395801C6d0fdDcC",
//   [ChainId.HARDHAT]: "0x094bd7B2D99711A1486FB94d4395801C6d0fdDcC",
// };
// export const TEDDY = new Token(
//   TEDDY_CONTRACT_ADDRESS,
//   18,
//   "TEDDY",
//   "teddy",
//   "Teddy",
//   axialLogo,
//   false,
//   false
// );

// const FXS_CONTRACT_ADDRESS: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x214DB107654fF987AD859F34125307783fC8e387",
//   [ChainId.HARDHAT]: "0x214DB107654fF987AD859F34125307783fC8e387",
// };
// export const FXS = new Token(
//   FXS_CONTRACT_ADDRESS,
//   18,
//   "FXS",
//   "frax-share",
//   "Frax Share",
//   axialLogo,
//   false,
//   false
// );

// const WAVAX_CONTRACT_ADDRESS: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
//   [ChainId.HARDHAT]: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
// };
// export const WAVAX = new Token(
//   WAVAX_CONTRACT_ADDRESS,
//   18,
//   "AVAX",
//   "avalanche-2",
//   "Wrapped AVAX",
//   axialLogo,
//   false,
//   false
// );

// const ORCA_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
//   [ChainId.MAINNET]: "0x8B1d98A91F853218ddbb066F20b8c63E782e2430",
//   [ChainId.HARDHAT]: "0x8B1d98A91F853218ddbb066F20b8c63E782e2430",
// };

// export const ORCA = new Token(
//   ORCA_CONTRACT_ADDRESSES,
//   18,
//   "ORCA",
//   "orcadao",
//   "Orca DAO",
//   axialLogo,
//   false,
//   false
// );

// export const extraRewardTokens = [TEDDY, FXS, WAVAX, ORCA];

// export const TRANSACTION_TYPES = {
//   DEPOSIT: "DEPOSIT",
//   WITHDRAW: "WITHDRAW",
//   SWAP: "SWAP",
//   MIGRATE: "MIGRATE",
// };

// export function isMetaPool(poolName = ""): boolean {
//   return new Set([USDC_AM3D_POOL_NAME]).has(poolName);
// }

// export const BaseUrl = `https://base.snowball.io`;

// // maps a symbol string to a token object
// export type TokensMap = {
//   [symbol: string]: Token;
// };

// export const TOKENS_MAP = Object.keys(POOLS_MAP).reduce((acc, poolName) => {
//   const pool = POOLS_MAP[poolName as PoolName];
//   const newAcc = { ...acc };
//   pool.poolTokens.forEach((token) => {
//     newAcc[token.symbol] = token;
//   });
//   newAcc[pool.lpToken.symbol] = pool.lpToken;
//   return newAcc;
// }, {} as TokensMap);
