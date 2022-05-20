import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import { StorageKey } from 'src/app/enum/storage-key.enum';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionStorageService) {}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // todo set token
    // console.log(req)
    const token =
      (this.sessionService.get(StorageKey.access_token) as string) || 'token';
    return next.handle(this.addToken(req, token));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const auth: {
      [name: string]: string | string[];
    } = req.url.includes('EB000101') ? {} : { Authorization: token };
    return req.clone({ setHeaders: auth });
  }
}
