import { MessageService } from './../../../../modules/exam/message.service';
import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';

@Injectable({
  providedIn: 'root',
})
export class TimesupViewModel extends BaseViewModel {
  isTimeout!: boolean; /** 是否為試卷施測時間*/
  constructor(
    private msgService: MessageService
  ) {
    super();
  }

  init(): void {
    this.msgService.messageEvent.subscribe((msg: any) => {
      this.isTimeout = msg;
    })
  }
  show() {
    // if (this.counterTime.min === 0 && this.counterTime.sec === 0) {
    //   this.modalModel.open();
    // }
  }
}
