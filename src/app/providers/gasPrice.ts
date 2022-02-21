import { rpcUrl } from "app/containers/BlockChain/utils/wallet/connectors";
import { ethers } from "ethers";

export interface GenericGasResponse {
  gasStandard: number;
  gasFast: number;
  gasInstant: number;
}

export const gasPriceAPI = async (): Promise<GenericGasResponse> => {
  try {
    const provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const gasPrice = Math.floor(
      (await provider.getGasPrice()).toNumber() / 1e9
    );
    const response: GenericGasResponse = {
      gasStandard: gasPrice,
      gasFast: gasPrice,
      gasInstant: gasPrice,
    };

    return response;
  } catch (error) {
    throw new Error(`Unable to fetch gas price`);
  }
};
