export interface EmploymentSearchDataReq {
  esName?: string;
  pageNum: number;
  pageSize: number;
}

export interface EmploymentSearchDataRes  {
  pageData?: EmploymentStatusDTO[];
  totalPages: number;
}

export interface EmploymentStatusDTO{
  esId: number;
  esName: string;
  deletable: boolean;
}
