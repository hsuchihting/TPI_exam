import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messageSource: any;
  public messageSourceForView: any;
  public messageEvent: any;
  constructor() {
    this.messageSource  = new ReplaySubject(1);
    this.messageSourceForView = new ReplaySubject(1);
    this.messageEvent   = this.messageSource.asObservable();
  }

  public sendMessage(message: any){
    this.messageSource.next(message);
  }
}
