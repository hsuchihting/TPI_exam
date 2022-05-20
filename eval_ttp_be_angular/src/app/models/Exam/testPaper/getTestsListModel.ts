export interface GetTestsListReq {
  testsType?: string;
  testsName?: string;
  status?: string;
  memo?: string;
  pageSize: number;
  pageNum: number;
}

export interface GetTestsListRes {
  totalPages: number;
  pageData: Tests[];
}

export interface Tests {
  testsType: string;
  testsTypeName:string;
  testsId: string;
  testsName: string;
  memo: string;
  createDate: string;
  status: string;
  isEdit:string;
  isDelete:string;
}
