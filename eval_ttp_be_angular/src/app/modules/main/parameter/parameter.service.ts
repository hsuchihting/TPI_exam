import { PositionDeleteDataReq } from './../../../models/parameterModels/PositionDeleteModel';
import { PositionEditDataReq } from './../../../models/parameterModels/PositionEditModel';
import { EmploymentEditDataReq } from './../../../models/parameterModels/EmploymentEditModel';
import { EmploymentDeleteDataReq } from './../../../models/parameterModels/EmploymentDeleteModel';
import { EmploymentSearchDataReq } from './../../../models/parameterModels/EmploymentSearchModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/base/base.service';
import { ApiResponse } from 'src/app/models/api-response';
import { EmploymentSearchDataRes } from '../../../models/parameterModels/EmploymentSearchModel';
import { CategoryAddDataReq } from '../../../models/parameterModels/CategoryAddModel';
import { EmploymentAddDataReq } from '../../../models/parameterModels/EmploymentAddModel';
import { PositionAddDataReq } from 'src/app/models/parameterModels/PositionAddModel';
import { PositionSearchDataReq, PositionSearchDataRes } from 'src/app/models/parameterModels/PositionSearchModel';
import { CategorySearchDataReq, CategorySearchDataRes } from 'src/app/models/parameterModels/CategorySearchModel';
import { CategoryDeleteDataReq } from 'src/app/models/parameterModels/CategoryDeleteModel';
import { CategoryEditDataReq } from 'src/app/models/parameterModels/CategoryEditModel';


@Injectable({
  providedIn: 'root',
})
export class ParameterService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  /** 新增題目類別 */
  addCategory(
    reqBody: CategoryAddDataReq
  ): Observable<ApiResponse<CategoryAddDataReq>> {
    return this.post<CategoryAddDataReq>('EB100201', reqBody, '/EB10');
  }
  /** 取得全部題目類別資料 */
  getCategory(reqBody: CategorySearchDataReq): Observable<ApiResponse<CategorySearchDataRes>> {
    return this.post<CategorySearchDataRes>('EB100101',reqBody,'/EB10');
  }
  /** 編輯題目類別資料 */
  editCategory(
    reqBody: CategoryEditDataReq
  ): Observable<ApiResponse<CategoryEditDataReq>> {
    return this.post<CategoryEditDataReq>('EB100301', reqBody, '/EB10');
  }
  /** 刪除題目類別資料 */
  deleteCategory(reqBody: CategoryDeleteDataReq):Observable<ApiResponse<CategoryDeleteDataReq>>{
    return this.post<CategoryDeleteDataReq>('EB100401', reqBody, '/EB10')
  }
  /** 新增職務別*/
  addPosition(
    reqBody: PositionAddDataReq
  ): Observable<ApiResponse<PositionAddDataReq>> {
    return this.post<PositionAddDataReq>('EB110201', reqBody, '/EB11');
  }
  /** 取得全部職務別資料 */
  getPosition(reqBody: PositionSearchDataReq): Observable<ApiResponse<PositionSearchDataRes>> {
    return this.post<PositionSearchDataRes>('EB110101', reqBody, '/EB11');
  }
  /** 編輯職務別資料 */
  editPosition(
    reqBody: PositionEditDataReq
  ): Observable<ApiResponse<PositionEditDataReq>> {
    return this.post<PositionEditDataReq>('EB110301', reqBody, '/EB11');
  }
  /** 刪除職務別資料 */
  deletePosition(reqBody: PositionDeleteDataReq):Observable<ApiResponse<PositionDeleteDataReq>>{
    return this.post<PositionDeleteDataReq>('EB110401', reqBody, '/EB11')
  }
  /** 新增就業狀況*/
  addEmployment(
    reqBody: EmploymentAddDataReq
  ): Observable<ApiResponse<EmploymentAddDataReq>> {
    return this.post<EmploymentAddDataReq>('EB120201', reqBody, '/EB12');
  }
  /**取得全部就業狀況資料 */
  getEmployment(reqBody: EmploymentSearchDataReq): Observable<ApiResponse<EmploymentSearchDataRes>> {
    return this.post<EmploymentSearchDataRes>('EB120101', reqBody, '/EB12');
  }
  /** 編輯就業狀況資料 */
  editEmployment(
    reqBody: EmploymentEditDataReq
  ): Observable<ApiResponse<EmploymentEditDataReq>> {
    return this.post<EmploymentEditDataReq>('EB120301', reqBody, '/EB12');
  }
  /** 刪除就業狀況資料 */
  deleteEmployment(reqBody: EmploymentDeleteDataReq):Observable<ApiResponse<EmploymentDeleteDataReq>>{
    return this.post<EmploymentDeleteDataReq>('EB120401', reqBody, '/EB12')
  }
}
