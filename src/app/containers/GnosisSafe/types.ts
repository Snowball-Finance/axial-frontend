import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';


/* --- STATE --- */

export interface GnosisSafeState {
safe:SafeInfo|undefined,
sdk:SafeAppsSDK|undefined
}


export type ContainerState = GnosisSafeState;
