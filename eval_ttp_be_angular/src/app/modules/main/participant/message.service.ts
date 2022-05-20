import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParticipantMessageService {

  public messageSource:any;
  public messageSource2:any;
  public messageEvent;
  public messageEvent2;


  constructor(){
      this.messageSource  = new BehaviorSubject(0);
      this.messageSource2  = new BehaviorSubject(0);
      this.messageEvent   = this.messageSource.asObservable();
      this.messageEvent2   = this.messageSource2.asObservable();
  }


  public sendMessage(message: any){
      this.messageSource.next(message);
      // window.setTimeout(()=>{
      //     this.destruct();
      // },5000);
  }


  public sendMessage2(message: any[] ){
    this.messageSource2.next(message );
}

  public destruct(){
      this.messageSource.next(null);
  }
}
