import { NavItem } from 'src/app/common/components/sidenav/nav-item';

export interface VerifyPermissionsReq {
  token: string;
  type: string;
  empCode?: string;
  userEmail: string;
}

export interface VerifyPermissionsRes {
  accessToken: string;
  tokenType: string;
  expiresIn: string; //token 有效時間
  roleFunction: RoleFunction[]; //使用者角色權限
}

export interface RoleFunction {
  mainMenu: string;
  mainMenuName: string;
  subMenu: subMenu[];
}

export interface subMenu {
  funcId: string; //功能類型及檢視功能權限代碼
  funcName: string;
  function: Function[]; //功能按鈕權限
  route?: string;
}

export interface Function {
  funcId: string;
  funcName: string;
}

export interface access_token {
  empCode: string;
  empName: string;
  empEnName: string;
  empEmail: string;
  scope: string;
  exp: string; //Token有效時間
  jti: string; //JWT ID
}
