export interface GetTestsAddReq{
  testsId: string,
  testsStatus: string
}

export interface GetTestsAddRes{
  testsSelect: TestsSelect[] ;
}

export interface TestsSelect{
  testsId: string;
  testsType: string;
  testsTypeName: string;
  testsName: string;
  testDTime: string;
  testHTime: string;
  testMTime: string;
}
