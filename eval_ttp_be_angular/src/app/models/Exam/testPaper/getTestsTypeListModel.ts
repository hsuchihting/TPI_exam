export interface GetTestsTypeListReq {
  testsTypeStatus: string;
}

export interface GetTestsTypeListRes {
  testsSelectList: TestsTypeSelect[];
}

export interface TestsTypeSelect {
  testsType: string;
  testsTypeName: string;
}
