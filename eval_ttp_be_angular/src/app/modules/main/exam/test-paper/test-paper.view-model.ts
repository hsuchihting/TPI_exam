import { AlertService } from 'src/app/common/services/alert.service';
import { MessageService } from './../message.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ExamService } from '../exam.service';
import { BaseViewModel } from 'src/app/common/base/base.view-model';

import {
  GetTestsListRes,
  Tests,
} from 'src/app/models/Exam/testPaper/getTestsListModel';
import { AddTestsQu } from 'src/app/models/Exam/testPaper/addTestModel';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class TestPaperViewModel extends BaseViewModel {
  //*變數
  testPaperList: GetTestsListRes[] = [];
  testPaperListChild: Tests[] = [];
  displayedColumns!: string[];
  testTypeArr: any[] = [];
  statusArr!: any[];
  addTestsQuList: AddTestsQu[] = [];
  testPaperArr: any[] = [];
  enableRadioBtn: boolean[] = [];
  disableRadioBtn: boolean[] = [];

  //labelPosition!: 'enable' | 'disable';
  //*表單匯入資料
  dataSource = new MatTableDataSource<GetTestsListRes>(this.testPaperList);
  dataSourceChild = new MatTableDataSource<Tests>(this.testPaperListChild);
  //* form 表單
  testPaper!: FormGroup;
  //分頁
  pageSize = 10;
  currentPage = 1;
  pageLength = 0;

  constructor(
    private examService: ExamService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private alertService: AlertService
  ) {
    super();
  }

  init() {
    this.createForm();
    this.displayColumns();
    this.getTestsTypeList();
    this.getTestsList();
    this.statusSelect();
  }

  statusSelect() {
    this.statusArr = [
      {
        id: '',
        name: '全部',
      },
      {
        id: 'Y',
        name: '啟用',
      },
      {
        id: 'N',
        name: '停用',
      },
    ];
  }
  createForm() {
    this.testPaper = this.formBuilder.group({
      testsType: '',
      testsName: '',
      status: '',
      memo: '',
    });
  }

  displayColumns() {
    this.displayedColumns = [
      'id',
      'testsTypeName',
      'testsName',
      'memo',
      'createDate',
      'status',
      'action',
    ];
  }

  //檢視按鈕
  view(testId: number) {
    this.testPaperArr[0] = testId;
    console.log(this.testPaperArr[0]);
    this.messageService.sendMessage(this.testPaperArr);
  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getTestsList();
  }

  getTestsList() {
    // console.log('testsType = ', this.testPaper.value.testsType);
    // console.log('testsName = ', this.testPaper.value.testsName);
    // console.log('status = ', this.testPaper.value.status);
    // console.log('memo = ', this.testPaper.value.memo);
    // console.log('pageSize = ', this.pageSize);
    // console.log('pageNum = ', this.currentPage);

    this.examService
      .getTestsList({
        testsType: this.testPaper.value.testsType,
        testsName: this.testPaper.value.testsName,
        status: this.testPaper.value.status,
        memo: this.testPaper.value.memo,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
      })
      .subscribe((res) => {
        // console.log('getTestsList=', res);
        this.dataSourceChild.data = res.body?.pageData as Tests[];
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        //this.setRadioValue();
      });
  }

  setRadioValue() {
    this.enableRadioBtn = [];
    this.disableRadioBtn = [];
    this.dataSourceChild.data.forEach((item, i) => {
      console.log('item.status = ', item.status);
      if (item.status == 'Y') {
        this.enableRadioBtn[i] = true;
        this.disableRadioBtn[i] = false;
      } else {
        this.enableRadioBtn[i] = false;
        this.disableRadioBtn[i] = true;
      }
    });
    console.log('enableRadioBtn = ', this.enableRadioBtn);
    console.log('disableRadioBtn = ', this.disableRadioBtn);
  }

  delPaper(index: number) {
    //console.log('testsId = ',this.dataSourceChild.data[index].testsId)
    this.examService
      .deleteTest({
        testsId: this.dataSourceChild.data[index].testsId,
      })
      .subscribe((res) => {
        if (res.header?.returnCode === 'B0000') {
          let successMsg = res.header.returnMsg;
          this.alertService.success(successMsg);
        }

        if (res.header?.returnCode === 'B0713') {
          let errorMsg = res.header.returnMsg;
          this.alertService.error(errorMsg);
        }
        this.getTestsList();
      });
  }

  getTestsTypeList() {
    this.examService
      .getTestsTypeList({
        testsTypeStatus: 'N',
      })
      .subscribe((res) => {
        if (res.body?.testsSelectList) {
          this.testTypeSelect(res);
        }
      });
  }

  testTypeSelect(res: any) {
    this.testTypeArr = res.body.testsSelectList;
    this.testTypeArr.unshift({
      testsType: '',
      testsTypeName: '全部',
    });
    // console.log('testTypeArr=', this.testTypeArr);
  }

  getTests() {
    this.examService
      .getTests({
        testsId: '20210330000000997',
      })
      .subscribe((res) => {
        console.log('getTests-res = ', res);
      });
  }
}
