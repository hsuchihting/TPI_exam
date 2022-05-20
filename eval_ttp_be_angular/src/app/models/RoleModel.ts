export interface RoleModel {
  roleName: string;
  editer?: string;
  editDate?: string;
  authName?: string;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  view?: boolean;
  department?: string;
  name?: string;
  account?: string;
}

export interface ListRoleModle{
  roleName?: string;
  department?: string;
  name?: string;
  account?: string;
}

// export interface AddRoleModel {
//   roleName: string;
//   authName: string;
//   add: boolean;
//   edit: boolean;
//   delete: boolean;
//   view: boolean;
// }

export class RoleDataRes  {
  roleName?: string;
  authName?: string;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  view?: boolean;
  department?: string;
  name?: string;
  account?: string;
}

export class RoleDataReq  {
  roleName?: string;
  authName?: string;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  view?: boolean;
  department?: string;
  name?: string;
  account?: string;
}

//for db.json
export interface AddRoleResBody {
  roleName: string;
  funcId: string[];
}

