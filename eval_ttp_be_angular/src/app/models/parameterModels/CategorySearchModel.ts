export interface CategorySearchDataReq {
  stName?: string;
  pageNum: number;
  pageSize: number;
}

export interface CategorySearchDataRes  {
  pageData?: SubjectTypeDTO[];
  totalPages: number;
}

export interface SubjectTypeDTO{
  stId: number;
  stNameCh: string;
  stNameEn: string;
  editable: boolean;
}
