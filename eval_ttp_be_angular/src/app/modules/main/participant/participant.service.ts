import { RoleReqBody } from './../../../models/RoleModels/Search-RoleModel';
import {
  AddTesterReq,
  TesterInitRes,
} from '../../../models/participantModels/ParticipantAddModel';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/common/base/base.service';
import { ApiResponse, ApiResponseDownload } from 'src/app/models/api-response';
import { OptionsModel } from 'src/app/models/OptionsModel';
import {
  SendTestNoticeEmailReq,
  TesterEmailTemplateReq,
  TesterEmailTemplateRes,
  TesterListReq,
  TesterListRes,
  TesterNotifyReq,
  TesterNotifyRes,
  TesterTestDescReq,
  TesterTestDescRes,
  TesterTestGroupReq,
  TesterTestGroupRes,
  TestsNotifyReq,
} from 'src/app/models/participantModels/ParticipantSearchModel';
import {
  DowlandTesterResultReq,
  DowlandTesterResultRes,
  InitGetTesterResultRes,
  TesterResultReq,
  TesterResultRes,
  TesterSheetResultReq,
  TesterSheetResultRes,
} from 'src/app/models/participantModels/TestResultModel';
import {
  EditTesterReq,
  OriTesterReq,
  OriTesterRes,
} from 'src/app/models/participantModels/ParticipantEditModel';
import { DeleteTesterReq } from 'src/app/models/participantModels/ParticipantDelModel';
import { ERPDepResBody, ERPEmpReqBody, ERPEmpResBody } from 'src/app/models/ShareModel';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  //================================= 共用 ===========================================
  //查詢在職員工
  getERPEmpByDepId(
    reqBody: ERPEmpReqBody
  ): Observable<ApiResponse<ERPEmpResBody>> {
    return this.post<ERPEmpResBody>('EB010101', reqBody, '/EB01');
  }
  //查詢ERP組織表
  getERPDep(
    reqBody: null
  ): Observable<ApiResponse<ERPDepResBody>> {
    return this.post<ERPDepResBody>('EB010102', reqBody, '/EB01');
  }
  //================================= 查詢 ===========================================
  //查詢受測者
  getTesterList(
    reqBody: TesterListReq
  ): Observable<ApiResponse<TesterListRes>> {
    return this.post<TesterListRes>('EB090101', reqBody, '/EB09');
  }
  //查詢受測者寄送狀態
  getTesterNotify(
    reqBody: TesterNotifyReq
  ): Observable<ApiResponse<TesterNotifyRes>> {
    return this.post<TesterNotifyRes>('EB090102', reqBody, '/EB09');
  }
  //查詢受測者Email範本
  getTesterEmailTemplate(
    reqBody: TesterEmailTemplateReq
  ): Observable<ApiResponse<TesterEmailTemplateRes>> {
    return this.post<TesterEmailTemplateRes>('EB090103', reqBody, '/EB09');
  }
  //查詢受測者測試說明
  getTesterTestDesc(
    reqBody: TesterTestDescReq
  ): Observable<ApiResponse<TesterTestDescRes>> {
    return this.post<TesterTestDescRes>('EB090104', reqBody, '/EB09');
  }
  //匯出受測者寄送資料excel
  getTestsNotify(
    reqBody: TestsNotifyReq
  ): Observable<ApiResponseDownload<null>> {
    return this.post_download<null>('EB090105', reqBody, '/EB09');
  }
  //查詢受測者題本
  getTesterTestGroup(
    reqBody: TesterTestGroupReq
  ): Observable<ApiResponse<TesterTestGroupRes>> {
    return this.post<TesterTestGroupRes>('EB090106', reqBody, '/EB09');
  }
  //發送測試通知信
  sendTestNoticeEmail(
    reqBody: SendTestNoticeEmailReq
  ): Observable<ApiResponse<SendTestNoticeEmailReq>> {
    return this.post<SendTestNoticeEmailReq>('EB090107', reqBody, '/EB09');
  }

  //================================= 新增 ===========================================

  //查詢新增受測者初始化資料
  getTesterInit(reqBody: null): Observable<ApiResponse<TesterInitRes>> {
    return this.post<TesterInitRes>('EB090201', reqBody, '/EB09');
  }
  //新增受測者
  addTester(reqBody: AddTesterReq): Observable<ApiResponse<AddTesterReq>> {
    return this.post<AddTesterReq>('EB090202', reqBody, '/EB09');
  }

  //================================= 編輯 ===========================================
  //查詢受測者細項資料
  getOriTester(reqBody: OriTesterReq): Observable<ApiResponse<OriTesterRes>> {
    return this.post<OriTesterRes>('EB090301', reqBody, '/EB09');
  }
  //編輯受測者
  editTester(reqBody: EditTesterReq): Observable<ApiResponse<EditTesterReq>> {
    return this.post<EditTesterReq>('EB090302', reqBody, '/EB09');
  }

  //================================= 刪除 ===========================================
  //刪除受測者
  deleteTester(
    reqBody: DeleteTesterReq
  ): Observable<ApiResponse<DeleteTesterReq>> {
    return this.post<DeleteTesterReq>('EB090401', reqBody, '/EB09');
  }

  //================================= 測驗結果 ===========================================
  //查詢受測結果
  getTesterResult(
    reqBody: TesterResultReq
  ): Observable<ApiResponse<TesterResultRes>> {
    return this.post<TesterResultRes>('EB130101', reqBody, '/EB13');
  }

  //查詢受測題本結果
  getTesterSheetResult(
    reqBody: TesterSheetResultReq
  ): Observable<ApiResponse<TesterSheetResultRes>> {
    return this.post<TesterSheetResultRes>('EB130102', reqBody, '/EB13');
  }
  //初始化查詢受測結果
  initGetTesterResult(
    reqBody: null
  ): Observable<ApiResponse<InitGetTesterResultRes>> {
    return this.post<InitGetTesterResultRes>('EB130103', reqBody, '/EB13');
  }
  //下載測驗結果EXCEL
  dowlandTesterResult(
    reqBody: DowlandTesterResultReq
  ): Observable<ApiResponseDownload<null>> {
    return this.post_download<null>('EB130104', reqBody, '/EB13');
  }
}
