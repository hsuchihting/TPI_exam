import { AddParticipantViewModel } from './add-participant.view.model';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/common/services/loading.service';
import { VMComponent } from 'src/app/common/base/vm.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantService } from '../../participant.service';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { DialogParticipantComponent } from './dialog-participant/dialog-participant.component';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/common/services/alert.service';
import Swal from 'sweetalert2';
import { Interviewer } from 'src/app/models/participantModels/ParticipantAddModel';
import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss'],
})
export class AddParticipantComponent extends VMComponent<AddParticipantViewModel> {
  check!: Boolean;

  interviewerArr: Interviewer[] = [];
  testerEtSeq!: string;
  interviewerEtSeq!: string;
  hrEtSeq!: string;
  etSeq!: string;
  tdSeq!: string;

  constructor(
    private item: AddParticipantViewModel,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private router: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private alertService: AlertService
  ) {
    super(item);
  }

  ngOnInit() {
    this.vm.init();
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

  saveAndCheckForm(event: any) {

    this.ValidateAllFormFields(this.vm.invalidForm);
    console.log('interviewerArr length = ', this.vm.interviewerArr.length);
    if (this.vm.interviewerArr.length <= 0) {
      this.vm.interviewerCtrl.markAsTouched();
      this.vm.updateValidity(true);
    }

    if (!this.vm.invalidForm.valid || this.vm.interviewerArr.length <= 0) {
      this.alertService.error('欄位有錯，請檢查！');
    } else {
      this.addTester();
    }
  }

  addTester() {
    //時間轉換
    let now = moment(this.vm.invalidForm.value.testEndDate, 'YYYYMMDDHHmmss');
    let formatDate = now.format('YYYYMMDDHHmmss');

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

    console.log('testerName = ', this.vm.invalidForm.value.testerName);
    console.log('testerEmail = ', this.vm.invalidForm.value.testerEmail);
    console.log('education = ', this.vm.invalidForm.value.education);
    console.log(
      'testerDepartment = ',
      this.vm.invalidForm.value.testerDepartment
    );
    console.log('testEndDate = ', formatDate);
    console.log(
      'testEndDayNotify = ',
      this.vm.invalidForm.value.testEndDayNotify
    );
    console.log('carrierPmSeq = ', this.vm.invalidForm.value.carrierPmSeq);
    console.log('testsGroupSeq = ', this.vm.invalidForm.value.testsGroupSeq);
    console.log('interviewerArr = ', this.interviewerArr);
    console.log('titlePmSeq = ', this.vm.invalidForm.value.titlePmSeq);
    console.log('departent = ', this.vm.invalidForm.value.departent);
    console.log('tdSeq = ', this.vm.invalidForm.value.tdSeq);
    console.log('testerEtSeq = ', this.vm.invalidForm.value.testerEtSeq);
    console.log(
      'interviewerEtSeq = ',
      this.vm.invalidForm.value.interviewerEtSeq
    );
    console.log('hrEtSeq = ', this.vm.invalidForm.value.hrEtSeq);

    this.participantService
      .addTester({
        testerName: this.vm.invalidForm.value.testerName,
        testerEmail: this.vm.invalidForm.value.testerEmail,
        education: this.vm.invalidForm.value.education,
        testerDepartment: this.vm.invalidForm.value.testerDepartment,
        testEndDate: formatDate,
        testEndDayNotify: this.vm.invalidForm.value.testEndDayNotify,
        carrierPmSeq: this.vm.invalidForm.value.carrierPmSeq,
        testsGroupSeq: this.vm.invalidForm.value.testsGroupSeq,
        interviewer: this.interviewerArr,
        titlePmSeq: this.vm.invalidForm.value.titlePmSeq,
        departent: this.vm.invalidForm.value.departent,
        tdSeq: this.vm.invalidForm.value.tdSeq,
        testerEtSeq: this.vm.invalidForm.value.testerEtSeq,
        interviewerEtSeq: this.vm.invalidForm.value.interviewerEtSeq,
        hrEtSeq: this.vm.invalidForm.value.hrEtSeq,
      })
      .subscribe((data) => {
        console.log(data);
        if (data.header?.returnCode == 'B0000') {
          Swal.fire({
            title: '成功：新增成功！',
            icon: 'success',
            confirmButtonText: '確定',
          }).then((result) => {
            if (result.value) {
              console.log('OK...............');
              this.router.navigate(['/main/participant/participant-setting']);
            }
          });
        } else {
          this.alertService.error('失敗：新增失敗！');
        }
      });
  }

  onOpenTestDialog() {
    this.dialog
      .open(DialogTestComponent, {
        height: '460px',
        width: '600px',
        data: {
          testerId: '',
          tdSeq: this.tdSeq,
          isEdit: false,
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
        this.etSeq = this.testerEtSeq;
        break;
      case 1:
        this.etSeq = this.interviewerEtSeq;
        break;
      case 2:
        this.etSeq = this.hrEtSeq;
        break;
    }

    this.dialog
      .open(DialogParticipantComponent, {
        height: '460px',
        width: '600px',
        data: {
          etSeq: this.etSeq,
          isEdit: false,
        },
      })
      .afterClosed()
      .subscribe((r) => {
        console.log(r);
      });
  }

  onChangeTestDialog(event: any) {
    if (event != undefined) {
      this.tdSeq = event.tdSeq;
    }else{
      this.tdSeq = '';
    }
  }

  onChangeEmailDialog(event: any, type: number) {
    //console.log('event = ', event);
    if (event != undefined) {
      switch (type) {
        case 0:
          this.testerEtSeq = event.testerEtSeq;
          break;
        case 1:
          this.interviewerEtSeq = event.interviewerEtSeq;
          break;
        case 2:
          this.hrEtSeq = event.hrEtSeq;
          break;
      }
      //console.log('this.etSeq = ', this.etSeq);
    }else{

      switch (type) {
        case 0:
          this.testerEtSeq = '';
          break;
        case 1:
          this.interviewerEtSeq = '';
          break;
        case 2:
          this.hrEtSeq = '';
          break;
      }

    }
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
          if ('depEmp' in res.body == true) {
            this.vm.interviewerList = res.body.depEmp;
          } else {
            this.vm.interviewerList.length = 0;
            this.vm.interviewerList = [];
          }
          this.vm.filterValueChanges();

          console.log('interviewerList   = ', this.vm.interviewerList);
        });
    }
  }
}
