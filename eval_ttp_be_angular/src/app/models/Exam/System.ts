// 查詢系統說明清單

export interface GetSystemDescList{
  pageNum: number,
  pageSize: number
}

export interface GetSystemDescListRes{
  pageData?: SysDescDTO[],
  totalPages: number
}

export interface SysDescDTO{
  sdId: string,
  statusCode: string,
  updateTime: string
}

// 查詢系統說明

export interface GetSystemDesc{
  sdId: string,
  isEdit: boolean
}

export interface GetSystemDescRes{
  sdId: string,
  statusCode: string,
  contentCh: string,
  contentEn?: string
}

// 編輯系統說明

export interface EditSystemDesc{
  sdId: string,
  contentCh: string,
  contentEn?: string
}

// 編輯系統說明狀態
export interface EditSystemDescStatus{
  sdId: string
}

// 刪除系統說明

export interface DeleteSystemDesc{
  sdId: string
}
