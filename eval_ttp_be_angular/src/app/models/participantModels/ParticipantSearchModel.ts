//查詢受測者
export interface TesterListReq {
  pageSize: number;
  pageNum: number;
  isDesc: string;
  testerName?: string;
  testerEmail?: string;
  notify  ?: string;
  testEndDateStart?: string;
  testEndDateEnd?: string;
  depId?: string;
}

export interface TesterListRes {
  totalPages: number;
  pageData: TesterList[];
}

export interface TesterList {
  testerName: string;
  testerId: string;
  depName: string;
  testsGroupSeq: string;
  testsGroupName: string;
  testerNotify: string;
  testEndDate: string;
  depTrueName:string;
}

//查詢受測者寄送狀態
export interface TesterNotifyReq {
  pageSize: number;
  pageNum: number;
  testerId: string;
}

export interface TesterNotifyRes {
  totalPages: number;
  pageData: TesterNotifyList[];
}

export interface TesterNotifyList {
  testerName: string;
  testerEmail: string;
  depName: string;
  testsGroupSeq: string;
  testsGroupName: string;
  notifyDate: string;
  notifyIsSuccess: string;
  notifyName:string;
  depTrueName:string;
}

//查詢受測者Email範本
export interface TesterEmailTemplateReq {
  etSeq: number;
  isEdit: boolean;
}

export interface TesterEmailTemplateRes {
  etSeq: number;
  etName: string;
  etTypeCode: string;
  subject: string;
  etContent: string;
}

//查詢受測者測試說明
export interface TesterTestDescReq {
  testerId?: string;
  tdSeq: number;
  isEdit: boolean;
}

export interface TesterTestDescRes {
  tdSeq: number;
  tdName: string;
  statusCode: string;
  contentCh: string;
  contentEn: string;
  tbContentList: TbContent[];
}

export interface TbContent {
  stNameCh: string;
  stNameEn: string;
  testTime: string;
}

//匯出受測者寄送資料excel
export interface TestsNotifyReq {
  testerId: string;
}

//查詢受測者題本
export interface TesterTestGroupReq {
  testsGroupSeq: string;
}

export interface TesterTestGroupRes {
  testsGroupId: string;
  testsGroupName: string;
  updateDatetime: string;
  updateUser: string;
  testsSelectList: TestsSelect[];
}

export interface TestsSelect {
  testsId: string;
  testsType: string;
  testsTypeName: string;
  testsName: string;
  testDTime: string;
  testHTime: string;
  testMTime: string;
}

//發送測試通知信
export interface SendTestNoticeEmailReq {
  testerId: string;
}
