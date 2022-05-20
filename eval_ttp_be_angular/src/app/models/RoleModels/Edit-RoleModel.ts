//EB020301: 編輯角色成員 editRoleMemberByRoleSeq 無resBody
export interface EditRoleReqBody {
  roleSeq: string;
  roleName: string;
  member: Member[];
}

export interface Member {
  empId: string;
  empName: string;
  empEnName: string;
  empEmail: string;
}

//EB020302: 編輯角色功能 editRoleFuncByRoleSeq 無resBody
export interface EditFuncReqBody {
  roleSeq: string;
  roleName: string;
  funcId: string[];
}
