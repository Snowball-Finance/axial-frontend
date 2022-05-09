import { parseEther } from "ethers/lib/utils";
import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { StakingActions } from "./slice";
import { StakeGovernanceTokenModel, StakeAccruingTokenModel } from "./types";
import { Contract } from "ethers";
import { env } from "environment";
import { BlockChainActions } from "../../slice";
import { toast } from "react-toastify";
import { EthersDomains } from "../../Ethers/selectors";
import { Web3Domains } from "../../Web3/selectors";
import { StakingDomains } from "./selectors";
import { GovernanceDomains } from "../selectors";
import { BlockChainDomains } from "../../selectors";
import { GovernanceActions } from "../slice";
import { Axial, SAxial, VeAxial } from "abi/ethers-contracts";
import AccruingTokenABI from "abi/veAxial.json";
import { BNToFloat } from "common/format";
import { getAccruingTokenContract, getGovernanceTokenContract } from "../saga";
import { checkAndApproveTokensInList } from "utils/tokenVerifier";
import { Token } from "app/containers/Swap/types";
import { skipLoading } from "app/types";

export function* getLatestGovernanceData() {
  yield all([
    put(BlockChainActions.getMainTokenBalance()),
    put(GovernanceActions.getGovernanceTokenBalance()),
    put(GovernanceActions.getAccruingTokenBalance()),
    put(StakingActions.getLockedGovernanceTokenInfo()),
  ]);
}

export function* periodicallyRefetchTheData() {
  yield all([
    put(GovernanceActions.getGovernanceTokenBalance(true)),
    put(GovernanceActions.getAccruingTokenBalance(true)),
    put(StakingActions.getLockedGovernanceTokenInfo(true)),
    put(StakingActions.getClaimableGovernanceToken()),
  ]);
  yield delay(5000);
  //TODO: uncomment after sAxial is deployed on mainnet
  // yield call(periodicallyRefetchTheData);
}

export function* stakeGovernanceToken(action: {
  type: string;
  payload: StakeGovernanceTokenModel;
}) {
  const { amount, duration } = action.payload;
  const amountToStake = parseEther(amount.toString());
  yield put(StakingActions.setIsStakingGovernanceToken(true));
  const library = yield select(Web3Domains.selectLibraryDomain);
  //|| is used because if .env is not set,we will fetch the error in early stages
  const mainTokenAddress = env.MAIN_TOKEN_ADDRESS || "";
  const mainTokenABI = yield select(BlockChainDomains.selectMainTokenABIDomain);
  try {
    const mainTokenContract: Axial = new Contract(
      mainTokenAddress,
      mainTokenABI,
      library.getSigner()
    ) as Axial;
    if (mainTokenContract) {
      //|| is used because if .env is not set,we will fetch the error in early stages
      const governanceTokenAddress =
        env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS || "";
      const governanceTokenABI = yield select(
        GovernanceDomains.governanceTokenABI
      );
      const governanceTokenContract: SAxial = new Contract(
        governanceTokenAddress,
        governanceTokenABI,
        library.getSigner()
      ) as SAxial;

      const hasApproval = yield call(checkAndApproveTokensInList, {
        tokensToVerify: [
          {
            amount: amountToStake,
            spenderAddress: governanceTokenAddress,
            token: {
              symbol: env.MAIN_TOKEN_NAME,
            } as Token,
            tokenContract: mainTokenContract,
          },
        ],
      });
      if (!hasApproval) {
        console.debug("transaction not approved");
        return;
      }
      const keepThaUnclaimedWhenExtendingLockPeriod = yield select(
        StakingDomains.keepThaUnclaimedWhenExtendingLockPeriod
      );

      const tokenLock = yield call(
        governanceTokenContract.stake,
        duration,
        amountToStake,
        keepThaUnclaimedWhenExtendingLockPeriod
      );

      const transactionResponse = yield call(tokenLock.wait, 1);
      if (transactionResponse.status) {
        const stringLock = BNToFloat(amountToStake)?.toString();
        toast.success(`locked ${stringLock} ${env.MAIN_TOKEN_NAME} `);
        yield call(getLatestGovernanceData);
      }
    } else {
      toast("Main Token Contract is not set");
      yield put(StakingActions.setIsStakingGovernanceToken(false));
    }
  } catch (error: any) {
    console.debug(error);
    yield put(StakingActions.setIsStakingGovernanceToken(false));
    if (error?.data?.message) {
      toast.error(error.data.message);
    }
  } finally {
    yield put(StakingActions.setIsStakingGovernanceToken(false));
  }
}

