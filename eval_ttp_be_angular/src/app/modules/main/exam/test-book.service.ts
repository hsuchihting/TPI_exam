import { ApiResponse } from './../../../models/api-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/base/base.service';
import { GetTestsGroupListReq, GetTestsGroupListRes } from 'src/app/models/testBookModels/GetTestsGroupListModel';
import { GetTestsGroupReq, GetTestsGroupRes } from 'src/app/models/testBookModels/GetTestsGroupModel';
import { GetTestsReq, GetTestsRes } from 'src/app/models/testBookModels/GetTestsModel';
import { AddTestGroupReq } from 'src/app/models/testBookModels/AddTestGroupModel';
import { EditTestGroupReq } from 'src/app/models/testBookModels/EditTestGroupModel';
import { EditTestGroupStatusReq } from 'src/app/models/testBookModels/EditTestGroupStatusModel';
import { DeleteTestGroupReq } from 'src/app/models/testBookModels/DeleteTestGroupModel';
import { GetTestsAddReq, GetTestsAddRes } from 'src/app/models/testBookModels/GetTestsAdd';
import { GetTestsTypeListReq, TestsTypeStatusRes } from 'src/app/models/testBookModels/GetTestsTypeList';
import { GetTestsBasicListReq, GetTestsBasicListRes } from 'src/app/models/testBookModels/GetTestsBasicList';

@Injectable({
  providedIn: 'root'
})
export class TestBookService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  /** 查詢題本清單 */
  getTestsGroupList(reqBody: GetTestsGroupListReq):
    Observable<ApiResponse<GetTestsGroupListRes>> {
      return this.post<GetTestsGroupListRes>('EB080101',reqBody,'/EB08')
  }
  /** 查詢題本 */
  getTestsGroup(reqBody: GetTestsGroupReq): Observable<ApiResponse<GetTestsGroupRes>>{
    return this.post<GetTestsGroupRes>('EB080102',reqBody,'/EB08')
  }
  /** 查詢試卷 */
  getTests(reqBody: GetTestsReq): Observable<ApiResponse<GetTestsRes>>{
    return this.post<GetTestsRes>('EB080103',reqBody,'/EB08')
  }
  /** 查詢試卷新增 */
  getTestsAdd(reqBody: GetTestsAddReq): Observable<ApiResponse<GetTestsAddRes>>{
    return this.post<GetTestsAddRes>('EB080104', reqBody, '/EB08')
  }
  /** 查詢題目類別清單 */
  getTestsTypeList(reqBody: GetTestsTypeListReq): Observable<ApiResponse<TestsTypeStatusRes>>{
    return this.post<TestsTypeStatusRes>('EB080105', reqBody,'/EB08')
  }
  /** 查詢試卷基本資料清單 */
  getTestsBasicList(reqBody: GetTestsBasicListReq): Observable<ApiResponse<GetTestsBasicListRes>>{
    return this.post<GetTestsBasicListRes>('EB080106', reqBody, '/EB08')
  }
  /** 新增題本 */
  addTestGroup(reqBody: AddTestGroupReq): Observable<ApiResponse<AddTestGroupReq>>{
    return this.post<AddTestGroupReq>('EB080201',reqBody,'/EB08')
  }
  /** 編輯題本 */
  editTestGroup(reqBody: EditTestGroupReq): Observable<ApiResponse<EditTestGroupReq>>{
    return this.post<EditTestGroupReq>('EB080301',reqBody,'/EB08')
  }
  /** 編輯題本狀態 */
  editTestGroupStatus(reqBody: EditTestGroupStatusReq): Observable<ApiResponse<EditTestGroupStatusReq>>{
    return this.post<EditTestGroupStatusReq>('EB080302',reqBody,'/EB08')
  }
  /** 刪除題本 */
  deleteTestGroup(reqBody: DeleteTestGroupReq): Observable<ApiResponse<DeleteTestGroupReq>>{
    return this.post<DeleteTestGroupReq>('EB080401',reqBody,'/EB08')
  }
}
