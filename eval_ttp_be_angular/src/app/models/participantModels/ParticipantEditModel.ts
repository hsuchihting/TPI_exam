//查詢受測者細項資料
export interface OriTesterReq {
  testerId: string;
}
export interface OriTesterRes {
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
  carrier: Carrier[];
  testsGroup: TestsGroup[];
  title: Title[];
  td: Td[];
  testerET: TesterET[];
  interviewerET: InterviewerET[];
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

export interface Interviewer {
  interviewerId: string;
  interviewerName: string;
  interviewerEnName: string;
  interviewerEmail: string;
}

//編輯受測者
export interface EditTesterReq {
  testerId: string;
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
