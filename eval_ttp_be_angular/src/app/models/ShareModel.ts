//EB010101 getERPEmpByDepId
export interface ERPEmpReqBody {
  depId: string;
}

export interface ERPEmpResBody {
  depId: string;
  depName: string;
  depEmp: DepEmp[];
}

export interface DepEmp {
  empCode: string;
  empName: string;
  empEngName: string;
  empEmail: string;
}
//EB010102: 取得組織表 getERPDep
export interface ERPDepResBody {
  dep: Dep[];
}

export interface Dep {
  depId: string;
  depName: string;
}

//EB010103 getParams
export interface ParamsReqBody {
  funcCode: string;
}

export interface ParamsResBody {
  paramList: FuncParam[];
}

export interface FuncParam {
  typeCode: string;
  paramList: Param[];
}

export interface Param {
  paramCode: string;
  paramName: string;
}
