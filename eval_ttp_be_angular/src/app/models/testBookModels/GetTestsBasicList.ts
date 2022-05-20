export interface GetTestsBasicListReq{
  testsType?: string,
  testsStatus: string
}

export interface GetTestsBasicListRes{
  testsBasicList: TestsBasic[]
}

export interface TestsBasic{
  testsId: string,
  testsName: string
}
