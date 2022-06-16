import SafeAppsSDK, { SafeInfo } from "@gnosis.pm/safe-apps-sdk";

/* --- STATE --- */

export interface GnosisSafeState {
  safe: SafeInfo | undefined;
  sdk: SafeAppsSDK | undefined;
  connected: boolean;
}

export type ContainerState = GnosisSafeState;
