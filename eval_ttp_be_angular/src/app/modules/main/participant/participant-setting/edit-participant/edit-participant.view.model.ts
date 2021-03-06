import { ParticipantSettingComponent } from './../participant-setting.component';
import { Component, Directive, Inject, Injectable, Input } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ParticipantService } from '../../participant.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import {
  Carrier,
  HrET,
  Interviewer,
  InterviewerET,
  Td,
  TesterET,
  TestsGroup,
  Title,
} from 'src/app/models/participantModels/ParticipantEditModel';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Dep, DepEmp } from 'src/app/models/ShareModel';
import { ParticipantMessageService } from '../../message.service';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class EditParticipantViewModel extends BaseViewModel {
  displayedColumns!: string[];
  roles!: any[];
  role!: number | number[];
  multiple!: boolean;
  disabled!: boolean;
  required!: boolean;
  invalidForm!: FormGroup;
  subscription!: Subscription;

  //get
  getEducationName!: string;
  getTestsGroupName!: string;
  getCarrierPmName!: string;
  getTitlePmName!: string;
  getTdName!: string;
  getTesterEtName!: string;
  getInterviewerEtName!: string;
  getHrEtName!: string;
  getDepartent!: string;

  //select data
  carrierList: Carrier[] = [];
  testsGroupList: TestsGroup[] = [];
  titleList: Title[] = [];
  tdList: Td[] = [];
  testerEtList: TesterET[] = [];
  interviewerEtList: InterviewerET[] = [];
  hrEtList: HrET[] = [];
  depList: Dep[] = [];
  educationData!: any[];
  reminderDeadlineData!: any[];

  getRandomStr!: string;
  //answerTestArr: Array<any> = [{ name: 'Java??????' }, { name: '????????????' }];

  //Chips
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  //interviewerCtrl = new FormControl('', [Validators.required]);
  interviewerCtrl = new FormControl('', Validators.compose([
    Validators.required,
    this.setInterviewerError,
  ]),);
  filteredInterviewer!: Observable<DepEmp[]>;
  interviewerArr: DepEmp[] = [];
  interviewerList: DepEmp[] = [];
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  @ViewChild('chipList') chipList!: { errorState: boolean };

  //??????
  testerEtSeq!: string;
  interviewerEtSeq!: string;
  hrEtSeq!: string;
  etSeq!: string;
  tdSeq!: string;

  constructor(
    private messageService: ParticipantMessageService,
    private fb: FormBuilder,
    private participantService: ParticipantService
  ) {
    super();
    this.filterValueChanges();
  }

  init(): void {
    this.getMessage();
    this.createForm();
    this.getERPDep();
    this.clearFormData();
    this.updateValidity(false);
    this.getAllFormData();
  }

  destroy() {
    this.subscription.unsubscribe();
  }

  getMessage() {
    this.subscription = this.messageService.messageEvent.subscribe(
      (msg: any) => {
        this.getRandomStr = msg;
      }
    );
  }

  createForm() {
    this.invalidForm = this.fb.group({
      testerName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[\u4e00-\u9fa5_a-zA-Z\s whitespace. \s]+$'),
        ]),
      ],
      testerId: [''],
      testerEmail: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(80),
          Validators.pattern(
            '^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$'
          ),
        ]),
      ],
      titlePmSeq: ['', Validators.required],
      education: [''],
      testerDepartment: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern('^[\u4e00-\u9fa5_a-zA-Z\s whitespace. \s]+$'),
        ]),
      ],
      carrierPmSeq: [''],
      departent: ['', Validators.required],
      testsGroupSeq: ['', Validators.required],
      tdSeq: ['', Validators.required],
      testEndDate: ['', Validators.required],
      testerEtSeq: ['', Validators.required],
      testEndDayNotify: ['', Validators.required],
      interviewerEtSeq: ['', Validators.required],
      interviewer_unit: ['', Validators.required],
      hrEtSeq: ['', Validators.required],
      // interviewer: ['', Validators.required],
    });
  }

  //???????????????????????????????????????API????????????????????????????????????
  clearFormData() {
    this.titleList.length = 0;
    this.titleList = [];
    this.carrierList.length = 0;
    this.carrierList = [];
    this.testsGroupList.length = 0;
    this.testsGroupList = [];
    this.tdList.length = 0;
    this.tdList = [];
    this.testerEtList.length = 0;
    this.testerEtList = [];
    this.interviewerEtList.length = 0;
    this.interviewerEtList = [];
    this.hrEtList.length = 0;
    this.hrEtList = [];
    this.interviewerArr.length = 0;
    this.interviewerArr = [];
  }

  getERPDep() {
    this.participantService.getERPDep(null).subscribe((res: any) => {
      console.log('getERPDep - res  = ', res);
      this.depList = res.body.dep;
    });
  }

  getAllFormData() {
    console.log('getRandomStr=', this.getRandomStr);
    this.participantService
      .getOriTester({
        testerId: this.getRandomStr,
      })
      .subscribe((res) => {
        console.log('getOriTester - res = ', res);
        if (res.header?.returnCode == 'B0000') {
          //??????
          this.setValue(res);
          this.setSelectData(res);
          this.setDialogValue(res);
        }
      });
  }

  setValue(res: any) {
    //????????????
    switch (res.body.education) {
      case 'A':
        this.getEducationName = '??????';
        break;
      case 'B':
        this.getEducationName = '??????';
        break;
      case 'C':
        this.getEducationName = '??????';
        break;
      case 'D':
        this.getEducationName = '????????????';
        break;
      case 'E':
        this.getEducationName = '??????';
        break;
      case 'F':
        this.getEducationName = '??????';
        break;
    }

    //????????????
    res.body.carrier.filter((value: any) => {
      if (value.carrierPmSeq == res.body.carrierPmSeq) {
        this.getCarrierPmName = value.carrierPmName;
      }
    });

    //????????????
    res.body.testsGroup.filter((value: any) => {
      if (value.testsGroupSeq == res.body.testsGroupSeq) {
        this.getTestsGroupName = value.testsGroupName;
      }
    });

    //???????????????ID
    res.body.title.filter((value: any) => {
      if (value.titlePmSeq == res.body.titlePmSeq) {
        this.getTitlePmName = value.titlePmName;
      }
    });
    //??????????????????
    res.body.td.filter((value: any) => {
      if (value.tdSeq == res.body.tdSeq) {
        this.getTdName = value.tdName;
      }
    });
    //?????????Email????????????
    res.body.testerET.filter((value: any) => {
      if (value.testerEtSeq == res.body.testerEtSeq) {
        this.getTesterEtName = value.testerEtName;
      }
    });

    //?????????Email????????????
    res.body.interviewerEt.filter((value: any) => {
      if (value.interviewerEtSeq == res.body.interviewerEtSeq) {
        this.getInterviewerEtName = value.interviewerEtName;
      }
    });
    //??????Email????????????
    res.body.hrET.filter((value: any) => {
      if (value.hrEtSeq == res.body.hrEtSeq) {
        this.getHrEtName = value.hrEtName;
      }
    });

    //????????????
    this.depList.filter((value: any) => {
      if (value.depId == res.body.departent) {
        this.getDepartent = value.depName;
      }
    });
    //?????????
    this.interviewerArr = [];
    for (let i = 0; i < res.body.interviewer.length; i++) {
      this.interviewerArr.push({
        empCode: res.body.interviewer[i].interviewerId,
        empName: res.body.interviewer[i].interviewerName,
        empEngName: res.body.interviewer[i].interviewerEnName,
        empEmail: res.body.interviewer[i].interviewerEmail,
      });
    }

    this.invalidForm.patchValue({
      testerName: res.body.testerName,
      testerEmail: res.body.testerEmail,
      education: this.getEducationName,
      testerDepartment: res.body.testerDepartment,
      testEndDate: new Date(res.body.testEndDate),
      testEndDayNotify: res.body.testEndDayNotify,
      carrierPmSeq: this.getCarrierPmName,
      testsGroupSeq: this.getTestsGroupName,
      titlePmSeq: this.getTitlePmName,
      departent: this.getDepartent,
      tdSeq: this.getTdName,
      testerEtSeq: this.getTesterEtName,
      interviewerEtSeq: this.getInterviewerEtName,
      hrEtSeq: this.getHrEtName,
      interviewer_unit:this.depList[0].depName
    });
  }

  setSelectData(res: any) {
    this.carrierList = res.body.carrier;
    this.testsGroupList = res.body.testsGroup;
    this.titleList = res.body.title;
    this.tdList = res.body.td;
    this.testerEtList = res.body.testerET;
    this.interviewerEtList = res.body.interviewerEt;
    this.hrEtList = res.body.hrET;

    this.educationData = [
      { id: 'A', name: '??????' },
      { id: 'B', name: '??????' },
      { id: 'C', name: '??????' },
      { id: 'D', name: '????????????' },
      { id: 'E', name: '??????' },
      { id: 'F', name: '??????' },
    ];

    this.reminderDeadlineData = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
    ];
  }

  setDialogValue(res: any) {
    this.tdSeq = res.body.td[0].tdSeq;
    this.testerEtSeq = res.body.testerET[0].testerEtSeq;
    this.interviewerEtSeq = res.body.interviewerEt[0].interviewerEtSeq;
    this.hrEtSeq = res.body.hrET[0].hrEtSeq;
  }

  //==================================== Chips (?????????) ====================================================

  updateValidity(isSet:boolean){
    if(isSet){
     this.interviewerCtrl.setValidators([Validators.required,this.setInterviewerError]);
     this.interviewerCtrl.updateValueAndValidity();
    }else{
     this.interviewerCtrl.clearValidators();
     this.interviewerCtrl.updateValueAndValidity();
    }

 }

 setInterviewerError(group : FormGroup) : {[s:string ]: boolean} {
  //console.log('group = ' , group);
  if(group.value == ''){
    return {'noPersonError': false};
  }else{
    return {'noPersonError': true};
  }
}


  filterValueChanges() {
    console.log('***filterValueChanges = ' , this.interviewerList);

    this.filteredInterviewer = this.interviewerCtrl.valueChanges.pipe(
      startWith(null),
      map((item: any | null) =>
        item ? this._filter(item) : this.interviewerList.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    if (this.interviewerArr.length < 5) {
      const input = event.input;
      const value = event.value;

      this.interviewerList.filter((item, index) => {
        if (item.empName == value.trim()) {
          console.log('item =', item.empName);
          // Add our interviewer
          if ((value || '').trim()) {
            //this.interviewerArr.push(value.trim());
            this.interviewerArr.push({
              empCode: item.empCode,
              empName: item.empName,
              empEngName: item.empEngName,
              empEmail: item.empEmail,
            });
          }
        }
      });

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
    this.interviewerCtrl.setValue(null);
  }

  remove(item: any): void {
    const index = this.interviewerArr.indexOf(item);

    if (index >= 0) {
      this.interviewerArr.splice(index, 1);
    }
    //????????????????????????0????????????????????????
    if (this.interviewerArr.length <= 0) {
      this.updateValidity(true);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.interviewerArr.length < 5) {
      this.interviewerList.filter((item, index) => {
        if (item.empName == event.option.viewValue) {
          console.log('item =', item.empName);
          this.interviewerArr.push({
            empCode: item.empCode,
            empName: item.empName,
            empEngName: item.empEngName,
            empEmail: item.empEmail,
          });
        }
      });

      //this.interviewerArr.push(event.option.viewValue);
      //this.interviewerInput.nativeElement.value = '';
      console.log('this.interviewerArr=', this.interviewerArr);
    }
    this.interviewerCtrl.setValue(null);
    //????????????????????????0????????????????????????
    this.updateValidity(false);
    console.log('this.interviewerArr=', this.interviewerArr);
  }

  _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    //????????????????????????0????????????????????????
    this.updateValidity(false);
    return this.interviewerList.filter(
      (item) => item.empName.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
