//查詢新增受測者初始化資料
export interface TesterInitRes {
  carrier: Carrier[];
  testsGroup: TestsGroup[];
  title: Title[];
  td: Td[];
  testerEt: TesterET[];
  interviewerEt: InterviewerET[];
  hrET: HrET[];
}

export interface Carrier {
  carrierPmSeq: string;
  carrierPmName: string;
}

export interface TestsGroup {
  testsGroupSeq: string;
  testsGroupName: string;
}

export interface Title {
  titlePmSeq: string;
  titlePmName: string;
}

export interface Td {
  tdSeq: string;
  tdName: string;
}
export interface TesterET {
  testerEtSeq: string;
  testerEtName: string;
}

export interface InterviewerET {
  interviewerEtSeq: string;
  interviewerEtName: string;
}

export interface HrET {
  hrEtSeq: string;
  hrEtName: string;
}

//新增受測者
export interface AddTesterReq {
  testerName: string;
  testerEmail: string;
  education: string;
  testerDepartment: string;
  testEndDate: string;
  testEndDayNotify: string;
  carrierPmSeq: string;
  testsGroupSeq: string;
  interviewer: Interviewer[];
  titlePmSeq: string;
  departent: string;
  tdSeq: string;
  testerEtSeq: string;
  interviewerEtSeq: string;
  hrEtSeq: string;
}

export interface Interviewer {
  interviewerId: string;
  interviewerName: string;
  interviewerEnName: string;
  interviewerEmail: string;
}
