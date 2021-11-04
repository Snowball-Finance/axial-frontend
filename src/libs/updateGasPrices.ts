import { AppDispatch } from "../store"
import { ethers } from "ethers"
import retry from "async-retry"
import { updateGasPrices } from "../store/application"

interface GenericGasReponse {
  gasStandard: number
  gasFast: number
  gasInstant: number
}

const fetchGasFromChain = async (): Promise<GenericGasReponse> => {
  try {
    const provider = new ethers.providers.StaticJsonRpcProvider(
      process.env.REACT_APP_NETWORK_URL,
    )
    const gasPrice = Math.floor((await provider.getGasPrice()).toNumber() / 1e9)

    const response: GenericGasReponse = {
      gasStandard: gasPrice,
      gasFast: gasPrice,
      gasInstant: gasPrice,
    }

    return response
  } catch (error) {
    throw new Error(`Unable to fetch gas price`)
  }
}

export default async function fetchGasPrices(
  dispatch: AppDispatch,
): Promise<void> {
  const dispatchUpdate = (gasPrices: GenericGasReponse) => {
    dispatch(updateGasPrices(gasPrices))
  }
  await retry(
    () =>
      fetchGasFromChain()
        .then(dispatchUpdate)
        .catch(() => fetchGasFromChain().then(dispatchUpdate)),
    {
      retries: 3,
    },
  )
}
