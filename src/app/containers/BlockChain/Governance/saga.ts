import { BigNumber, Contract, ethers } from "ethers";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { GovernanceActions } from "./slice";
import {
  ContainerState,
  Proposal,
  ProposalExecContext,
  ProposalState,
  Receipt,
  SubmitNewProposalPayload,
} from "./types";
import { BNToFloat } from "common/format";
import { totalSupplyProvider } from "app/containers/BlockChain/providers/balanceAPI";
import { env } from "environment";
import { Web3Domains } from "../Web3/selectors";
import { GovernanceDomains } from "./selectors";
import { GetProposalsAPI } from "app/containers/BlockChain/Governance/providers/proposals";
import { Governance, SAxial, VeAxial } from "abi/ethers-contracts";
import AccruingTokenABI from "abi/veAxial.json";
import { StakingActions } from "./Staking/slice";
import { skipLoading } from "app/types";
import { ExecutionContext } from "app/pages/Governance/types";
import { GovernancePageActions } from "app/pages/Governance/slice";
import axios from "axios";
import { add } from "precise-math";
import { getProviderOrSigner } from "app/containers/utils/contractUtils";

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
    const proposals: Proposal[] = response; //response.data.ProposalList.proposals;
    console.log({ proposals });
    yield put(GovernanceActions.setProposals(proposals));
  } catch (error) {
    console.log(error);
    toast.error("error while getting proposals");
  } finally {
    if (!silent) {
      yield put(GovernanceActions.setIsGettingProposals(true));
      yield put(GovernanceActions.setSyncedProposalsWithBlockchain(false));
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
  const library = yield select(Web3Domains.selectNetworkLibraryDomain);
  const account = yield select(Web3Domains.selectAccountDomain);
  const GOVERNANCE_ABI = yield select(GovernanceDomains.governanceABI);
  const governanceContract = new ethers.Contract(
    //|| '' is added because the error of not existing env var is handled in index file of this module
    env.GOVERNANCE_CONTRACT_ADDRESS || "",
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
    const governanceContract: Governance = yield call(getGovernanceContract);
    yield put(GovernanceActions.setIsVotingFor(voteFor));
    const proposalId: BigNumber = yield call(getProposalId, proposal);
    const proposalVote = yield call(
      governanceContract.vote,
      proposalId,
      voteFor
    );
    const transactionVote = yield call(proposalVote.wait, 1);
    if (transactionVote.status) {
      toast.success(`voted successfully for proposal`);
    }
    yield put(GovernanceActions.getVotingReceipt({ proposal }));
    yield put(GovernanceActions.setSyncedProposalsWithBlockchain(false));
  } catch (error) {
    toast.error("error while voting");
  } finally {
    if (voteFor) {
      yield put(GovernanceActions.setIsVotingFor(-1));
    } else {
      yield put(GovernanceActions.setIsVotingAgainst(false));
    }
  }
}

export function* saveToIPFS(data: any) {
  let metadataURI;
  const url = process.env.REACT_APP_IPFS_API_URL;
  try {
    const res = yield call(axios.request, {
      method: "POST",
      url,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201 && res.headers["ipfs-hash"]) {
      console.log("Proposal metadata hash: ", res.headers["ipfs-hash"]);
      metadataURI = url + res.headers["ipfs-hash"];
    } else {
      throw Error("Unexpected IPFS error");
    }
  } catch (error) {
    console.log(error);
  }
  return metadataURI;
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
  const values: number[] = [];
  const data: string[] = [];
  if (action.payload.executionContexts) {
    executionContexts = action.payload.executionContexts;
  }
  executionContexts.forEach((element) => {
    labels.push(element.description);
    targets.push(element.contractAddress);
    data.push(element.data);
    if (isNaN(Number(element.avaxValue))) {
      values.push(0);
    } else {
      values.push(Number(element.avaxValue));
    }
  });

  try {
    const governanceContract: Governance = yield call(getGovernanceContract);
    const metaData: any = {
      title,
      description,
      discussion,
      document,
      executionLabels: labels,
    };
    const ipfsUrl = yield call(saveToIPFS, metaData);
    metaData.ipfs = ipfsUrl;
    if (!ipfsUrl) {
      throw Error("error while saving new proposal data");
    }
    const stringifiedMetadata = JSON.stringify(metaData);
    const votingPeriodInSeconds = Number(votingPeriod) * 60 * 60 * 24;
    const parsedMetaData = yield call(
      governanceContract.constructProposalMetadata,
      title,
      stringifiedMetadata,
      votingPeriodInSeconds,
      labels.length >= 0
    );
    let parsedExecutionContext;
    try {
      parsedExecutionContext = yield call(
        governanceContract.constructProposalExecutionContexts,
        labels,
        targets,
        values,
        data
      );
    } catch (error) {
      console.log(error);
      toast.error("error while parsing execution contexts");
      return;
    }
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
    console.log(error);
    const message = error?.data?.message;
    if (message) {
      toast.error(
        message.replace("execution reverted: Governance::propose: ", "")
      );
    }
  } finally {
    yield all([
      put(GovernanceActions.setIsSubmittingNewProposal(false)),
      put(GovernanceActions.setSyncedProposalsWithBlockchain(false)),
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
  const governanceTokenABI = yield select(GovernanceDomains.governanceTokenABI);
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
    GovernanceDomains.governanceTokenContract
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
    const governanceContract: Governance = yield call(getGovernanceContract);
    const numberOfProposalsOnBlockchain = yield call(
      governanceContract.proposalCount
    );
    const proposalsCallArray: any[] = [];
    const statesCallArray: any[] = [];
    const votesCallArray: any = [];
    for (let i = 0; i < Number(numberOfProposalsOnBlockchain); i++) {
      proposalsCallArray.push(call(governanceContract.proposals, i));
      statesCallArray.push(call(governanceContract.state, i));
      votesCallArray.push(call(governanceContract.getProposalVotes, i));
    }
    const [proposalsFromBlockChain, statesFromBlockChain, votesFromBlockChain] =
      yield all([
        all(proposalsCallArray),
        all(statesCallArray),
        all(votesCallArray),
      ]);
    const updatedProposals: Proposal[] = [];
    for (let i = 0; i < proposalsFromBlockChain.length; i++) {
      const item: Governance.ProposalStruct = proposalsFromBlockChain[i];
      let metaData;
      try {
        metaData = JSON.parse(item.metadata);
      } catch (error) {
        metaData = item.metadata;
      }
      const executionContexts: ProposalExecContext[] =
        item.executionContexts.contexts?.map((item) => ({
          data: JSON.stringify(item.data),
          label: item.label,
          value: Number(item.value).toString(),
          target: item.target,
        })) || [];

      const states = Object.values(ProposalState);
      let state = ProposalState.Active;
      for (let index = 0; index < states.length; index++) {
        if (index === statesFromBlockChain[i]) {
          state = states[index];
        }
      }

      const duration = Math.floor(
        Number(item.executionDelay) / (3600 * 24)
      ).toString();
      const startTime = new Date(Number(item.startTime) * 1000);
      const endTime = new Date(
        add(Number(item.votingPeriod), Number(item.startTime)) * 1000
      );
      const proposal: Proposal = {
        id: i.toString(),
        blockChainData: item,
        proposer: item.proposer,
        votes: votesFromBlockChain.map((item) => Number(item).toString()) || [],
        title: item.title,
        description: metaData?.description || metaData,
        document: metaData?.document || "",
        discussion: metaData?.discussion || "",
        proposal_state: state,
        start_date: startTime.toLocaleDateString(),
        end_date: endTime.toLocaleDateString(),
        executor: item.executor,
        execution_contexts: executionContexts,
        governance_id: i.toString(),
        quorum_votes: Number(item.quorumVotes).toString(),
        duration,
      };
      updatedProposals.push(proposal);
    }
    yield put(GovernanceActions.setSyncedProposalsWithBlockchain(true));
    yield put(GovernanceActions.setProposals([...updatedProposals]));
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
  const governanceTokenABI = yield select(GovernanceDomains.governanceTokenABI);
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
