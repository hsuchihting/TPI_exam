//查詢受測結果
export interface TesterResultReq {
  pageSize:number;
  pageNum:number;
  isDesc:string;
  testerName:string;
  testerEmail:string;
  titlePmSeq:string;
  testStatus:string;
  testEndDateStart:string;
  testEndDateEnd:string;
  depId:string;
  testsGroupSeq:string;
  hrId:string;
}

export interface TesterResultRes {
  totalPages: number;
  pageData: TesterResult[];
}
export interface TesterResult {
  testerId: string;
  testerName: string;
  testerEmail: string;
  testsGroupSeq: string;
  testsGroupName: string;
  testStatus: string;
  createUser: string;
  testEndDate: string;
  departent: string;
  titleNameCh: string;
  testStatusName:string;
  createUserName:string;
  departentName:string;
}

//查詢受測題本結果
export interface TesterSheetResultReq {
  testerId: string;
}
export interface TesterSheetResultRes {
  test: Test[];
}
export interface Test {
  testSeq: string;
  testName: string;
  lastTestDate: string;
  testQty: string;
  testsUpload: string;
  testsPdf: string;
  testsExcel:string;
}

//初始化查詢受測結果
export interface InitGetTesterResultRes {
  hr: Hr[];
  testsGroup: TestsGroup[];
  title: Title[];
}
export interface Hr {
  empId: string;
  empName: string;
}
export interface TestsGroup {
  testsGroupSeq: string;
  testsGroupName: string;
}

export interface Title {
  titlePmSeq: string;
  titlePmName: string;
}

//下載測驗結果EXCEL
export interface DowlandTesterResultReq {
  testerId: string;
  testsGroupSeq: string;
  testSeq: string;
  type: string;
}
export interface DowlandTesterResultRes {
  size: number;
  type: string;
}
