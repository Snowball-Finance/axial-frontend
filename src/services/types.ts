export enum RequestTypes {
  PUT = "PUT",
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
}
export interface RequestParameters {
  requestType: RequestTypes;
  url: string;
  data: any;
  isRawUrl?: boolean;
  requestName?: string;
}

export interface StandardResponse {
  status: boolean;
  message: string;
  data: any;
  token?: string;
}

export enum UploadUrls {
  USER_PROFILE_IMAGE = "user-profile-image/upload",
}
