import { ethers } from "ethers";
import { toast } from "react-toastify";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { GovernanceActions } from "./slice";
import { ContainerState, Proposal } from "./types";
import { BNToFloat } from "common/format";
import {
  balanceProvider,
  totalSupplyProvider,
} from "app/containers/BlockChain/providers/balanceAPI";
import { env } from "environment";
import { parseProposalFromRawBlockchainResponse } from "./utils/proposalParser";
import { Web3Domains } from "../Web3/selectors";
import { GovernanceDomains } from "./selectors";
import { GetProposalsAPI } from "app/containers/BlockChain/Governance/providers/proposals";

export function* getProposals(action: {
  type: string;
  payload: { silent?: boolean; query: string };
}) {
  const { silent, query } = action.payload;
  if (!silent) {
    yield put(GovernanceActions.setIsLoadingProposals(true));
  }
  try {
    const response = yield call(GetProposalsAPI, query);
    const proposals: Proposal[] = response.data.ProposalList.proposals;
    yield put(GovernanceActions.setProposals(proposals));
  } catch (error) {
    toast.error("error while getting proposals");
  } finally {
    if (!silent) {
      yield put(GovernanceActions.setIsLoadingProposals(true));
    }
  }
}

export function* vote(action: {
  type: string;
  payload: { proposal: Proposal; voteFor: boolean };
}) {
  const library = yield select(Web3Domains.selectLibraryDomain);
  const GOVERNANCE_ABI = yield select(
    GovernanceDomains.selectGovernanceABIDomain
  );
  const { proposal, voteFor } = action.payload;
  try {
    const votingContract = new ethers.Contract(
      //|| '' is added because the error of not existing env var is handled in index file of this module
      env.VOTING_CONTRACT_ADDRESS || "",
      GOVERNANCE_ABI,
      library.getSigner()
    );
    if (voteFor) {
      yield put(GovernanceActions.setIsVotingFor(true));
    } else {
      yield put(GovernanceActions.setIsVotingAgainst(true));
    }
    const proposalVote = yield call(
      votingContract.vote,
      proposal.offset,
      voteFor
    );
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

export function* submitNewProposal() {
  yield put(GovernanceActions.setIsSubmittingNewProposal(true));
  const proposalFields: ContainerState["newProposalFields"] = yield select(
    GovernanceDomains.selectNewProposalFieldsDomain
  );
  const { title, votingPeriod, discussion } = proposalFields;
  const metadataURI = discussion;
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
    const account = yield select(Web3Domains.selectAccountDomain);
    yield call(
      governanceContract.propose,
      title,
      metadataURI,
      Number(votingPeriod) * (3600 * 24),
      account,
      0,
      0x00
    );
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
      put(GovernanceActions.setSyncedProposalsWithBlockchain(false)),
      put(GovernanceActions.setIsNewProposalFormOpen(false)),
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
    const proposalIdValue = ethers.utils.parseUnits(
      proposal.offset.toString(),
      0
    );
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
    const account = yield select(Web3Domains.selectAccountDomain);
    const receipt = yield governanceContract.getReceipt(
      proposalIdValue,
      account
    );
    const votes = BNToFloat(receipt[2], 18);
    const rec = {
      hasVoted: receipt[0] || false,
      support: receipt[1] || false,
      votes,
    };
    yield put(GovernanceActions.setVotingReceipt(rec));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(GovernanceActions.setIsGettingReceipt(false));
  }
}

export function* getGovernanceTokenBalance() {
  yield put(GovernanceActions.setIsGettingGovernanceTokenBalance(true));
  const account = yield select(Web3Domains.selectAccountDomain);
  const governanceToken = yield select(
    GovernanceDomains.selectGovernanceTokenContractDomain
  );
  const contract = governanceToken;
  try {
    const response = yield call(balanceProvider, { contract, account });
    yield put(GovernanceActions.setGovernanceTokenBalance(response));
  } catch (error) {
    toast.error(`Error getting ${env.GOVERNANCE_TOKEN_NAME} balance`);
  } finally {
    yield put(GovernanceActions.setIsGettingGovernanceTokenBalance(false));
  }
}

export function* getTotalGovernanceTokenSupply() {
  const governanceToken = yield select(
    GovernanceDomains.selectGovernanceTokenContractDomain
  );
  const contract = governanceToken;
  const response = yield call(totalSupplyProvider, { contract });
  yield put(GovernanceActions.setTotalGovernanceTokenSupply(response));
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
  yield all([
    action.payload && put(GovernanceActions.getGovernanceTokenBalance()),
    put(GovernanceActions.getTotalGovernanceTokenSupply()),
  ]);
}

export function* governanceSaga() {
  yield takeLatest(
    GovernanceActions.getGovernanceTokenBalance.type,
    getGovernanceTokenBalance
  );
  yield takeLatest(
    GovernanceActions.getTotalGovernanceTokenSupply.type,
    getTotalGovernanceTokenSupply
  );
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
