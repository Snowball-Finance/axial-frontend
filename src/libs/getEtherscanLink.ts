export function getEtherscanLink(
  data: string,
  type: "tx" | "token" | "address" | "block",
): string {
  return `https://cchain.explorer.avax.network/${type}/${data}`
}
