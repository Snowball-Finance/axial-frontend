import { RequestTypes, RequestParameters } from "./types";
import { queryStringer } from "common/qs";
import { MessageService, MessageNames } from "./message";
import { toast } from "react-toastify";

export class ApiService {
  private static instance: ApiService;
  private constructor() {}
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public baseUrl = process.env.REACT_APP_BASE_URL;
  public token: string = "";
  public async fetchData(params: RequestParameters) {
    const url = params.isRawUrl ? params.url : this.baseUrl + params.url;

    if (process.env.NODE_ENV !== "production") {
      const uri = `${params.isRawUrl ? "" : this.baseUrl}${params.url}`;
      console.log(
        `🚀 %c${params.requestType} %crequest to: %c${uri}\n✉%c:`,
        "color:green;",
        "color:black;",
        "color:green;",
        "color:black;",
        params.data
      );
    }
    switch (params.requestType) {
      case RequestTypes.GET:
        let query = "";
        if (params.data !== {}) {
          query = queryStringer(params.data);
        }
        const rawRes = await fetch(url + query, {
          method: "GET",
          // credentials: 'include',
          headers: this.getHeaders(),
        });
        return await this.handleRawResponse(rawRes, params);
      default:
        const rawResponse = await fetch(url, {
          method: params.requestType,
          headers: this.getHeaders(),
          // credentials: 'include',
          redirect: "follow",
          body: JSON.stringify(params.data),
        });
        return await this.handleRawResponse(rawResponse, params);
    }
  }

  handleRawResponse(rawResponse: Response, params: RequestParameters) {
    if (!rawResponse.ok) {
      console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
      console.log(rawResponse.status);
      if (rawResponse.status === 422) {
        return rawResponse.json();
      }
      if (rawResponse.status === 401) {
        MessageService.send({ name: MessageNames.AUTH_ERROR_EVENT });
      } else if (rawResponse.status === 500) {
        toast.error("connection failed");
      }
    }
    if (process.env.NODE_ENV !== "production") {
      const uri = `${params.isRawUrl ? "" : this.baseUrl}${params.url}`;
      if (rawResponse.ok) {
        rawResponse
          .clone()
          .json()
          .then((response) => {
            console.log(
              `✅ %csuccess %c${params.requestType} %crequest to: %c${uri}\n✉%c:`,
              "color:green;font-size:15px;",
              "color:blue;",
              "color:black;",
              "color:green;",
              "color:black;",
              params.data,
              "\n",
              " response 👇",
              response
            );
          });
      } else {
        console.log(
          `⛔ %cError %c${params.requestType} %crequest to: %c${uri}\n✉%c:`,
          "color:red;font-size:15px;",
          "color:green;",
          "color:black;",
          "color:green;",
          "color:black;",
          params.data
        );
        return new Error(`❌ Error calling ${uri}`);
      }
    }
    return rawResponse.json();
  }

  private getHeaders():
    | Headers
    | string[][]
    | Record<string, string>
    | undefined {
    if (this.token === "") {
      return {
        "Content-Type": "application/json",
      };
    }
    return {
      "Content-Type": "application/json",
    };
  }
}
export const apiService = ApiService.getInstance();