export function* stakeAccruingToken(action: {
  type: string;
  payload: StakeAccruingTokenModel;
}) {
  const { amountToStake: amount } = action.payload;
  const amountToStake = parseEther(amount.toString());
  yield put(StakingActions.setIsStakingGovernanceToken(true));
  const library = yield select(Web3Domains.selectLibraryDomain);
  //|| is used because if .env is not set,we will fetch the error in early stages
  const mainTokenAddress = env.MAIN_TOKEN_ADDRESS || "";
  const mainTokenABI = yield select(BlockChainDomains.selectMainTokenABIDomain);
  try {
    const mainTokenContract: Axial = new Contract(
      mainTokenAddress,
      mainTokenABI,
      library.getSigner()
    ) as Axial;
    if (mainTokenContract) {
      const library = yield select(Web3Domains.selectLibraryDomain);
      const accruingTokenAddress =
        process.env.REACT_APP_ACCRUING_TOKEN_ADDRESS || "";
      const accruingTokenContract: VeAxial = new Contract(
        accruingTokenAddress,
        AccruingTokenABI,
        library.getSigner()
      ) as VeAxial;
      const hasApproval = yield call(checkAndApproveTokensInList, {
        tokensToVerify: [
          {
            amount: amountToStake,
            spenderAddress: accruingTokenAddress,
            token: {
              symbol: env.MAIN_TOKEN_NAME,
            } as Token,
            tokenContract: mainTokenContract,
          },
        ],
      });
      if (!hasApproval) {
        console.debug("transaction not approved");
        return;
      }
      const tokenLock = yield call(accruingTokenContract.stake, amountToStake);

      const transactionResponse = yield call(tokenLock.wait, 1);
      if (transactionResponse.status) {
        const stringLock = BNToFloat(amountToStake)?.toString();
        toast.success(`deposited ${stringLock} ${env.MAIN_TOKEN_NAME}`);
        yield call(getLatestGovernanceData);
      }
    } else {
      toast("Main Token Contract is not set");
    }
  } catch (error: any) {
    console.debug(error);
    if (error?.data?.message) {
      toast.error(error.data.message);
    }
  } finally {
    yield put(StakingActions.setIsStakingGovernanceToken(false));
  }
}

export function* getLockedGovernanceTokenInfo(action: {
  type: string;
  payload: skipLoading;
}) {
  const governanceTokenABI = yield select(GovernanceDomains.governanceTokenABI);
  const provider = yield select(EthersDomains.selectPrivateProviderDomain);
  const governanceTokenContract: SAxial = new Contract(
    env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS || "",
    governanceTokenABI,
    provider
  ) as SAxial;
  const account = yield select(Web3Domains.selectAccountDomain);
  try {
    yield put(StakingActions.setIsGettingGovernanceTokenInfo(!action.payload));
    const info = yield call(governanceTokenContract.getLock, account);
    yield put(StakingActions.setGovernanceTokenInfo(info));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(StakingActions.setIsGettingGovernanceTokenInfo(false));
  }
}

export function* withdrawGovernanceToken() {
  yield put(StakingActions.setIsWithdrawingGovernanceToken(true));

  try {
    const governanceTokenContract: SAxial = yield call(
      getGovernanceTokenContract
    );
    const gasLimit = yield call(
      governanceTokenContract.estimateGas.claimMyFunds
    );
    const tokenWithdraw = yield call(governanceTokenContract.claimMyFunds, {
      gasLimit,
    });
    const transactionWithdraw = yield call(tokenWithdraw.wait, 1);

    if (transactionWithdraw.status) {
      yield call(getLatestGovernanceData);
      yield put(StakingActions.setIsWithdrawingGovernanceToken(true));
      toast.success(`withdrawed available ${env.GOVERNANCE_TOKEN_NAME}`);
    }
  } catch (e: any) {
    console.debug(e);
    if (e?.data?.message) {
      toast.error(e.data.message);
    }
  } finally {
    yield put(StakingActions.setIsWithdrawingGovernanceToken(false));
  }
}

export function* getClaimableGovernanceToken() {
  const account = yield select(Web3Domains.selectAccountDomain);

  try {
    const governanceTokenContract: SAxial = yield call(
      getGovernanceTokenContract
    );
    const gasLimit = yield call(
      governanceTokenContract.estimateGas.getUnclaimed,
      account
    );
    const claimable = yield call(
      governanceTokenContract.getUnclaimed,
      account,
      {
        gasLimit,
      }
    );
    yield put(StakingActions.setClaimableGovernanceToken(claimable));
  } catch (e: any) {
    console.debug(e);
    if (e?.data?.message) {
      toast.error(e.data.message);
    }
  }
}
export function* withdrawAccruingToken() {
  yield put(StakingActions.setIsWithdrawingAccruingToken(true));

  try {
    const accruingTokenContract: VeAxial = yield call(getAccruingTokenContract);
    const gasLimit = yield call(
      accruingTokenContract.estimateGas.withdrawMyFunds
    );
    const tokenWithdraw = yield call(accruingTokenContract.withdrawMyFunds, {
      gasLimit,
    });
    const transactionWithdraw = yield call(tokenWithdraw.wait, 1);

    if (transactionWithdraw.status) {
      toast.success(`withdrawed all ${env.ACCRUING_TOKEN_NAME} amount`);
      yield call(getLatestGovernanceData);
      yield put(StakingActions.setIsWithdrawingAccruingToken(false));
    }
  } catch (e: any) {
    yield put(StakingActions.setIsWithdrawingAccruingToken(false));
    console.debug(e);
    if (e?.data?.message) {
      toast.error(e.data.message);
    }
  }
}

export function* stakingSaga() {
  yield takeLatest(
    StakingActions.stakeGovernanceToken.type,
    stakeGovernanceToken
  );
  yield takeLatest(StakingActions.stakeAccruingToken.type, stakeAccruingToken);
  yield takeLatest(
    StakingActions.getLockedGovernanceTokenInfo.type,
    getLockedGovernanceTokenInfo
  );
  yield takeLatest(
    StakingActions.withdrawGovernanceToken.type,
    withdrawGovernanceToken
  );
  yield takeLatest(
    StakingActions.withdrawAccruingToken.type,
    withdrawAccruingToken
  );
  yield takeLatest(
    StakingActions.getClaimableGovernanceToken.type,
    getClaimableGovernanceToken
  );

  yield takeLatest(
    StakingActions.activatePeriodicallyRefetchTheData.type,
    periodicallyRefetchTheData
  );
}
