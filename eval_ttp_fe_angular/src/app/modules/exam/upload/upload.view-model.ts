import { answer } from './../../../models/answerSubmitModel';
import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { ExamService } from '../exam.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CounterTimeService } from './../../../common/services/counter-time.service';
import { Router } from '@angular/router';
import { ModalService } from './../../../common/components/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class UploadViewModel extends BaseViewModel {
  uploadForm!: FormGroup;
  answer: answer[] = [];
  constructor(
    private examService: ExamService,
    private router: Router,
    private counterTimeService: CounterTimeService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    super();
  }

  init(): void {
    this.uploadForm = this.fb.group({});
    this.timeStart();
  }
  //todo get 類似 computed 的用法
  // get hour() {
  //   return this.counterTimeService.hourTxt;
  // }
  // get min() {
  //   return this.counterTimeService.minTxt;
  // }

  // get sec() {
  //   return this.counterTimeService.secTxt;
  // }

  //* methods
  timeStart() {
    this.counterTimeService.timeStart();
  }
  back() {
    this.router.navigate(['/exam/test/1']);
  }
  submit() {
    this.modalService.open();
    this.examService
      .answerSubmit({
        testsSeq: 'string',
        isAutoSubmit: 'string',
        answerList: this.answer,
      })
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/exam/thank']);
      });
  }
}
