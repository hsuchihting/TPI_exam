import { HomeDataResponse } from './../../models/home-data-test';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/base/base.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/api-response';
import { Observable } from 'rxjs';
import { LoginReq, LoginRes } from 'src/app/models/loginModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(reqBody: LoginReq): Observable<ApiResponse<LoginRes>> {
    return this.post<LoginRes>('EF010101', reqBody);
  }
}
