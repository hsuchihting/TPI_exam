// 查詢Email範本清單
export interface GetEmailTemplateList{
  etTypeCode?: string,
  pageNum: number,
  pageSize: number,
}

export interface GetEmailTemplateListRes{
  pageData?: EmailTmplDTO[],
  totalPages: number
}

export interface EmailTmplDTO{
  etSeq: number;
  etName: string;
  etType: string;
}

// 查詢Email範本
export interface GetEmailTemplate{
  etSeq: number,
  isEdit: boolean
}

export interface GetEmailTemplateRes{
  etSeq: number;
  etName: string;
  etTypeCode: string;
  subject: string;
  etContent: string;
}

//新增Email範本
export interface AddEmailTemplate{
  etName: string;
  etTypeCode: string;
  subject: string;
  etContent: string;
  imgName?: string[];
}

export interface AddEmailTemplateRes{
  etName: string;
  etTypeCode: string;
  subject: string;
  etContent: string;
  imgName?: string[];
}

//Email範本上傳圖片(新增)
export interface UploadAddEmailTemplateImg{
  etTypeCode: string,
  file: File
}

export interface UploadAddEmailTemplateImgRes{
  imgUrl: string
}

//編輯Email範本
export interface EditEmailTemplate{
  etSeq: number,
  etName: string,
  etTypeCode: string,
  subject: string,
  etContent: string,
  imgName?: string[]
}

//Email範本上傳圖片(編輯)
export interface UploadEditEmailTemplateImg{
  etSeq: number,
  file: File
}

export interface UploadEditEmailTemplateImgRes{
  imgUrl: string,
}

//刪除Email範本
export interface DeleteEmailTemplate{
  etSeq: number
}
