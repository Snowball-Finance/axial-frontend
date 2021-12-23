import { ethers } from 'ethers'

/* eslint-disable */
export enum AppPages {
  RootPage = '/',
  HomePage = '/home',
  GovernancePage = '/governance',
}

export type PrivateProvider = ethers.providers.StaticJsonRpcProvider
export type Contract = ethers.Contract