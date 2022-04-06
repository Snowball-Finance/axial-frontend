import { Erc20 } from "abi/ethers-contracts";
import { GlobalDomains } from "app/appSelectors";
import { Web3Domains } from "app/containers/BlockChain/Web3/selectors";
import { Token, TokenSymbols } from "app/containers/Swap/types";
import checkAndApproveTokenForTrade from "app/containers/utils/checkAndApproveTokenForTrade";
import { getProviderOrSigner } from "app/containers/utils/contractUtils";
import { BigNumber, Contract } from "ethers";
import { call, put, select } from "redux-saga/effects";
import { GlobalActions } from "store/slice";

export interface TokenToVerify {
  token: Token;
  amount: BigNumber;
  swapAddress: string;
  tokenContract?: Contract;
}
export interface TokensToVerifyPayload {
  tokensToVerify: TokenToVerify[];
}
export function* checkAndApproveTokensInList(tokens: TokensToVerifyPayload) {
  const { tokensToVerify } = tokens;

  yield put(GlobalActions.emptyTokensInQueueForApproval());

  for (const element of tokensToVerify) {
    yield put(
      GlobalActions.setApprovalForTokenInQueue({
        tokenSymbol: element.token.symbol as TokenSymbols,
        approved: false,
      })
    );
  }
  const library = yield select(Web3Domains.selectLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const infiniteApproval = yield select(GlobalDomains.infiniteApproval);

  try {
    for (const element of tokensToVerify) {
      const tokenContract =
        element.tokenContract ||
        new Contract(
          element.token.address,
          element.token.ABI,
          getProviderOrSigner(library, account)
        );
      yield call(
        checkAndApproveTokenForTrade,
        tokenContract as Erc20,
        element.swapAddress,
        account,
        element.amount,
        infiniteApproval,
        BigNumber.from(0),
        {
          onTransactionError: () => {
            throw new Error("Your transaction could not be completed");
          },
        }
      );
      yield put(
        GlobalActions.setApprovalForTokenInQueue({
          tokenSymbol: element.token.symbol as TokenSymbols,
          approved: true,
        })
      );
    }
    yield put(GlobalActions.emptyTokensInQueueForApproval());
    return true;
  } catch (error) {
    console.log(error);
    yield put(GlobalActions.emptyTokensInQueueForApproval());
    return false;
  }
}

export function* checkIfTokensAreVerified(tokens: TokensToVerifyPayload) {
  const { tokensToVerify } = tokens;
  const library = yield select(Web3Domains.selectLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  let numberOfVerifiedTokens = 0;
  try {
    for (const element of tokensToVerify) {
      const tokenContract =
        element.tokenContract ||
        new Contract(
          element.token.address,
          element.token.ABI,
          getProviderOrSigner(library, account)
        );
      const tokenName = yield call(tokenContract.name);
      const existingAllowance = yield call(
        tokenContract.allowance,
        account,
        element.swapAddress
      );
      console.debug(
        `Existing ${tokenName} Allowance: ${existingAllowance.toString()}`
      );
      if (existingAllowance.gte(element.amount)) {
        numberOfVerifiedTokens++;
      }
    }
    return numberOfVerifiedTokens === tokensToVerify.length;
  } catch (error) {
    return false;
  }
}
