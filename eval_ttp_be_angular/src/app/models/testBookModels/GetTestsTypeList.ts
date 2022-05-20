export interface GetTestsTypeListReq{
  testsTypeStatus: string
}

export interface TestsTypeStatusRes{
  testsTypeList: TestsTypeSelect[]
}

export interface TestsTypeSelect{
  testsType: string,
  testsTypeName: string
}
