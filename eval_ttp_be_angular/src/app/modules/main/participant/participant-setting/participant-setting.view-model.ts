import { Component, Directive, Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { ParticipantService } from '../participant.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  TesterList,
  TesterListRes,
} from 'src/app/models/participantModels/ParticipantSearchModel';
import * as moment from 'moment';
import { Dep } from 'src/app/models/ShareModel';

@Injectable({
  providedIn: 'root',
})
export class ParticipantSettingViewModel extends BaseViewModel {
  roleFilter!: string;
  displayedColumns!: string[];
  roles!: any[];
  role!: number | number[];
  multiple!: boolean;
  disabled!: boolean;
  required!: boolean;
  ParticipantList: TesterListRes[] = [];
  ParticipantListChild: TesterList[] = [];
  dataSource = new MatTableDataSource<TesterListRes>(this.ParticipantList);
  dataSourceChild = new MatTableDataSource<TesterList>(
    this.ParticipantListChild
  );
  randomStr!: string;
  invalidForm!: FormGroup;
  answerTestArr: Array<any> = [{ name: 'Java試卷' }, { name: '邏輯試卷' }];
  depList: Dep[] = [];

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
      'testerId',
      'depName',
      'testsGroupName',
      'testerNotify',
      'testEndDate',
      'operating',
    ];
    this.limitPickerDate();
    this.createForm();
    this.getERPDep();
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

  createForm() {
    this.invalidForm = this.fb.group({
      testerName: null,
      testerEmail: [
        null,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      notify: [null, Validators.pattern('^[0-9]*$')],
      testEndDateStart: null,
      testEndDateEnd: null,
      depId: null,
    });
  }

  getERPDep() {
    this.participantService.getERPDep(null).subscribe((res: any) => {
      console.log('getERPDep - res  = ', res);
      this.depList = res.body.dep;
    });
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getAllFormData();
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

    console.log('testerName = ', this.invalidForm.value.testerName);
    console.log('testerEmail = ', this.invalidForm.value.testerEmail);
    console.log('notify = ', this.invalidForm.value.notify);
    console.log('testEndDateStart = ', formatDateStart);
    console.log('testEndDateEnd = ', formatDateEnd);
    console.log('depId = ', this.invalidForm.value.depId);
    console.log('pageSize = ', this.pageSize);
    console.log('currentPage = ', this.currentPage);

    this.participantService
      .getTesterList({
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        isDesc: 'D',
        testerName: this.invalidForm.value.testerName,
        testerEmail: this.invalidForm.value.testerEmail,
        notify: this.invalidForm.value.notify,
        testEndDateStart: formatDateStart,
        testEndDateEnd: formatDateEnd,
        depId: this.invalidForm.value.depId,
      })
      .subscribe((result) => {
        this.dataSourceChild.data = result.body?.pageData as TesterList[];
        this.dataSourceChild.data.forEach((item) => {
          this.depList.forEach((child: any) => {
            if (child.depId == item.depName) {
              item.depTrueName = child.depName;
            }
          });

          //日期顯示轉換
          let now = moment(item.testEndDate, 'YYYY/MM/DD');
          let formatDate = now.format('YYYY/MM/DD');
          item.testEndDate = formatDate;
        });
        console.log('getTesterList res = ', this.dataSourceChild.data);
        this.pageLength = (result.body?.totalPages as number) * this.pageSize;
      });
  }
}
