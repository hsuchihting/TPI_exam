import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { MessageService } from '../../message.service';
import { TestBookService } from '../../test-book.service';
import { TestsTypeSelect } from 'src/app/models/testBookModels/GetTestsTypeList';
import { TestsBasic } from 'src/app/models/testBookModels/GetTestsBasicList';
import { event } from 'jquery';
import { matchLangNum } from 'src/app/common/validator/checkLangNum';
import { TestsSelect } from 'src/app/models/testBookModels/GetTestsAdd';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { CdkColumnResizeModule } from '@ng-matero/extensions';

@Injectable({
  providedIn: 'root',
})
export class EditTestsGroupViewModel extends BaseViewModel {
  columns: string[] = [
    'testsId',
    'testsTypeName',
    'testsName',
    'testTime',
    'operating',
  ];
  subscription!: Subscription;
  getTestsGroupId: any[] = [];
  testsGroupId!: string | undefined;
  testsGroupName!: string | undefined;
  updateDatetime!: string | undefined;
  updateEmail!: string | undefined;
  updateUserName!: string | undefined;
  required!: boolean;
  editTestsGroupForm!: FormGroup;
  testsTypeList: TestsTypeSelect[] = [];
  testsTypeNumber!: string;
  testsBasicList: TestsBasic[] = [];
  testsIdNumber!: string;
  getTestsAddList: TestsSelect[] = [];
  dataSource = new MatTableDataSource<TestsSelect>(this.getTestsAddList);
  getTestsSelect: TestsSelect[] = [];
  testsIdList: string[] = [];
  viewTestsPaperArr: any[] = [];

  constructor(
    private testBookService: TestBookService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router
  ) {
    super();
  }
  private _vm?: BaseViewModel;

  init(): void {
    this.subscription = this.messageService.messageEvent.subscribe(
      (message: any) => {
        this.getTestsGroupId = message;
        console.log(message);
      }
    );
    this.creatForm();
    this.getTestsGroup();
    this.getTestsTypeList();
    this.required = true;
  }

