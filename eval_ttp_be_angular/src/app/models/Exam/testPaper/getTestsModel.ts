export interface GetTestsReq {
  testsId: string; //試卷編號
}

export interface GetTestsRes {
  testsId: string; //試卷編號
  testsTypeName: string;
  testsName: string;
  testDTime: string; //施測時間(日)
  testHTime: string; //施測時間(時)
  testMTime: string; //施測時間(分)
  remindTime: string; //提醒時間
  memo?: string;
  updateDatetime?: string; //YYYY/MM/DD HH:MI
  updateEmail?: string;
  updateUserName?: string;
  isEdit:string;
  viewTestsQuList: ViewTestsQuList[]; //試卷題目清單
}

export interface ViewTestsQuList {
  testsQuId: string; //試卷題目編號
  testsQuType: string;
  testsQuDesc?: string;
  testsQuImgDTO: TestsQuImg ;
  viewTestsQuOptionsList: ViewTestsQuOptions[];
}

export interface ViewTestsQuOptions {
  testsQuOptionsId: string;
  testsQuOptionsDesc?: string;
  testsQuOptionsImg: TestsQuOptionsImg;
  isTestsQuAns: string;
}

export interface TestsQuImg {
  name: string;
  url: string;
}

export interface TestsQuOptionsImg {
  name: string;
  url: string;

}
