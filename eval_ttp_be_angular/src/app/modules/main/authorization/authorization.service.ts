import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/base/base.service';
import { Observable } from 'rxjs';
import { RoleDataReq, RoleDataRes } from 'src/app/models/ui-data';
import { ApiResponse } from 'src/app/models/api-response';
import { HttpClient } from '@angular/common/http';

/** 可執行指令npm run mock-api on http://localhost:3000 */
@Injectable({
  providedIn: 'root',
})
export class ManageService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  addRole(data: RoleDataReq): Observable<ApiResponse<RoleDataRes>> {
    return this.post<RoleDataRes>('/roles', data);
  }
  getRoles(): Observable<ApiResponse<RoleDataRes[]>> {
    return this.get<RoleDataRes[]>('/roles');
  }
}
