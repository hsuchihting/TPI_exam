// 查詢測驗說明清單
export interface GetTestDescList{
  tdName?: string,
  pageNum: number,
  pageSize: number
}

export interface GetTestDescListRes{
  pageData: TestDescDTO[],
  totalPages: number
}

export interface TestDescDTO{
  tdSeq: number,
  tdName: string,
  statusCode: string,
  updateTime: string
}

// 查詢測驗說明
export interface GetTestDesc{
  testerId?: string,
  tdSeq: number,
  isEdit: boolean
}

export interface GetTestDescRes{
  tdSeq: number,
  tdName: string,
  statusCode: string,
  contentCh: string,
  contentEn?: string,
  tbContentList?: TbContent[]
}

export interface TbContent{
  stNameCh: string,
  stNameEn: string,
  testTime: string
}

// 新增測驗說明
export interface AddTestDesc{
  tdName: string,
  statusCode: string,
  contentCh: string,
  contentEn?: string
}

// 編輯測驗說明
export interface EditTestDesc{
  tdSeq: number,
  tdName: string,
  statusCode: string,
  contentCh: string,
  contentEn?: string
}

// 編輯測驗說明狀態
export interface EditTestDescStatus{
  tdSeq: number,
  statusCode: string
}

// 刪除測驗說明
export interface DeleteTestDesc{
  tdSeq: number,
}
