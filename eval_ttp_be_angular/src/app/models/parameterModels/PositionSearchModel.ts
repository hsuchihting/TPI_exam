export interface PositionSearchDataReq {
  titleName?: string;
  pageNum: number;
  pageSize: number;
}

export interface PositionSearchDataRes  {
  pageData?: TitleDTO[];
  totalPages: number;
}

export interface TitleDTO{
  titleId: number;
  titleNameCh: string;
  titleNameEn: string;
  editable: boolean;
}
