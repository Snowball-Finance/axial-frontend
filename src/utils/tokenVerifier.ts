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
  spenderAddress: string;
  tokenContract?: Contract;
}
export interface TokensToVerifyPayload {
  tokensToVerify: TokenToVerify[];
}
export function* checkAndApproveTokensInList(tokens: TokensToVerifyPayload) {
  const { tokensToVerify } = tokens;

  const approveArray = tokensToVerify.filter((item: TokenToVerify) =>
    item.amount.gt(0)
  );

  yield put(GlobalActions.emptyTokensInQueueForApproval());
  yield put(GlobalActions.emptyTokensInQueueForApproving());

  for (const element of approveArray) {
    yield put(
      GlobalActions.setApprovalForTokenInQueue({
        tokenSymbol: element.token.symbol as TokenSymbols,
        approved: false,
      })
    );
    yield put(
      GlobalActions.setApprovingForTokenInQueue({
        tokenSymbol: element.token.symbol as TokenSymbols,
        approving: false,
      })
    );
  }
  const library = yield select(Web3Domains.selectLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const infiniteApproval = yield select(GlobalDomains.infiniteApproval);

  try {
    for (const element of approveArray) {
      yield put(
        GlobalActions.setApprovingForTokenInQueue({
          tokenSymbol: element.token.symbol as TokenSymbols,
          approving: true,
        })
      );
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
        element.spenderAddress,
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
      yield put(
        GlobalActions.setApprovingForTokenInQueue({
          tokenSymbol: element.token.symbol as TokenSymbols,
          approving: false,
        })
      );
    }
    yield put(GlobalActions.emptyTokensInQueueForApproval());
    yield put(GlobalActions.emptyTokensInQueueForApproving());
    return true;
  } catch (error) {
    console.log(error);
    yield put(GlobalActions.emptyTokensInQueueForApproval());
    yield put(GlobalActions.emptyTokensInQueueForApproving());
    return false;
  }
}

export function* checkIfTokensAreVerified(tokens: TokensToVerifyPayload) {
  const { tokensToVerify } = tokens;
  const approveArray = tokensToVerify.filter((item: TokenToVerify) =>
    item.amount.gt(0)
  );

  const library = yield select(Web3Domains.selectLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  let numberOfVerifiedTokens = 0;
  try {
    for (const element of approveArray) {
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
        element.spenderAddress
      );
      console.debug(
        `Existing ${tokenName} Allowance: ${existingAllowance.toString()}`
      );
      if (existingAllowance.gte(element.amount)) {
        numberOfVerifiedTokens++;
      }
    }
    return numberOfVerifiedTokens === approveArray.length;
  } catch (error) {
    return false;
  }
}
