import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParameterMessageService {
  public messageSource: any;
  public messageEvent;

  constructor() {
    this.messageSource = new ReplaySubject(1);
    this.messageEvent = this.messageSource.asObservable();
  }

  public sendMessage(message: any[]) {
    this.messageSource.next(message);
    // window.setTimeout(()=>{
    //     this.destruct();
    // },5000);
  }

  public destruct() {
    this.messageSource.next(null);
  }
}
