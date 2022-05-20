import { ParticipantSettingComponent } from './../participant-setting.component';
import { Component, Directive, ElementRef, Injectable } from '@angular/core';
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
import {
  Carrier,
  HrET,
  InterviewerET,
  Td,
  TesterET,
  TesterInitRes,
  TestsGroup,
  Title,
} from 'src/app/models/participantModels/ParticipantAddModel';
import { map, startWith, filter } from 'rxjs/operators';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Dep, DepEmp } from 'src/app/models/ShareModel';

@Injectable({
  providedIn: 'root',
})
export class AddParticipantViewModel extends BaseViewModel {
  roleFilter!: string;
  displayedColumns!: string[];
  roles!: any[];
  role!: number | number[];
  multiple!: boolean;
  disabled!: boolean;
  required!: boolean;
  dateFilter!: Date;
  invalidForm!: FormGroup;

  //select list
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
  // answerTestArr: Array<any> = [
  //   {  name: 'Java試卷' },
  //   {  name: '邏輯試卷' },
  // ];

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
  // @ViewChild('interviewerInput') interviewerInput!: ElementRef<HTMLInputElement> ;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  @ViewChild('chipList') chipList!: { errorState: boolean };

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService
  ) {
    super();
    this.filterValueChanges();
  }


  init(): void {
    this.createForm();
    this.getTesterInitData();
    this.getERPDep();
    this.updateValidity(false);
  }

  getTesterInitData() {
    this.participantService.getTesterInit(null).subscribe((res: any) => {
      console.log('getTesterInit - res  = ', res);
      this.setSelectData(res);
    });
  }

  getERPDep() {
    this.participantService.getERPDep(null).subscribe((res: any) => {
      console.log('getERPDep - res  = ', res);
      this.depList = res.body.dep;
    });
  }

  createForm() {
    this.invalidForm = this.fb.group({
      testerName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[\u4e00-\u9fa5_a-zA-Z\s whitespace. \s]+$'),
        ]),
      ],
      testerId: [''],
      testerEmail: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(80),
          Validators.pattern('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$'),
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
      { id: 'A', name: '博士' },
      { id: 'B', name: '碩士' },
      { id: 'C', name: '大學' },
      { id: 'D', name: '技術學院' },
      { id: 'E', name: '專科' },
      { id: 'F', name: '高中' },
    ];

    this.reminderDeadlineData = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
    ];
  }


  //==================================== Chips (面試官) ====================================================
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
    this.filteredInterviewer = this.interviewerCtrl.valueChanges.pipe(
      startWith(null),
      map((item: any | null) =>
        item ? this._filter(item) : this.interviewerList.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    console.log('add event' , event);

    if (this.interviewerArr.length < 5) {
      const input = event.input;
      const value = event.value;

      this.interviewerList.filter((item, index) => {
        console.log('filter item = ' , item);

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
    //若面試官數量小於0則顯示驗證紅底線
    if (this.interviewerArr.length <= 0) {
      this.updateValidity(true);
    }

    console.log('remove interviewerArr = ', this.interviewerArr);
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
    //若面試官數量大於0則去除驗證紅底線
    this.updateValidity(false);
    console.log('this.interviewerArr=', this.interviewerArr);
  }

  _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    //若面試官數量大於0則去除驗證紅底線
    this.updateValidity(false);
    return this.interviewerList.filter(
      (item) => item.empName.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
