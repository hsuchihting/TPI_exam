import { Component, Directive, Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Hr,
  TesterResult,
  TesterResultRes,
  TestsGroup,
  Title,
} from 'src/app/models/participantModels/TestResultModel';
import * as moment from 'moment';
import { Dep } from 'src/app/models/ShareModel';
import { isNgTemplate } from '@angular/compiler';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TestResultViewModel extends BaseViewModel {
  roleFilter!: string;
  displayedColumns!: string[];
  roles!: any[];
  role!: number | number[];
  multiple!: boolean;
  disabled!: boolean;
  required!: boolean;
  ParticipantList: TesterResultRes[] = [];
  ParticipantList2: TesterResult[] = [];
  dataSource = new MatTableDataSource<TesterResultRes>(this.ParticipantList);
  dataSourceChild = new MatTableDataSource<TesterResult>(this.ParticipantList2);

  randomStr!: string;

  invalidForm!: FormGroup;

  depList: Dep[] = [];
  testStatusData!: any[];
  setTestStatus!: string;

  hrList: Hr[] = [];
  testsGroupList: TestsGroup[] = [];
  titleList: Title[] = [];

  //分頁
  pageSize = 10;
  currentPage = 1;
  pageLength = 0;

  //限制系統日期
  minDate!: Date;
  maxDate!: Date;

  constructor(
    private participantService: ParticipantService,
    private loadingService: LoadingService,
    private fb: FormBuilder
  ) {
    super();
  }

  init(): void {
    this.displayedColumns = [
      'id',
      'testerName',
      'testerEmail',
      'testsGroupName',
      'testStatus',
      'createUser',
      'testEndDate',
      'departent',
      'titleNameCh',
    ];
    this.limitPickerDate();
    this.createForm();
    this.selectData();
    this.getERPDep();
    this.getInitTesterResult();
    this.getAllFormData();

  }

  //限制查詢時間為系統日往前4年之歷史資料
  limitPickerDate() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); //0 開始（一月）到 11 （十二月）
    const currentDate = new Date().getDate(); //回傳本地時間月份中的日期（1-31）
    this.minDate = new Date(currentYear - 4, currentMonth, currentDate);
    //this.maxDate = new Date(currentYear + 20, 11, 31);
  }

  selectData() {
    this.testStatusData = [
      { id: 'Y', name: '已施測' },
      { id: 'N', name: '未施測' },
      { id: 'P', name: '施測不完全' },
    ];
  }

  createForm() {
    this.invalidForm = this.fb.group({
      testerName: null,
      testerEmail: [
        null,
        Validators.pattern(
          '^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$'
        ),
      ],
      titlePmSeq: null,
      testStatus: null,
      testEndDateStart: null,
      testEndDateEnd: null,
      depId: null,
      testsGroupSeq: null,
      hrId: null,
    });
  }

  getERPDep() {
    this.participantService.getERPDep(null).subscribe((res: any) => {
      console.log('getERPDep - res  = ', res);
      this.depList = res.body.dep;
    });
  }

  getInitTesterResult() {
    this.participantService.initGetTesterResult(null).subscribe((res) => {
      console.log('initGetTesterResult - res = ', res);
      this.hrList = res.body?.hr as Hr[];
      this.testsGroupList = res.body?.testsGroup as TestsGroup[];
      this.titleList = res.body?.title as Title[];
    });
  }

  getAllFormData() {
    //時間轉換
    let formatDateStart = '';
    let formatDateEnd = '';
    if (
      this.invalidForm.value.testEndDateStart == null ||
      this.invalidForm.value.testEndDateEnd == null
    ) {
      formatDateStart = '';
      formatDateEnd = '';
    } else {
      let nowStart = moment(
        this.invalidForm.value.testEndDateStart,
        'YYYYMMDD'
      );
      formatDateStart = nowStart.format('YYYYMMDD');
      let nowEnd = moment(this.invalidForm.value.testEndDateEnd, 'YYYYMMDD');
      formatDateEnd = nowEnd.format('YYYYMMDD');
    }
    //console.log('formatDateStart =' ,formatDateStart )
    //console.log('formatDateEnd =' ,formatDateEnd )
    this.participantService
      .getTesterResult({
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        isDesc: 'D',
        testerName: this.invalidForm.value.testerName,
        testerEmail: this.invalidForm.value.testerEmail,
        titlePmSeq: this.invalidForm.value.titlePmSeq,
        testStatus: this.invalidForm.value.testStatus,
        testEndDateStart: formatDateStart,
        testEndDateEnd: formatDateEnd,
        depId: this.invalidForm.value.depId,
        testsGroupSeq: this.invalidForm.value.testsGroupSeq,
        hrId: this.invalidForm.value.hrId,
      })
      .subscribe((res) => {
        console.log('getTesterResult - res = ', res);
        this.dataSourceChild.data = res.body?.pageData as TesterResult[];
        this.dataSourceChild.data.forEach((item) => {
          //測驗狀態
          if (item.testStatus == 'Y') {
            item.testStatusName = '已施測';
          } else if (item.testStatus == 'N') {
            item.testStatusName = '未施測';
          } else {
            item.testStatusName = '施測不完全';
          }
          //施測者
          this.hrList.forEach((child: any) => {
            if (child.empId == item.createUser) {
              item.createUserName = child.empName;
            }
          });

          //應徵部門
          this.depList.forEach((child: any) => {
            if (child.depId == item.departent) {
              item.departentName = child.depName;
            }
          });

          //日期顯示轉換
          let now = moment(item.testEndDate, 'YYYY/MM/DD');
          let formatDate = now.format('YYYY/MM/DD');
          item.testEndDate = formatDate;

        });
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        this.loadingService.hide();
      });
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getAllFormData();
  }

  deleteData(id: number) {
    // this.participantService.deleteData(id).subscribe((data) => {
    //   console.log(data);
    //   console.log('formData = ', this.formData);
    // });
  }
}

// export interface resultElement {
//   id:number,
//   testerName: string;
//   testerEmail:string;
//   testsGroupName:string;
//   testStatus:string;
//   updateUser:string;
//   testDate:string;
//   departent:string;
//   titleNameCh:string;
// }

// export const RESULT_ELEMENT_DATA: resultElement[] = [
//   { id:1 , testerName: '王小明', testerEmail:'amy@gmail.com' ,testsGroupName:'昕秀測驗題本A',testStatus:'已施測',updateUser:'Jerry',testDate:'2021/05/22',departent:'金融科技創新應用處',titleNameCh:'JAVA工程師' },
//   { id:2 , testerName: '王小明', testerEmail:'amy@gmail.com' ,testsGroupName:'昕秀測驗題本B',testStatus:'已施測',updateUser:'Jerry',testDate:'2021/05/22',departent:'金融科技創新應用處',titleNameCh:'JAVA工程師'},
// ];
