export function getEtherscanLink(data: string, type: "tx" | "token" | "address" | "block"): string {
  return `https://snowtrace.io/${type}/${data}`;
}
