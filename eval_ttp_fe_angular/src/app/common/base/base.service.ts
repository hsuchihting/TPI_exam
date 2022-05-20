import { answer } from './../../models/answerSubmitModel';
import { ApiResponse } from './../../models/api-response';

import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { ApiRequest } from 'src/app/models/api-request';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, retry, tap } from 'rxjs/operators';
import { apiReqHeader } from 'src/app/models/api-req-header';
import * as moment from 'moment';

export abstract class BaseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  protected post<T>(
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
    return this.http.post<ApiResponse<T>>(fullUrl, req).pipe(
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


  protected testImage<T>(
    txId: string,
    data: any,
    prefixPath: string = ''
  ): Observable<ApiResponse<T>> {
    let fullUrl = `${this.apiUrl}${prefixPath}/${txId}`;
    let req: ApiRequest<any> = {};
    //const blob = new Blob([]);
    const reqHeader = new apiReqHeader();
    reqHeader.txId = txId;
    const nowTime = new Date();
    const newtxtDate = moment(nowTime).format('YYYYMMDDThhmmssTZD');
    reqHeader.txDate = newtxtDate;
    req.header = reqHeader;
    req.body = data;
    console.log(data)

    const formData = new FormData();
    formData.append('header.txDate', reqHeader.txDate);
    formData.append('header.txId', reqHeader.txId);

    formData.append('body.testsSeq', data['testsSeq']);
    formData.append('body.isAutoSubmit', data['isAutoSubmit']);
    data.answerList.forEach((item: any, index: number)=>{
      formData.append(
        `body.answerList[${index}].quSeq`,
        item.quSeq
      );
      formData.append(
        `body.answerList[${index}].testsQuType`,
        item.testsQuType
      );
      formData.append(
        `body.answerList[${index}].isEmpty`,
        item.isEmpty
      );
      formData.append(
        `body.answerList[${index}].answer`,
        item.answer
      );
      if (item.file){
        formData.append(
          `body.answerList[${index}].file`,
          item.file
          //blob
        );
      }
    })

    return this.http.post<ApiResponse<T>>(fullUrl, formData).pipe(
      retry(1),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
