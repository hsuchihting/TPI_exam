import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService,) {
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.loadingService.hide();
                switch (error.status) {
                    case 401: // Unauthorized
                        // todo
                        return throwError(error);
                        break;
                    case 403: // Forbidden
                        // todo
                        return throwError(error);
                        break;
                    default:
                        // todo
                        return throwError(error);
                }
            }),
            //retry(1)
        );
    }
}