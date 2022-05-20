export interface EditTestReq {
  testsId: string;
  testsType: string;
  testsName: string;
  testDTime: string;
  testHTime: string;
  testMTime: string;
  remindTime: string;
  memo: string;
  editTestsQuList: EditTestsQu[];
}

export interface EditTestsQu {
  testsQuId: string;
  testsQuType: string;
  testsQuDesc: string;
  testsQuImg: string;
  isEditTestsQuImg: string;
  editTestsQuOptionsList: EditTestsQuOptions[];
}

export interface EditTestsQuOptions {
  testsQuOptionsId: string;
  testsQuOptionsDesc: string;
  testsQuOptionsImg: File;
  isEditTestsQuOptionsImg: string;
  isTestsQuAns: string;
}

export interface EditTestTimeSelect {
  id: string;
  name: string;
}

export interface EditTestQuType {
  id: number;
  type: string;
  name: string;
}

export interface EditTestAnsGroup {
  answer: string;
  answerUpload: string;
  correctAns: boolean;
}
