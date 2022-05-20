import { ApiResponse } from 'src/app/models/api-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/common/base/base.service';
import { Injectable } from '@angular/core';

import { AddSystemDesc } from 'src/app/models/Exam/addSystem';
import {
  AddEmailTemplate,
  DeleteEmailTemplate,
  EditEmailTemplate,
  GetEmailTemplate,
  GetEmailTemplateList,
  GetEmailTemplateListRes,
  GetEmailTemplateRes,
  UploadAddEmailTemplateImg,
  UploadAddEmailTemplateImgRes,
  UploadEditEmailTemplateImg,
  UploadEditEmailTemplateImgRes,
} from 'src/app/models/Exam/Email';
import {
  AddPrivacyPolicy,
  GetPrivacyPolicyList,
  GetPrivacyPolicyListRes,
  GetPrivacyPolicy,
  GetPrivacyPolicyRes,
  EditPrivacyPolicy,
  EditPrivacyPolicyStatus,
  DeletePrivacyPolicy,
} from 'src/app/models/Exam/Privacy';
import {
  GetSystemDescList,
  GetSystemDescListRes,
  GetSystemDesc,
  GetSystemDescRes,
  EditSystemDesc,
  EditSystemDescStatus,
  DeleteSystemDesc,
} from 'src/app/models/Exam/System';
import {
  GetTestDescList,
  GetTestDescListRes,
  GetTestDesc,
  GetTestDescRes,
  AddTestDesc,
  EditTestDesc,
  EditTestDescStatus,
  DeleteTestDesc,
} from 'src/app/models/Exam/Test';
import { EditTestReq } from 'src/app/models/Exam/testPaper/editTestModel';
import { EditTestStatusReq } from 'src/app/models/Exam/testPaper/editTestStatusModel';
//import { GetTestsSelectReq, GetTestsSelectRes } from 'src/app/models/Exam/testPaper/getTestsSelectModel';
import { AddTestReq } from 'src/app/models/Exam/testPaper/addTestModel';
import { DeleteTestReq } from 'src/app/models/Exam/testPaper/deleteTestModel';
import {
  GetTestsListReq,
  GetTestsListRes,
} from 'src/app/models/Exam/testPaper/getTestsListModel';
import { GetTestsTypeListReq } from 'src/app/models/testBookModels/GetTestsTypeList';
import { GetTestsTypeListRes } from 'src/app/models/Exam/testPaper/getTestsTypeListModel';
import { GetTestsReq, GetTestsRes } from 'src/app/models/Exam/testPaper/getTestsModel';

