import { MAX_RETRIES } from "config";
import { ethers } from "ethers";

const isServer = () => typeof window === "undefined";

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const metaMaskInstallHandler = () => {
  window.open("https://metamask.io/download", "_blank");
};

const roundDown = (value, decimals = 18) => {
  const valueString = value.toString();
  const integerString = valueString.split(".")[0];
  const decimalsString = valueString.split(".")[1];
  if (!decimalsString) {
    return integerString;
  }
  return `${integerString}.${decimalsString.slice(0, decimals)}`;
};

const getBalanceWithRetry = async (contract, account) => {
  let balance = ethers.BigNumber.from("0");

  let currentDepth = 0;
  while (!balance.gt("0x0") && MAX_RETRIES > currentDepth) {
    balance = await contract.balanceOf(account);
    currentDepth++;
    await delay(1000);
  }
  return balance;
};

const debounce = (func, wait) => {
  let timeout;
  return (args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func(args);
    }, wait);
  };
};

export {
  isServer,
  isEmpty,
  delay,
  roundDown,
  metaMaskInstallHandler,
  getBalanceWithRetry,
  debounce,
};
