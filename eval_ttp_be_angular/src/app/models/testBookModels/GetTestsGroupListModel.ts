export interface GetTestsGroupListReq{
  testsGroupName?: string;
  status: string;
  pageSize: number;
  pageNum: number;
}

export interface GetTestsGroupListRes{
  totalPages: number;
  pageData: TestsGroup[];
}

export interface TestsGroup{
  testsGroupId: string;
  testsGroupName: string;
  createDate: string;
  status: string;
  action: string;
}
