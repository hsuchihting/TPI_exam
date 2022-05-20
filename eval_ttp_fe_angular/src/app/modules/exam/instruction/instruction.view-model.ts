import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { testDescRes } from 'src/app/models/testDescModel';
import { ExamService } from '../exam.service';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root',
})
export class InstructionViewModel extends BaseViewModel {
  data!: testDescRes;
  dotestFail!: string; //instruction failure condition

  constructor(private examService: ExamService, private router: Router, private msgService: MessageService) {
    super();
  }

  init(): void {
    this.getInstruction();
  }

  getInstruction() {
    this.examService.testDescQry().subscribe((res) => {
      if (res.body?.tdContent && res.body.tbContentList) {
        this.data = res.body;
      }
    });
  }

  checkExamTime() {
    this.examService.testTimeQry().subscribe((res) => {
      const startExam = res.body?.timeBaseOnTest === 'Y' ? true : false;
      let returnCode = res.header?.returnCode;
      switch(returnCode){
        case "F2004":
         this.dotestFail = "testNotExist"
          return $('#dotest').modal('show');
          case "F1003":
          this.dotestFail = "finishTest"
          return $('#dotest').modal('show');
          case "F1004":
          this.dotestFail = "expire"
          return $('#dotest').modal('show');
          default:
          break
      }
      if (startExam === false) {
        // open dialog
        $('#dotest').modal('show');
        this.msgService.sendMessage(startExam);
      }else{
        this.router.navigate(['/exam/test/1']);
        this.msgService.sendMessage(startExam);
      }
    });
  }
}
