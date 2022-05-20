export interface GetERPAccessTokenReq {
  staffsNo: string; //員工編號
  token: string;
}

export interface GetERPAccessTokenRes {
  success: string;
  message: string;
  total: string;
  data: data;
}

export interface data {
  url: string;
}
