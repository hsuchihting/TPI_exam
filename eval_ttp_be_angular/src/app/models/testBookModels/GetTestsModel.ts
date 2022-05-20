export interface GetTestsReq{
  testsId: string;
}

export interface GetTestsRes{
  testsId: string;
  testsTypeName: string;
  testsName: string;
  testDTime: string;
  testHTime: string;
  testMTime: string;
  remindTime: string;
  memo?: string;
  updateEmail?: string;
  updateDatetime?: string;
  updateUserName?: string;
  viewTestsQuList: ViewTestsQu[];
}

export interface ViewTestsQu{
  testsQuId?: string;
  testsQuType: string;
  testsQuDesc?: string;
  testsQuImg?: TestsQuImg;
  viewTestsQuOptionsList?: ViewTestsQuOptions[]
}

export interface ViewTestsQuOptions{
  testsQuOptionsId: string;
  testsQuOptionsDesc?: string;
  testsQuOptionsImg?: TestsQuOptionsImg;
  isTestsQuAns: string;
}

export interface TestsQuImg{
  name: string;
  url: string;
}

export interface TestsQuOptionsImg{
  name: string;
  url: string;
}
