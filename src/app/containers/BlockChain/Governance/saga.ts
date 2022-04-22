import { BigNumber, Contract, ethers } from "ethers";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { GovernanceActions } from "./slice";
import {
  ContainerState,
  Proposal,
  Receipt,
  SubmitNewProposalPayload,
} from "./types";
import { BNToFloat } from "common/format";
import { totalSupplyProvider } from "app/containers/BlockChain/providers/balanceAPI";
import { env } from "environment";
import { parseProposalFromRawBlockchainResponse } from "./utils/proposalParser";
import { Web3Domains } from "../Web3/selectors";
import { GovernanceDomains } from "./selectors";
import { GetProposalsAPI } from "app/containers/BlockChain/Governance/providers/proposals";
import { Governance, SAxial, VeAxial } from "abi/ethers-contracts";
import AccruingTokenABI from "abi/veAxial.json";
import { StakingActions } from "./Staking/slice";
import { skipLoading } from "app/types";
import { getProviderOrSigner } from "app/containers/utils/contractUtils";
import {
  ExecutionContext,
  GovernancePageState,
} from "app/pages/Governance/types";
import { GovernancePageActions } from "app/pages/Governance/slice";

export function* getProposals(action: {
  type: string;
  payload: { silent?: boolean };
}) {
  const { silent } = action.payload;
  if (!silent) {
    yield put(GovernanceActions.setIsGettingProposals(true));
  }
  try {
    const response = yield call(GetProposalsAPI);
    const proposals: Proposal[] = []; //response.data.ProposalList.proposals;
    //TODO get id and status of proposals
    yield put(GovernanceActions.setProposals(proposals));
  } catch (error) {
    toast.error("error while getting proposals");
  } finally {
    if (!silent) {
      yield put(GovernanceActions.setIsGettingProposals(true));
    }
  }
}

export function* getProposalId(proposal: Proposal) {
  const proposer = proposal.proposer;
  const governanceContract = yield call(getGovernanceContract);
  const proposalId: BigNumber = yield call(
    governanceContract.lastProposalByAddress,
    proposer
  );
  return proposalId;
}

export function* getGovernanceContract() {
  const account = yield select(Web3Domains.selectAccountDomain);
  const library = yield select(Web3Domains.selectNetworkLibraryDomain);
  const GOVERNANCE_ABI = yield select(
    GovernanceDomains.selectGovernanceABIDomain
  );
  const governanceContract = new ethers.Contract(
    //|| '' is added because the error of not existing env var is handled in index file of this module
    env.VOTING_CONTRACT_ADDRESS || "",
    GOVERNANCE_ABI,
    getProviderOrSigner(library, account)
  ) as Governance;

  return governanceContract;
}

export function* vote(action: {
  type: string;
  payload: { proposal: Proposal; voteFor: number };
}) {
  const { proposal, voteFor } = action.payload;
  try {
    const votingContract: Governance = yield call(getGovernanceContract);
    if (voteFor) {
      yield put(GovernanceActions.setIsVotingFor(true));
    } else {
      yield put(GovernanceActions.setIsVotingAgainst(true));
    }

    const proposalId: BigNumber = yield call(getProposalId, proposal);

    const proposalVote = yield call(votingContract.vote, proposalId, voteFor);
    const transactionVote = yield call(proposalVote.wait, 1);
    if (transactionVote.status) {
      toast.success(
        `voted successfully ${voteFor ? "for" : "against"} proposal`
      );
    }
    yield put(GovernanceActions.getVotingReceipt({ proposal }));
    yield put(GovernanceActions.setSyncedProposalsWithBlockchain(false));
  } catch (error) {
    toast.error("error while voting");
  } finally {
    if (voteFor) {
      yield put(GovernanceActions.setIsVotingFor(false));
    } else {
      yield put(GovernanceActions.setIsVotingAgainst(false));
    }
  }
}

