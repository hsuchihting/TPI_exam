// 新增隱私政策
export interface AddPrivacyPolicy{
  contentCh: string,
  contentEn?: string
}

// 查詢隱私政策清單

export interface GetPrivacyPolicyList{
  pageNum: number,
  pageSize: number
}

export interface GetPrivacyPolicyListRes{
  pageData?: PrivacyPolicyDTO[],
  totalPages: number
}

export interface PrivacyPolicyDTO{
  ppId: string,
  statusCode: string,
  updateTime: string
}

// 查詢隱私權政策
export interface GetPrivacyPolicy{
  ppId: string
}

export interface GetPrivacyPolicyRes{
  ppId: string,
  statusCode: string,
  contentCh: string,
  contentEn?: string
}

// 編輯隱私權政策

export interface EditPrivacyPolicy{
  ppId: string,
  contentCh: string,
  contentEn?: string
}

// 編輯隱私權政策狀態

export interface EditPrivacyPolicyStatus{
  ppId: string
}

// 刪除隱私政策

export interface DeletePrivacyPolicy{
  ppId: string
}
