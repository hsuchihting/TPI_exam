export interface LoginReq {
  testerId: string;
  testerEmail: string;
  langTag: string;
}

export interface LoginRes {
  accessToken: string;
}
