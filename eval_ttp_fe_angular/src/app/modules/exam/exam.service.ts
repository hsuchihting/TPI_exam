import { EventEmitter, Injectable, Output } from '@angular/core';
import { BaseService } from 'src/app/common/base/base.service';
import { HttpClient } from '@angular/common/http';
import { SysDescQryRes } from 'src/app/models/sysDescQryModel';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';
import { SysDescAgreeReq } from 'src/app/models/sysDescAgreeReqModel';
import { testDescRes } from 'src/app/models/testDescModel';
import { TestTimeQryRes } from 'src/app/models/testTimeQryModel';
import { TestContentQryRes } from 'src/app/models/testContentQryModel';
import { updateProcessModel } from 'src/app/models/projectModel';
import {
  AnswerSubmitReq,
  AnswerSubmitRes,
} from 'src/app/models/answerSubmitModel';

@Injectable({
  providedIn: 'root',
})
export class ExamService extends BaseService {
  @Output() updateProcessBar = new EventEmitter<updateProcessModel>();
  constructor(http: HttpClient) {
    super(http);
  }

  updateProcess(result: updateProcessModel) {
    this.updateProcessBar.emit(result);
  }

  //*查詢系統說明與隱私權政策
  sysDescQry(): Observable<ApiResponse<SysDescQryRes>> {
    return this.post<SysDescQryRes>('EF020101', {});
  }

  //*同意隱私權
  sysDescAgree(
    reqBody: SysDescAgreeReq
  ): Observable<ApiResponse<SysDescAgreeReq>> {
    return this.post<SysDescAgreeReq>('EF020201', reqBody);
  }

  //*查詢測驗說明
  testDescQry(): Observable<ApiResponse<testDescRes>> {
    return this.post<testDescRes>('EF030101', {});
  }

  //*查詢測驗時間
  testTimeQry(): Observable<ApiResponse<TestTimeQryRes>> {
    return this.post<TestTimeQryRes>('EF030102', {});
  }

  //*領取試卷
  testContentQry(): Observable<ApiResponse<TestContentQryRes>> {
    return this.post<TestContentQryRes>('EF030201', {});
  }
  // testContentQry(): Observable<ApiResponse<TestContentQryRes>> {
  //   return this.get<TestContentQryRes>('http://localhost:3000/testcotent');
  // }

  //*繳交試卷
  answerSubmit(
    resBody: AnswerSubmitReq
  ): Observable<ApiResponse<AnswerSubmitRes>> {
    return this.testImage<AnswerSubmitRes>('EF040101', resBody);
  }
}
