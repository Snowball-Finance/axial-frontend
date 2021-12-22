import { CONTRACTS } from "config";

export const requestToAddSnobToMetamask = () => {

  const provider = window.ethereum

  if (provider) {
    return provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: CONTRACTS.SNOWBALL,
          symbol: 'SNOB',
          decimals: '18',
          image: 'https://raw.githubusercontent.com/Snowball-Finance/Assets/main/snowball-128x128.png',
        },
      },
    })
  }
  return Promise.reject(new Error('Metamask not found'))


};
