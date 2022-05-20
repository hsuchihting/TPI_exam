import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class MessageService {
  public messageSource: any;
  public messageSourceForView: any;
  public messageEvent: any;
  constructor(){
    this.messageSource  = new ReplaySubject(1);
    this.messageSourceForView = new ReplaySubject(1);
    this.messageEvent   = this.messageSource.asObservable();
  }
  public sendMessage(message: any){
    this.messageSource.next(message);
    // window.setTimeout(()=>{
    //     this.destruct();
    // },5000);
  }
  public sendViewMessage(message: any){
    this.messageSourceForView.next(message);
  }
  public sendArrMessage(message: any[]){
    this.messageSource.next(message);
  }
  public destruct(){
    this.messageSource.next(null);
  }
}
















