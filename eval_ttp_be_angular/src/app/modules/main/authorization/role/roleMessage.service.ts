import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class RoleMessageService {
  public messageSource:any;
  public messageEvent;
  public messageSource2:any;
  public messageEvent2;
  constructor(){
      this.messageSource  = new BehaviorSubject(0);
      this.messageEvent   = this.messageSource.asObservable();
      this.messageSource2  = new BehaviorSubject(0);
      this.messageEvent2   = this.messageSource2.asObservable();
  }
  public sendMessage(message: any){
      this.messageSource.next(message);
      // window.setTimeout(()=>{
      //     this.destruct();
      // },5000);
  }
  public sendMessage2(message: any[]){
    this.messageSource2.next(message);
    // window.setTimeout(()=>{
    //     this.destruct();
    // },5000);
}
  public destruct(){
      this.messageSource.next(null);
  }
}