  creatForm() {
    this.editTestsGroupForm = this.fb.group({
      testsGroupName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          matchLangNum,
        ]),
      ],
    });
  }

  //取得題本詳細資料 EB080102
  getTestsGroup() {
    this.testBookService
      .getTestsGroup({ testsGroupId: this.getTestsGroupId[0] })
      .subscribe((res) => {
        if (res.body?.action === 'N') {
          this.alertService.error('此題本已進行施測或被刪除，不能編輯');
          this.router.navigate(['/main/exam/test-book']);
        } else if (res.header?.returnCode === 'B0801') {
          this.alertService.error('查無題本，請重新查詢!');
          this.router.navigate(['/main/exam/test-book']);
        } else {
          this.testsGroupId = res.body?.testsGroupId;
          this.updateDatetime = res.body?.updateDatetime;
          this.updateUserName = res.body?.updateUserName;
          this.updateEmail = res.body?.updateEmail;
          this.getTestsSelect = res.body?.testsSelectList as TestsSelect[];
          this.dataSource.data = this.getTestsSelect;
          console.log(this.getTestsSelect);
          this.editTestsGroupForm.patchValue({
            testsGroupName: res.body?.testsGroupName,
          });
        }
      });
  }

  /** 查詢題目類別清單(下拉選單) EB080105 */
  getTestsTypeList() {
    this.dataSource.data = [];
    this.getTestsAddList = [];
    this.testsIdList = [];

    this.testBookService
      .getTestsTypeList({ testsTypeStatus: 'N' })
      .subscribe((res) => {
        this.testsTypeList = res.body?.testsTypeList as TestsTypeSelect[];
        this.testsTypeNumber = this.testsTypeList[0].testsType;
        console.log(res);
      });
  }

  /** 查詢試卷清單(下拉選單) EB080106 */
  seletTestsType() {
    this.testBookService
      .getTestsBasicList({ testsType: this.testsTypeNumber, testsStatus: 'Y' })
      .subscribe((res) => {
        this.testsBasicList = res.body?.testsBasicList as TestsBasic[];
        this.testsIdNumber = this.testsBasicList[0].testsId;
        console.log(res);
      });
  }

  //添加試卷按鈕 EB080104
  addTestsList() {
    this.testBookService
      .getTestsAdd({ testsId: this.testsIdNumber, testsStatus: 'Y' })
      .subscribe((res) => {
        console.log(res);
        console.log(this.getTestsAddList.length);
        console.log(this.getTestsSelect.length);
        if (
          this.getTestsAddList.length === 0 &&
          this.getTestsSelect.length === 0
        ) {
          this.getTestsAddList = res.body?.testsSelect as TestsSelect[];
          this.dataSource.data = this.getTestsAddList;
        } else {
          if (this.getTestsSelect.length !== 0) {
            console.log('this.getTestsSelect', this.getTestsSelect);
            this.getTestsSelect.push(res.body?.testsSelect[0] as TestsSelect);
            console.log('this.getTestsSelect', this.getTestsSelect);
            this.dataSource.data = this.getTestsSelect;
            console.log('dataSource', this.dataSource.data);
          } else {
            this.getTestsAddList.push(res.body?.testsSelect[0] as TestsSelect);
            console.log('this.getTestsAddList', this.getTestsAddList);
            this.dataSource.data = this.getTestsAddList;
            console.log('dataSource', this.dataSource.data);
          }
        }
      });
  }

  /** 編輯題本 EB080301 */
  editTestGroup() {
    this.dataSource.data.forEach((item) => {
      this.testsIdList.push(item.testsId);
    });
    console.log(this.testsIdList);

    this.testBookService
      .editTestGroup({
        testsGroupId: this.getTestsGroupId[0],
        testsGroupName: this.editTestsGroupForm.value.testsGroupName,
        testsIdList: this.testsIdList,
      })
      .subscribe((res) => {
        console.log(res);
        const returnCode = res.header?.returnCode;
        const successMsg = '編輯成功！';

        if (returnCode === 'B9999') {
          this.alertService.error(res.header?.returnMsg);
        } else if (returnCode === 'B0802') {
          this.alertService.errorRepeat(res.header?.returnMsg);
        } else if (returnCode === 'B0803') {
          this.alertService.error('不可為空，請至少添加一筆試卷，請選取！');
        } else {
          this.alertService.success(successMsg);
          this.router.navigate(['/main/exam/test-book']);
        }
      });
  }

  //移除試卷按鈕
  deleteTestsPaper(id: string) {
    if (this.getTestsSelect.length === 0) {
      //方法一
      this.getTestsAddList.forEach(function (item, index, arr) {
        if (item.testsId === id) {
          arr.splice(index, 1);
        }
      });
      this.dataSource.data = this.getTestsAddList;
    } else {
      //原本資料已有試卷清單
      this.getTestsSelect.forEach(function (item, index, arr) {
        if (item.testsId === id) {
          arr.splice(index, 1);
        }
      });
      this.dataSource.data = this.getTestsSelect;
    }
    //方法二
    // this.getTestsAddList = this.getTestsAddList.filter(function (item) {
    //   return item.testsId !== id;
    // });
    // this.dataSource.data = this.getTestsAddList;
  }

  //檢視按鈕
  viewTestsPaper(testId: string) {
    /** 查詢試卷 EB080103*/
    this.testBookService.getTests({testsId: testId}).subscribe((res)=>{
      if(res.header?.returnCode==='B0001' || res.header?.returnCode==='B0701'){
        this.alertService.error(res.header.returnMsg);
      }else{
        this.viewTestsPaperArr[0] = testId;
        this.messageService.sendArrMessage(this.viewTestsPaperArr);
        this.router.navigate(['/main/exam/test-paper/view-paper']);
      }
    })
  }

  //表格拖曳功能
  onDrop(event: CdkDragDrop<TestsSelect[]>) {
    const prevIndex = this.getTestsAddList.findIndex((d) => {
      d === event.item.data;
      console.log('d', d);
    });
    console.log('from onDrop', this.dataSource.data);
    moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
    //console.log('table', this.table);
    this.dataSource.data = this.dataSource.data.slice();
  }

  //取得下拉選單的值
  selectedTestsType($event: any) {
    this.seletTestsType();
    console.log(this.testsTypeNumber);
  }
  selectedTests($event: any) {
    console.log(this.testsIdNumber);
  }
}
