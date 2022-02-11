import { apiService } from "services/api";
import { RequestTypes } from "services/types";

export const checkIfNodeIsHealthyAPI = (url: any) => {
  const data = { jsonrpc: "2.0", id: 1, method: "health.getLiveness" };
  return apiService.fetchData({
    data,
    url: `${url}ext/health`,
    requestType: RequestTypes.POST,
    isRawUrl: true,
  });
};