export function* submitNewProposal(action: {
  type: string;
  payload: SubmitNewProposalPayload;
}) {
  yield put(GovernanceActions.setIsSubmittingNewProposal(true));
  const proposalFields = action.payload.newProposalFields;
  const { title, votingPeriod, discussion, description, document } =
    proposalFields;
  let executionContexts: ExecutionContext[] = [];
  const labels: string[] = [];
  const targets: string[] = [];
  const values: string[] = [];
  const data: string[] = [];

  if (action.payload.executionContexts) {
    executionContexts = action.payload.executionContexts;
  }
  executionContexts.forEach((element) => {
    labels.push(element.description);
    targets.push(element.contractAddress);
    values.push(element.avaxValue);
    data.push(element.data);
  });
  try {
    const governanceContract: Governance = yield call(getGovernanceContract);
    const metaData = {
      title,
      description,
      document,
    };
    const stringifiedMetadata = JSON.stringify(metaData);
    const parsedMetaData = yield call(
      governanceContract.constructProposalMetadata,
      title,
      stringifiedMetadata,
      Number(votingPeriod),
      false
    );
    const parsedExecutionContext = yield call(
      governanceContract.constructProposalExecutionContexts,
      labels,
      targets,
      values,
      data
    );

    const transaction = yield call(
      governanceContract.propose,
      parsedMetaData,
      parsedExecutionContext
    );
    const transactionStatus = yield call(transaction.wait, 1);
    if (transactionStatus.status) {
      toast.success("Proposal submitted successfully");
      yield put(GovernancePageActions.resetNewProposalFields());
    }
  } catch (error: any) {
    const message = error?.data?.message;
    if (message) {
      toast.error(
        message.replace("execution reverted: Governance::propose: ", "")
      );
    }
  } finally {
    yield all([
      put(GovernanceActions.setIsSubmittingNewProposal(false)),
      // put(GovernanceActions.setSyncedProposalsWithBlockchain(false)),
    ]);
  }
}

export function* getVotingReceipt(action: {
  type: string;
  payload: { proposal: Proposal };
}) {
  const { proposal } = action.payload;
  yield put(GovernanceActions.setIsGettingReceipt(true));
  try {
    const proposalId = yield call(getProposalId, proposal);
    const governanceContract: Governance = yield call(getGovernanceContract);
    const account = yield select(Web3Domains.selectAccountDomain);
    const receipt: Receipt = yield governanceContract.getReceipt(
      proposalId,
      account
    );
    const votes = BNToFloat(receipt[2], 18);
    const rec = {
      hasVoted: receipt[0] || false,
      support: receipt[1] || false,
      votes: votes || BigNumber.from(0),
    };
    yield put(GovernanceActions.setVotingReceipt(rec));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(GovernanceActions.setIsGettingReceipt(false));
  }
}

export function* getGovernanceTokenBalance(action: {
  type: string;
  payload: skipLoading;
}) {
  yield put(
    GovernanceActions.setIsGettingGovernanceTokenBalance(!action.payload)
  );
  const account = yield select(Web3Domains.selectAccountDomain);
  const library = yield select(Web3Domains.selectLibraryDomain);
  const governanceTokenAddress = env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS || "";
  const governanceTokenABI = yield select(
    GovernanceDomains.selectGovernanceTokenABIDomain
  );
  const governanceTokenContract: SAxial = new Contract(
    governanceTokenAddress,
    governanceTokenABI,
    library.getSigner()
  ) as SAxial;

  try {
    const response: BigNumber = yield call(
      governanceTokenContract.getBalance,
      account
    );
    yield put(GovernanceActions.setGovernanceTokenBalance(response));
  } catch (error) {
    toast.error(`Error getting ${env.GOVERNANCE_TOKEN_NAME} balance`);
  } finally {
    yield put(GovernanceActions.setIsGettingGovernanceTokenBalance(false));
  }
}

export function* getAccruingTokenBalance(action: {
  type: string;
  payload: skipLoading;
}) {
  yield put(
    GovernanceActions.setIsGettingGovernanceTokenBalance(!action.payload)
  );
  const account = yield select(Web3Domains.selectAccountDomain);
  const accruingTokenContract: VeAxial = yield call(getAccruingTokenContract);
  try {
    const [userAccrued, totalAccrued, staked]: [
      BigNumber,
      BigNumber,
      BigNumber
    ] = yield all([
      call(accruingTokenContract.getAccrued, account),
      call(accruingTokenContract.getAccrued, account),
      call(accruingTokenContract.getStaked, account),
    ]);
    yield all([
      put(GovernanceActions.setAccruingTokenBalance(userAccrued)),
      put(GovernanceActions.setTotalAccrued(totalAccrued)),
      put(GovernanceActions.setMainTokenAmountStakedForAccruing(staked)),
    ]);
  } catch (error) {
    toast.error(`Error getting ${env.ACCRUING_TOKEN_NAME} balance`);
  } finally {
    yield put(GovernanceActions.setIsGettingGovernanceTokenBalance(false));
  }
}
export function* getTotalGovernanceTokenSupply() {
  const governanceToken = yield select(
    GovernanceDomains.selectGovernanceTokenContractDomain
  );
  try {
    const contract: Governance = governanceToken;
    const response = yield call(totalSupplyProvider, { contract });
    yield put(GovernanceActions.setTotalGovernanceTokenSupply(response));
  } catch (e) {
    toast.error("error while getting Governance token supply");
    console.log(e);
  }
}

