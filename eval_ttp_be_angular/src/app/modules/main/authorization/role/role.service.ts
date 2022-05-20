import { ERPDepResBody, ERPEmpReqBody } from './../../../../models/ShareModel';
import {  AddRoleResBody, RoleDataReq, RoleDataRes, RoleModel } from './../../../../models/RoleModel';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { RoleViewModel } from './role.view-model';
import { BaseService } from 'src/app/common/base/base.service';
import { ApiResponse } from 'src/app/models/api-response';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { ERPEmpResBody } from 'src/app/models/ShareModel';
import { AddRoleReqBody} from 'src/app/models/RoleModels/Add-RoleModel';
import { EditFuncReqBody, EditRoleReqBody } from 'src/app/models/RoleModels/Edit-RoleModel';
import { AuthReqBody, AuthResBody, FunctionReqBody, FunctionResBody, MemberReqBody, MemberResBody, RoleReqBody, RoleResBody } from 'src/app/models/RoleModels/Search-RoleModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService{

  // getRoles() {
  //   throw new Error('Method not implemented.');
  // }



  constructor(http: HttpClient) {
    super(http);

    // this.options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    //   responseType: 'json',
    // };
  }

//------------------------db------------------------------------

  /** 取得所有資料 */
  getAllData(): Observable<ApiResponse<RoleDataRes[]>> {
    return this.get<RoleDataRes[]>('/roles');
  }
/** 取得現有功能  EB020103: 查詢現有功能*/
  getAuthNameData(): Observable<ApiResponse<FunctionResBody[]>> {
    return this.get<FunctionResBody[]>('/totalAuthFunc');
  }

  /**取得角色功能權限  EB020105: 查詢角色功能權限 */
  getAuthFuncRes(): Observable<ApiResponse<FunctionResBody[]>> {
    return this.get<FunctionResBody[]>('/authFuncRes');
  }

  /** 新增單一筆資料 */
  insertData(data: RoleDataReq): Observable<ApiResponse<RoleDataRes>> {
    return this.post<RoleDataRes>('/roles', data);
  }

  /**新增角色權限 */
  insertAuthData(data: AddRoleReqBody): Observable<ApiResponse<AddRoleReqBody>> {
    return this.post<AddRoleReqBody>('/insertAuthFunc', data);
  }
/**更新角色權限 */
  updateAuthData(request: EditFuncReqBody, roleName: string) {
    return this.post<EditFuncReqBody>('/modifyAuthFunc',roleName);
  }
  // getListRoleData(): Observable<ApiResponse<MemberResBody[]>> {
  //   return this.get<RoleDataRes[]>('/listRoles');
  // }

  /**ShareModel取得 ERP員工資料*/
  getDepData(): Observable<ApiResponse<ERPDepResBody[]>> {
    return this.get<ERPDepResBody[]>('/ERPEmpResBody');
  }

  //未授權員工 getUnAuthEmpByDepId
  getUnselectEmpData(): Observable<ApiResponse<AuthResBody[]>>{
    return this.get<AuthResBody[]>('/ERPEmpResBody');
  }

  /**getMemberByRoleSeq EB020102 取得授權人員*/
  getSelectEmpData(): Observable<ApiResponse<MemberResBody[]>> {
    return this.get<MemberResBody[]>('/roles');
  }


  insertEmpData(data: ERPEmpReqBody): Observable<ApiResponse<ERPEmpResBody>> {
    return this.post<ERPEmpResBody>('/ERPEmpResBody', data);
  }

  //-----------------------API--------------------------------------------------


  //EB010102: 取得組織表  getERPDep 無req
  getERPDep(reqBody: null): Observable<ApiResponse<ERPDepResBody>> {
    return this.post<ERPDepResBody>('EB010102', reqBody,  '/EB01');
  }

  //EB020101: 查詢所有角色成員 getRoleByRoleName
  getRoleByRoleName(reqBody: RoleReqBody): Observable<ApiResponse<RoleResBody>> {
    return this.post<RoleResBody>('EB020101', reqBody, '/EB02');
  }

  //EB020102: 查詢所有角色成員 getMemberByRoleSeq
  getMemberByRoleSeq(reqBody: MemberReqBody): Observable<ApiResponse<MemberResBody>> {
    return this.post<MemberResBody>('EB020102', reqBody, '/EB02');
  }

  //EB020103: 查詢現有功能 getAllFunction 無reqBody
  getAllFunction(reqBody: null): Observable<ApiResponse<FunctionResBody>> {
    return this.post<FunctionResBody>('EB020103', reqBody, '/EB02');
  }

  //EB020104: 查詢未授權員工 getUnAuthEmpByDepId
  getUnAuthEmpByDepId(reqBody: AuthReqBody): Observable<ApiResponse<AuthResBody>> {
    return this.post<AuthResBody>('EB020104', reqBody, '/EB02');
  }

  //EB020105: 查詢角色功能權限 getRoleFunctionByRoleSeq
  getRoleFunctionByRoleSeq(reqBody: FunctionReqBody): Observable<ApiResponse<FunctionResBody>> {
    return this.post<FunctionResBody>('EB020105', reqBody, '/EB02');
  }

  //EB020201: 新增角色 addRole 無resBody
  addRole(reqBody: AddRoleReqBody): Observable<ApiResponse<AddRoleReqBody>> {
    return this.post<AddRoleReqBody>('EB020201', reqBody, '/EB02');
  }

  //EB020301: 編輯角色成員 editRoleMemberByRoleSeq 無resBody
  editRoleMemberByRoleSeq(reqBody: EditRoleReqBody): Observable<ApiResponse<EditRoleReqBody>> {
    return this.post<EditRoleReqBody>('EB020301', reqBody, '/EB02');
  }
  //EB020302: 編輯角色功能 editRoleFuncByRoleSeq 無resBody
  ditRoleFuncByRoleSeq(reqBody: EditFuncReqBody): Observable<ApiResponse<EditFuncReqBody>> {
    return this.post<EditFuncReqBody>('EB020302', reqBody, '/EB02');
  }


}






