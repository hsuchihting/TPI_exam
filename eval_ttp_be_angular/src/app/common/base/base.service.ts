import { ApiResponse, ApiResponseDownload } from './../../models/api-response';
import { TestsQuImg } from './../../models/testBookModels/GetTestsModel';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { ApiRequest } from 'src/app/models/api-request';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as moment from 'moment';
import { apiReqHeader } from 'src/app/models/api-req-header';
export abstract class BaseService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  /** @param txId 交易Id
   *  @param data rq物件
   *  @param prefixPath 前綴路徑，基於斜線開頭，結尾不用加斜線(ex: '/EB01')
   */
  protected post<T>(
    txId: string,
    data: any,
    prefixPath: string = ''
  ): Observable<ApiResponse<T>> {
    let fullUrl = `${this.apiUrl}${prefixPath}/${txId}`;
    let req: ApiRequest<any> = {};
    let postData;
    const reqHeader = new apiReqHeader();
    reqHeader.txId = txId;
    const nowTime = new Date();
    const newtxtDate = moment(nowTime).format('YYYYMMDDThhmmssTZD');
    reqHeader.txDate = newtxtDate;
    req.header = reqHeader;
    req.body = data;
    postData = req;
    if (data instanceof FormData) {
      data.append('header.txDate', reqHeader.txDate);
      data.append('header.txId', reqHeader.txId);
      postData = data;
    }
    return this.http.post<ApiResponse<T>>(fullUrl, postData).pipe(
      retry(1),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  protected post_download<T>(
    txId: string,
    data: any,
    prefixPath: string = ''
  ): Observable<ApiResponseDownload<T>> {
    let fullUrl = `${this.apiUrl}${prefixPath}/${txId}`;
    let req: ApiRequest<any> = {};
    const reqHeader = new apiReqHeader();
    reqHeader.txId = txId;
    const nowTime = new Date();
    const newtxtDate = moment(nowTime).format('YYYYMMDDThhmmssTZD');
    reqHeader.txDate = newtxtDate;
    req.header = reqHeader;
    req.body = data;
    let option = { responseType: 'blob' as 'json' };
    return this.http.post<ApiResponseDownload<T>>(fullUrl, req, option).pipe(
      retry(1),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  protected postImage<T>(
    txId: string,
    data: any,
    prefixPath: string = ''
  ): Observable<ApiResponse<T>> {
    let fullUrl = `${this.apiUrl}${prefixPath}/${txId}`;
    let req: ApiRequest<any> = {};
    const reqHeader = new apiReqHeader();
    reqHeader.txId = txId;
    const nowTime = new Date();
    const newtxtDate = moment(nowTime).format('YYYYMMDDThhmmssTZD');
    reqHeader.txDate = newtxtDate;
    const formData = new FormData();
    formData.append('body.etTypeCode', data['etTypeCode']);
    formData.append('body.file', data['file']);
    formData.append('header.txDate', reqHeader.txDate);
    formData.append('header.txId', reqHeader.txId);
    return this.http.post<ApiResponse<T>>(fullUrl, formData).pipe(
      retry(1),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  protected addPaperPostImage<T>(
    txId: string,
    data: any,
    prefixPath: string = ''
  ): Observable<ApiResponse<T>> {
    let fullUrl = `${this.apiUrl}${prefixPath}/${txId}`;
    let req: ApiRequest<any> = {};
    const reqHeader = new apiReqHeader();
    reqHeader.txId = txId;
    const nowTime = new Date();
    const newtxtDate = moment(nowTime).format('YYYYMMDDThhmmssTZD');
    reqHeader.txDate = newtxtDate;
    req.header = reqHeader;
    req.body = data;
    const formData = new FormData();

    formData.append('header.txDate', reqHeader.txDate);
    formData.append('header.txId', reqHeader.txId);

    //*上方卡片
    formData.append('body.testsType', data['testsType']);
    formData.append('body.testsName', data['testsName']);
    formData.append('body.testDTime', data['testDTime']);
    formData.append('body.testHTime', data['testHTime']);
    formData.append('body.testMTime', data['testMTime']);
    formData.append('body.remindTime', data['remindTime']);
    formData.append('body.memo', data['memo']);

    data.addTestsQuList.forEach((item: any, i: number) => {
      console.log(item);

      //*下方卡片第一層陣列
      formData.append(
        `body.addTestsQuList[${i}].testsQuType`,
        item.testsQuType
      );
      formData.append(
        `body.addTestsQuList[${i}].testsQuDesc`,
        item.testsQuDesc
      );
      if (item.testsQuImg) {
        formData.append(
          `body.addTestsQuList[${i}].testsQuImg`,
          item.testsQuImg
        );
      }
      if (item.testsQuType === 'C' || item.testsQuType === 'S') {
        item.addTestsQuOptionsList.forEach((child: any, j: number) => {
          //*下方卡片第二層陣列

          formData.append(
            `body.addTestsQuList[${i}].addTestsQuOptionsList[${j}].testsQuOptionsDesc`,
            child.testsQuOptionsDesc
          );

          if (child.testsQuOptionsImg) {
            formData.append(
              `body.addTestsQuList[${i}].addTestsQuOptionsList[${j}].testsQuOptionsImg`,
              child.testsQuOptionsImg
            );
          }

          formData.append(
            `body.addTestsQuList[${i}].addTestsQuOptionsList[${j}].isTestsQuAns`,
            child.isTestsQuAns
          );
        });
      }
    });

    return this.http.post<ApiResponse<T>>(fullUrl, formData).pipe(
      retry(1),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  protected get<T>(path: string): Observable<ApiResponse<T>> {
    // let fullUrl = this.apiUrl + path;
    let fullUrl = path;
    return this.http.get<ApiResponse<T>>(fullUrl).pipe(
      retry(1),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
