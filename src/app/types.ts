import { ethers } from 'ethers'

/* eslint-disable */
export enum AppPages {
  RootPage = '/',
  HomePage = '/home',
}


export type PrivateProvider = ethers.providers.StaticJsonRpcProvider
export type Contract = ethers.Contract