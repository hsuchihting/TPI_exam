export interface GetTestsGroupReq{
  testsGroupId: string;
}

export interface GetTestsGroupRes{
  testsGroupId: string;
  testsGroupName: string;
  updateDatetime?: string;
  action: string;
  updateEmail?: string;
  updateUserName?: string;
  testsSelectList: TestsSelect[];
}
 export interface TestsSelect{
  testsId: string;
  testsType: string;
  testsTypeName: string;
  testsName: string;
  testDTime?: string;
  testHTime?: string;
  testMTime?: string;
 }
