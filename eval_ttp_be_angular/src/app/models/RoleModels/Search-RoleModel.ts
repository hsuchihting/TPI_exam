// EB020101: 查詢角色清單 getRoleByRoleName
export interface RoleReqBody {
  pageSize: number;
  pageNum: number;
  roleName?: string;
}

export interface RoleResBody {
  totalPages: number;
  pageData: Role[];
}

export interface Role {
  roleSeq: string;
  roleName: string;
  roleLastEdit: string;
  roleLastEditName: string;
  roleLastEditDate: string;
}

//EB020102：查詢所有角色成員 getMemberByRoleSeq
export interface MemberReqBody {
  roleSeq: string;
}

export interface MemberResBody {
  member: Member[];
}

export interface Member {
  empId: string;
  empName: string;
  empEnName: string;
  empEmail: string;
  empDep?: string;
  empDepName?: string;
}

//EB020103: 查詢現有功能 getAllFunction 無reqBody
export interface FunctionResBody {
  functionType: FunctionType[];
}

export interface FunctionType {
  funcId: string;
  funcName: string;
  authName?: string;
  function: Function[];
}

export interface Function {
  funcId: string;
  funcName: string;
  value?: boolean;
  sort?: number;
}

//EB020104: 查詢未授權員工 getUnAuthEmpByDepId
export interface AuthReqBody {
  depId: string;
}

export interface AuthResBody {
  member: Member[];
}

export interface Member {
  empId: string;
  empName: string;
  empEnName: string;
  empEmail: string;
  value?: boolean;
}

//EB020105: 查詢角色功能權限 getRoleFunctionByRoleSeq
export interface FunctionReqBody {
  roleSeq: string;
}

export interface FunctionResBody {
  functionType: FunctionType[];
}
//公用
// export interface FunctionType{
//   funcId: string;
//   funcName: string;
//   function: Function[];
// }

// export interface Function{
//   funcId: string;
//   funcName: string;
// }