export function* syncProposalsWithBlockchain() {
  try {
    const library = yield select(Web3Domains.selectLibraryDomain);
    const GOVERNANCE_ABI = yield select(
      GovernanceDomains.selectGovernanceABIDomain
    );
    const voteContractAddress = env.VOTING_CONTRACT_ADDRESS;
    const governanceContract = new ethers.Contract(
      //using ||'' because we made sure env.VOTING_CONTRACT_ADDRESS exists in the index of module,and want to ignore the ts error
      voteContractAddress || "",
      GOVERNANCE_ABI,
      library.getSigner()
    );
    const numberOfProposalsOnBlockChain = yield call(
      governanceContract.proposalCount
    );
    const num = Number(numberOfProposalsOnBlockChain.toString());
    const proposals = yield select(GovernanceDomains.selectProposalsDomain);
    let proposalsInstance = [...proposals];
    let offsetEnv: string | number | undefined = env.PROPOSALS_OFFSET_NUMBER;
    if (!offsetEnv) {
      offsetEnv = "0";
    }
    const offset = Number(offsetEnv);

    for (let i = 0; i < proposalsInstance.length; i++) {
      let item = proposalsInstance[i];
      if (item.state === "Active") {
        const tmp = yield call(
          governanceContract.proposals,
          item.index - offset
        );
        const tmpProposal = yield call(parseProposalFromRawBlockchainResponse, {
          item: tmp,
          alreadyHasMetadata: true,
        });
        proposalsInstance[i] = { ...proposals[i], ...tmpProposal };
      }
    }

    const newProposals: Proposal[] = [];
    if (num > proposalsInstance.length - offset) {
      const dif = num - (proposalsInstance.length - offset);
      for (let i = 0; i < dif; i++) {
        const newIdx = proposalsInstance[0].index + i + 1;
        const tmp = yield call(governanceContract.proposals, newIdx - offset);
        const proposal = { ...tmp };
        const tmpProposal = yield call(parseProposalFromRawBlockchainResponse, {
          item: proposal,
        });
        tmpProposal.index = newIdx;
        tmpProposal.state = "Active";
        tmpProposal.offset = newIdx - offset;
        newProposals.unshift(tmpProposal);
      }
    }
    //order here is important, because we want to make sure syncedProposal field is updated first, and we don't end up requesting again and again, because what triggers syncProposalsWithBlockchain is useEffect on the index of this module
    yield put(GovernanceActions.setSyncedProposalsWithBlockchain(true));
    yield put(
      GovernanceActions.setProposals([...newProposals, ...proposalsInstance])
    );
  } catch (error) {
    console.log(error);
  }
}

//get balances whenever contract is set
export function* setGovernanceTokenContract(action: {
  type: string;
  payload: ContainerState["governanceTokenContract"];
}) {
  if (action.payload) {
    yield all([
      put(GovernanceActions.getGovernanceTokenBalance()),
      put(GovernanceActions.getAccruingTokenBalance()),
      put(StakingActions.activatePeriodicallyRefetchTheData()),
    ]);
  }
}

export function* getGovernanceTokenContract() {
  const governanceTokenABI = yield select(
    GovernanceDomains.selectGovernanceTokenABIDomain
  );
  const library = yield select(Web3Domains.selectNetworkLibraryDomain);
  const governanceTokenContract: SAxial = new Contract(
    env.GOVERNANCE_TOKEN_CONTRACT_ADDRESS || "",
    governanceTokenABI,
    library.getSigner()
  ) as SAxial;
  return governanceTokenContract;
}
export function* getAccruingTokenContract() {
  const library = yield select(Web3Domains.selectLibraryDomain);
  const accruingTokenAddress =
    process.env.REACT_APP_ACCRUING_TOKEN_ADDRESS || "";
  const accruingTokenContract: VeAxial = new Contract(
    accruingTokenAddress,
    AccruingTokenABI,
    library.getSigner()
  ) as VeAxial;
  return accruingTokenContract;
}

export function* governanceSaga() {
  yield takeLatest(
    GovernanceActions.getGovernanceTokenBalance.type,
    getGovernanceTokenBalance
  );
  yield takeLatest(
    GovernanceActions.getAccruingTokenBalance.type,
    getAccruingTokenBalance
  );
  // yield takeLatest(
  //   GovernanceActions.getTotalGovernanceTokenSupply.type,
  //   getTotalGovernanceTokenSupply
  // );
  yield takeLatest(GovernanceActions.getProposals.type, getProposals);
  yield takeLatest(GovernanceActions.vote.type, vote);
  yield takeLatest(GovernanceActions.submitNewProposal.type, submitNewProposal);
  yield takeLatest(GovernanceActions.getVotingReceipt.type, getVotingReceipt);
  yield takeLatest(
    GovernanceActions.syncProposalsWithBlockchain.type,
    syncProposalsWithBlockchain
  );
  yield takeLatest(
    GovernanceActions.setGovernanceTokenContract.type,
    setGovernanceTokenContract
  );
}
