import { env, IS_DEV } from "../../../environment"

export const GetProposalsAPI = async (query: string) => {
  const response = await fetch(
    (IS_DEV ? env.DEVAPIADDR : env.APIADDR) + "?query=" + query,
    { method: "GET" },
  )
  const res = await response.json()
  return res
}
