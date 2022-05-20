export interface AddTestReq {
  testsType: string;
  testsName: string;
  testDTime?: string;
  testHTime?: string;
  testMTime?: string;
  remindTime: string;
  memo?: string;
  addTestsQuList: AddTestsQu[];
}

export interface AddTestsQu {
  testsQuType: string;
  testsQuDesc?: string;
  testsQuImg?: File;
  addTestsQuOptionsList?: AddTestsQuOptions[];
}

export interface AddTestsQuOptions {
  testsQuOptionsDesc?: string; //試卷題目編號
  testsQuOptionsImg?: File;
  isTestsQuAns: string;
}

export interface AddTestTimeSelect {
  id: string;
  name: string;
}

export interface AddTestQuType {
  id: number;
  type: string;
  name: string;
}