@Injectable({
  providedIn: 'root',
})
export class ExamService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  // 查詢Email範本清單
  getEmailTemplateList(
    reqBody: GetEmailTemplateList
  ): Observable<ApiResponse<GetEmailTemplateListRes>> {
    return this.post<GetEmailTemplateListRes>('EB030101', reqBody, '/EB03');
  }
  // 查詢Email範本
  getEmailTemplate(
    reqBody: GetEmailTemplate
  ): Observable<ApiResponse<GetEmailTemplateRes>> {
    return this.post<GetEmailTemplateRes>('EB030102', reqBody, '/EB03');
  }
  //新增Email範本
  addEmailTemplate(
    reqBody: AddEmailTemplate
  ): Observable<ApiResponse<AddEmailTemplate>> {
    return this.post('EB030201', reqBody, '/EB03');
  }
  //Email範本上傳圖片(新增)
  uploadAddEmailTemplateImg(
    reqBody: UploadAddEmailTemplateImg
  ): Observable<ApiResponse<UploadAddEmailTemplateImgRes>> {
    return this.postImage<UploadAddEmailTemplateImgRes>(
      'EB030202',
      reqBody,
      '/EB03'
    );
  }
  //編輯Email範本
  editEmailTemplate(
    reqBody: EditEmailTemplate
  ): Observable<ApiResponse<EditEmailTemplate>> {
    return this.post<EditEmailTemplate>('EB030301', reqBody, '/EB03');
  }
  //Email範本上傳圖片(編輯)
  uploadEditEmailTemplateImg(
    reqBody: UploadEditEmailTemplateImg
  ): Observable<ApiResponse<UploadEditEmailTemplateImgRes>> {
    return this.post<UploadEditEmailTemplateImgRes>(
      'EB030302',
      reqBody,
      '/EB03'
    );
  }
  //刪除Email範本
  deleteEmailTemplate(
    reqBody: DeleteEmailTemplate
  ): Observable<ApiResponse<DeleteEmailTemplate>> {
    return this.post<DeleteEmailTemplate>('EB030401', reqBody, '/EB03');
  }

  addSystem(reqBody: AddSystemDesc): Observable<ApiResponse<AddSystemDesc>> {
    return this.post<AddSystemDesc>('EB040201', reqBody, '/EB04');
  }
  // 查詢系統說明清單
  getSystemDescList(
    reqBody: GetSystemDescList
  ): Observable<ApiResponse<GetSystemDescListRes>> {
    return this.post<GetSystemDescListRes>('EB040101', reqBody, '/EB04');
  }
  // 查詢系統說明
  getSystemDesc(
    reqBody: GetSystemDesc
  ): Observable<ApiResponse<GetSystemDescRes>> {
    return this.post<GetSystemDescRes>('EB040102', reqBody, '/EB04');
  }
  // 編輯系統說明
  editSystemDesc(
    reqBody: EditSystemDesc
  ): Observable<ApiResponse<EditSystemDesc>> {
    return this.post<EditSystemDesc>('EB040301', reqBody, '/EB04');
  }
  // 編輯系統說明狀態
  editSystemDescStatus(
    reqBody: EditSystemDescStatus
  ): Observable<ApiResponse<EditSystemDescStatus>> {
    return this.post<EditSystemDescStatus>('EB040302', reqBody, '/EB04');
  }
  // 刪除系統說明
  deleteSystemDesc(
    reqBody: DeleteSystemDesc
  ): Observable<ApiResponse<DeleteSystemDesc>> {
    return this.post<DeleteSystemDesc>('EB040401', reqBody, '/EB04');
  }

  // 新增隱私權政策
  addPrivacy(
    reqBody: AddPrivacyPolicy
  ): Observable<ApiResponse<AddPrivacyPolicy>> {
    return this.post<AddPrivacyPolicy>('EB050201', reqBody, '/EB05');
  }
  // 查詢隱私政策清單
  getPrivacyPolicyList(
    reqBody: GetPrivacyPolicyList
  ): Observable<ApiResponse<GetPrivacyPolicyListRes>> {
    return this.post<GetPrivacyPolicyListRes>('EB050101', reqBody, '/EB05');
  }
  // 查詢隱私權政策
  getPrivacyPolicy(
    reqBody: GetPrivacyPolicy
  ): Observable<ApiResponse<GetPrivacyPolicyRes>> {
    return this.post<GetPrivacyPolicyRes>('EB050102', reqBody, '/EB05');
  }
  // 編輯隱私權政策
  editPrivacyPolicy(
    reqBody: EditPrivacyPolicy
  ): Observable<ApiResponse<EditPrivacyPolicy>> {
    return this.post<EditPrivacyPolicy>('EB050301', reqBody, '/EB05');
  }
  // 編輯隱私權政策狀態
  editPrivacyPolicyStatus(
    reqBody: EditPrivacyPolicyStatus
  ): Observable<ApiResponse<EditPrivacyPolicyStatus>> {
    return this.post<EditPrivacyPolicyStatus>('EB050302', reqBody, '/EB05');
  }
  // 刪除隱私政策
  deletePrivacyPolicy(
    reqBody: DeletePrivacyPolicy
  ): Observable<ApiResponse<DeletePrivacyPolicy>> {
    return this.post<DeletePrivacyPolicy>('EB050401', reqBody, '/EB05');
  }

  // 查詢測驗說明清單
  getTestDescList(
    reqBody: GetTestDescList
  ): Observable<ApiResponse<GetTestDescListRes>> {
    return this.post<GetTestDescListRes>('EB060101', reqBody, '/EB06');
  }

  //*查詢試卷清單
  getTestsList(
    reqBody: GetTestsListReq
  ): Observable<ApiResponse<GetTestsListRes>> {
    return this.post<GetTestsListRes>('EB070101', reqBody, '/EB07');
  }

  //*查詢試卷
  getTests(reqBody: GetTestsReq): Observable<ApiResponse<GetTestsRes>> {
    return this.post<GetTestsRes>('EB070102', reqBody, '/EB07');
  }

  //*查詢題目類別清單
  getTestsTypeList(
    reqBody: GetTestsTypeListReq
  ): Observable<ApiResponse<GetTestsTypeListRes>> {
    return this.post<GetTestsTypeListRes>('EB070103', reqBody, '/EB07');
  }

  //*新增試卷
  addTest(reqBody: AddTestReq): Observable<ApiResponse<AddTestReq>> {
    return this.addPaperPostImage<AddTestReq>('EB070201', reqBody, '/EB07');
  }

  //*編輯試卷
  editTest(reqBody: FormData): Observable<ApiResponse<EditTestReq>> {
    return this.post<EditTestReq>('EB070301', reqBody, '/EB07');
  }

  //*編輯試卷狀態
  editTestStatus(
    reqBody: EditTestStatusReq
  ): Observable<ApiResponse<EditTestStatusReq>> {
    return this.post<EditTestStatusReq>('EB070302', reqBody, '/EB07');
  }

  //*刪除試卷
  deleteTest(reqBody: DeleteTestReq): Observable<ApiResponse<DeleteTestReq>> {
    return this.post<DeleteTestReq>('EB070401', reqBody, '/EB07');
  }
  // 查詢測驗說明
  getTestDesc(reqBody: GetTestDesc): Observable<ApiResponse<GetTestDescRes>> {
    return this.post<GetTestDescRes>('EB060102', reqBody, '/EB06');
  }
  // 新增測驗說明
  addTestDesc(reqBody: AddTestDesc): Observable<ApiResponse<AddTestDesc>> {
    return this.post<AddTestDesc>('EB060201', reqBody, '/EB06');
  }
  // 編輯測驗說明
  editTestDesc(reqBody: EditTestDesc): Observable<ApiResponse<EditTestDesc>> {
    return this.post<EditTestDesc>('EB060301', reqBody, '/EB06');
  }
  // 編輯測驗說明狀態
  editTestDescStatus(
    reqBody: EditTestDescStatus
  ): Observable<ApiResponse<EditTestDescStatus>> {
    return this.post<EditTestDescStatus>('EB060302', reqBody, '/EB06');
  }
  // 刪除測驗說明
  deleteTestDesc(
    reqBody: DeleteTestDesc
  ): Observable<ApiResponse<DeleteTestDesc>> {
    return this.post<DeleteTestDesc>('EB060401', reqBody, '/EB06');
  }
}
