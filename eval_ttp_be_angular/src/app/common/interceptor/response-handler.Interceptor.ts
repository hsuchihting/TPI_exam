import { CounterTimeService } from './../services/counter-time.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, finalize, map, tap } from 'rxjs/operators';

@Injectable()
export class ResponseHandlerInterceptor implements HttpInterceptor {
  constructor(private counterTimeService: CounterTimeService){}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(

      finalize(()=>{
        this.counterTimeService.clearSessionTime();
        this.counterTimeService.countSessionTimeOut();
      })
      // filter(
      //   (event: HttpEvent<any>) =>
      //     event instanceof HttpResponse && event.status === 200
      // ),
      // map((event: HttpEvent<any>) => {
      //   const httpResponse = event as HttpResponse<any>;
      //   return httpResponse.clone({ body: httpResponse.body.data });
      // })
    );
  }
}
