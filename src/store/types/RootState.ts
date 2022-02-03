// import { HomePageState } from "app/containers/pages/Home/types";
// import { ExampleState } from "app/containers/pages/Example/types";
// import { BlockChainState } from "app/containers/BlockChain/types";
// import { Web3State } from "app/containers/BlockChain/Web3/types";
// import { EthersState } from "app/containers/BlockChain/Ethers/types";
// import { GovernanceState } from "app/containers/BlockChain/Governance/types";
// import { PoolsAndGaugesState } from "app/containers/PoolsAndGauges/types";
// import { GovernancePageState } from "app/containers/pages/Governance/types";
// import { StakingState } from "app/containers/BlockChain/Governance/Staking/types";
// import { StakingPageState } from "app/containers/pages/StakingPage/types";
import { GovernancePageState } from "pages/Governance/types"
import { StakingPageState } from "pages/Staking/types"
import { EthersState } from "../../containers/BlockChain/Ethers/types"
import { StakingState } from "../../containers/BlockChain/Governance/Staking/types"
import { GovernanceState } from "../../containers/BlockChain/Governance/types"
import { BlockChainState } from "../../containers/BlockChain/types"
import { Web3State } from "../../containers/BlockChain/Web3/types"
import { ApplicationState } from "../application"
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  global?: any
  // homePage?: HomePageState;
  // example?: ExampleState;
  web3?: Web3State
  ethers?: EthersState
  blockChain?: BlockChainState
  governance?: GovernanceState
  // poolsAndGauges?: PoolsAndGaugesState;
  governancePage?: GovernancePageState
  staking?: StakingState
  stakingPage?: StakingPageState
  application: ApplicationState
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
