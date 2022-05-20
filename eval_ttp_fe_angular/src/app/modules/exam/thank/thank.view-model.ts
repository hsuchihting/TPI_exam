import { MessageService } from './../message.service';
import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { ExamService } from '../exam.service';

@Injectable({
  providedIn: 'root',
})
export class ThankViewModel extends BaseViewModel {
  isLogout: boolean = false;/** session timeout controller */
  constructor(private examService: ExamService, private msgService: MessageService) {
    super();
  }

  init(): void {
    this.msgService.messageEvent.subscribe((msg: any) => {
      this.isLogout = msg;
    })
  }
}
