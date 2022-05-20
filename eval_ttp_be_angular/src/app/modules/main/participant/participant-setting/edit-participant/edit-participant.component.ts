import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { Interviewer } from 'src/app/models/participantModels/ParticipantEditModel';
import Swal from 'sweetalert2';
import { ParticipantMessageService } from '../../message.service';
import { ParticipantService } from '../../participant.service';
import { DialogParticipantComponent } from '../add-participant/dialog-participant/dialog-participant.component';
import { DialogTestComponent } from '../add-participant/dialog-test/dialog-test.component';
import { EditParticipantViewModel } from './edit-participant.view.model';

@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.scss'],
})
export class EditParticipantComponent extends VMComponent<EditParticipantViewModel> {
  interviewerArr: Interviewer[] = [];
  setEducation!: string;
  setCarrierPmSeq!: string;
  setTestsGroupSeq!: string;
  setTitlePmSeq!: string;
  setTdSeq!: string;
  setTesterEtSeq!: string;
  setInterviewerEtSeq!: string;
  setHrEtSeq!: string;
  setDepartent!: string;

  constructor(
    private item: EditParticipantViewModel,
    private dialog: MatDialog,
    private participantService: ParticipantService,
    private router: Router,
    private datePipe: DatePipe,
    private messageService: ParticipantMessageService,
    private alertService: AlertService
  ) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
  }

  ngOnDestroy() {
    this.vm.destroy();
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   console.log(event);
  //   // sort in the same container
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     // sort in different container
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //     const totalStore: Array<any> = [...this.vm.answerTestArr];
  //     this.category(totalStore);
  //   }
  // }

  // category(totalStore: any[]) {
  //   this.vm.answerTestArr = totalStore.slice(0, 3);
  // }

  saveAndCheckForm() {
    this.ValidateAllFormFields(this.vm.invalidForm);
    if (this.vm.interviewerArr.length <= 0) {
      this.vm.interviewerCtrl.markAsTouched();
      this.vm.updateValidity(true);
    }
    if (!this.vm.invalidForm.valid || this.vm.interviewerArr.length <= 0) {
      this.alertService.error('欄位有錯，請檢查！');
    } else {
      this.editTester();
    }
  }

  editTester() {
    //面試官
    this.interviewerArr.length = 0;
    this.interviewerArr = [];
    for (var i = 0; i < this.vm.interviewerArr.length; i++) {
      this.interviewerArr.push({
        interviewerId: this.vm.interviewerArr[i].empCode,
        interviewerName: this.vm.interviewerArr[i].empName,
        interviewerEnName: this.vm.interviewerArr[i].empEngName,
        interviewerEmail: this.vm.interviewerArr[i].empEmail,
      });
    }
    //最高學歷
    switch (this.vm.invalidForm.value.education) {
      case '博士':
        this.setEducation = 'A';
        break;
      case '碩士':
        this.setEducation = 'B';
        break;
      case '大學':
        this.setEducation = 'C';
        break;
      case '技術學院':
        this.setEducation = 'D';
        break;
      case '專科':
        this.setEducation = 'E';
        break;
      case '高中':
        this.setEducation = 'F';
        break;
    }

    //就業狀況
    this.vm.carrierList.filter((value: any) => {
      if (value.carrierPmName == this.vm.invalidForm.value.carrierPmSeq) {
        this.setCarrierPmSeq = value.carrierPmSeq;
      }
    });

    //題本序號
    this.vm.testsGroupList.filter((value: any) => {
      if (value.testsGroupName == this.vm.invalidForm.value.testsGroupSeq) {
        this.setTestsGroupSeq = value.testsGroupSeq;
      }
    });

    //應徵職務別ID
    this.vm.titleList.filter((value: any) => {
      if (value.titlePmName == this.vm.invalidForm.value.titlePmSeq) {
        this.setTitlePmSeq = value.titlePmSeq;
      }
    });

    //應徵部門代號 - ERP
    this.vm.depList.filter((value: any) => {
      if (value.depName == this.vm.invalidForm.value.departent) {
        this.setDepartent = value.depId;
      }
    });

    //測驗說明序號
    this.vm.tdList.filter((value: any) => {
      if (value.tdName == this.vm.invalidForm.value.tdSeq) {
        this.setTdSeq = value.tdSeq;
      }
    });
    //受測者Email範本序號
    this.vm.testerEtList.filter((value: any) => {
      if (value.testerEtName == this.vm.invalidForm.value.testerEtSeq) {
        this.setTesterEtSeq = value.testerEtSeq;
      }
    });
    //面試官Email範本序號
    this.vm.interviewerEtList.filter((value: any) => {
      if (
        value.interviewerEtName == this.vm.invalidForm.value.interviewerEtSeq
      ) {
        this.setInterviewerEtSeq = value.interviewerEtSeq;
      }
    });
    //人資Email範本序號
    this.vm.hrEtList.filter((value: any) => {
      if (value.hrEtName == this.vm.invalidForm.value.hrEtSeq) {
        this.setHrEtSeq = value.hrEtSeq;
      }
    });

    let nowTestEndDate = moment(
      this.vm.invalidForm.value.testEndDate,
      'YYYY/MM/DD'
    );
    let formatDateEnd = nowTestEndDate.format('YYYY/MM/DD');

    console.log('testerId = ', this.vm.invalidForm.value.testerId);
    console.log('testerName = ', this.vm.invalidForm.value.testerName);
    console.log('testerEmail = ', this.vm.invalidForm.value.testerEmail);
    console.log('education = ', this.setEducation);
    console.log(
      'testerDepartment = ',
      this.vm.invalidForm.value.testerDepartment
    );
    console.log('testEndDate = ', formatDateEnd);
    console.log(
      'testEndDayNotify = ',
      this.vm.invalidForm.value.testEndDayNotify
    );
    console.log('carrierPmSeq = ', this.setCarrierPmSeq);
    console.log('testsGroupSeq = ', this.setTestsGroupSeq);
    console.log('interviewerArr = ', this.interviewerArr);
    console.log('titlePmSeq = ', this.setTitlePmSeq);
    console.log('departent = ', this.setDepartent);
    console.log('tdSeq = ', this.setTdSeq);
    console.log('testerEtSeq = ', this.setTesterEtSeq);
    console.log('interviewerEtSeq = ', this.setInterviewerEtSeq);
    console.log('hrEtSeq = ', this.setHrEtSeq);

    this.participantService
      .editTester({
        testerId: this.vm.getRandomStr,
        testerName: this.vm.invalidForm.value.testerName,
        testerEmail: this.vm.invalidForm.value.testerEmail,
        education: this.setEducation,
        testerDepartment: this.vm.invalidForm.value.testerDepartment,
        testEndDate: formatDateEnd,
        testEndDayNotify: this.vm.invalidForm.value.testEndDayNotify,
        carrierPmSeq: this.setCarrierPmSeq,
        testsGroupSeq: this.setTestsGroupSeq,
        interviewer: this.interviewerArr,
        titlePmSeq: this.setTitlePmSeq,
        departent: this.setDepartent,
        tdSeq: this.setTdSeq,
        testerEtSeq: this.setTesterEtSeq,
        interviewerEtSeq: this.setInterviewerEtSeq,
        hrEtSeq: this.setHrEtSeq,
      })
      .subscribe((data) => {
        console.log(data);
        if(data.header?.returnCode == 'B0000'){
          Swal.fire({
            title: '成功：編輯成功！',
            icon: 'success',
            confirmButtonText: '確定',
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/main/participant/participant-setting']);

            }
          });
        }else{
          this.alertService.error('失敗：編輯失敗！');

        }

      });
  }

  //切換面試官單位
  onChangeUnit(event: any) {
    console.log('event = ', event);
    if (event != undefined) {
      this.participantService
        .getERPEmpByDepId({
          depId: event.depId,
        })
        .subscribe((res: any) => {
          console.log('getERPEmpByDepId - res  = ', res);
          if('depEmp' in (res.body) == true){
            this.vm.interviewerList = res.body.depEmp;
          }else{
            this.vm.interviewerList.length = 0;
            this.vm.interviewerList = [];
          }
          this.vm.filterValueChanges();
          console.log('interviewerList   = ', this.vm.interviewerList);
        });
    }
  }

  onOpenTestDialog() {
    this.dialog
      .open(DialogTestComponent, {
        height: '460px',
        width: '600px',
        data: {
          testerId:this.vm.getRandomStr,
          tdSeq: this.vm.tdSeq,
          isEdit: true,
        },
      })
      .afterClosed()
      .subscribe((r) => {
        console.log(r);
      });
  }

  onOpenParticipantDialog(type: number) {
    switch (type) {
      case 0:
        this.vm.etSeq = this.vm.testerEtSeq;
        break;
      case 1:
        this.vm.etSeq = this.vm.interviewerEtSeq;
        break;
      case 2:
        this.vm.etSeq = this.vm.hrEtSeq;
        break;
    }

    this.dialog
      .open(DialogParticipantComponent, {
        height: '460px',
        width: '600px',
        data: {
          etSeq: this.vm.etSeq,
          isEdit: true,
        },
      })
      .afterClosed()
      .subscribe((r) => {
        console.log(r);
      });
  }

  onChangeTestDialog(event: any) {
    console.log('event = ', event);
    if (event != undefined) {
      this.vm.tdSeq = event.tdSeq;
    }else{
      this.vm.tdSeq = '';
    }
  }

  onChangeEmailDialog(event: any, type: number) {
    //console.log('event = ', event);
    if (event != undefined) {
      switch (type) {
        case 0:
          this.vm.testerEtSeq = event.testerEtSeq;
          break;
        case 1:
          this.vm.interviewerEtSeq = event.interviewerEtSeq;
          break;
        case 2:
          this.vm.hrEtSeq = event.hrEtSeq;
          break;
      }
      //console.log('this.etSeq = ', this.etSeq);
    }else{

      switch (type) {
        case 0:
          this.vm.testerEtSeq = '';
          break;
        case 1:
          this.vm.interviewerEtSeq = '';
          break;
        case 2:
          this.vm.hrEtSeq = '';
          break;
      }

    }
  }
}
