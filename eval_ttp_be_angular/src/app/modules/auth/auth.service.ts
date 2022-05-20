import { HomeDataResponse } from './../../models/home-data-test';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';
import {
  VerifyPermissionsReq,
  VerifyPermissionsRes,
} from './../../models/login/verifyPermissionsModel';
import {
  GetERPAccessTokenReq,
  GetERPAccessTokenRes,
} from 'src/app/models/login/getERPAccessTokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getERPAccessToken(
    reqBody: GetERPAccessTokenReq
  ): Observable<ApiResponse<GetERPAccessTokenRes>> {
    return this.post<GetERPAccessTokenRes>('ERP010101', reqBody, '/EB00');
  }

  verifyPermissions(
    reqBody: VerifyPermissionsReq
  ): Observable<ApiResponse<VerifyPermissionsRes>> {
    return this.post<VerifyPermissionsRes>('EB000101', reqBody, '/EB00');
  }
}
