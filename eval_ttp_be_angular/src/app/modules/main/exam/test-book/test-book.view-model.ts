import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { AlertService } from 'src/app/common/services/alert.service';
import {Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { BaseViewModel } from "src/app/common/base/base.view-model";
import { LoadingService } from "src/app/common/services/loading.service";
import { TestsGroup } from "src/app/models/testBookModels/GetTestsGroupListModel";
import { TestBookService } from "../test-book.service";
import { MessageService } from '../message.service';
import { PageEvent } from '@angular/material/paginator';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TestBookViewModel extends BaseViewModel {
  testBookFilter!: string;
  testBookForm!: FormGroup;
  testsGroupList: TestsGroup[] = [];
  dataSource = new MatTableDataSource<TestsGroup>(this.testsGroupList);
  displayedColumns!: string[];
  isClick = false;
  testBooksArr: any[] = [];
  testGroupArr: any[] = [];
  selected!: string;
  errorMsg!: string;
  pageSize = 10;
  currentPage = 1;
  pageLength = 0;


  constructor(
    private fb: FormBuilder,
    private testBookService: TestBookService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private alertService: AlertService,
    private router: Router
    )
    {
    super();
  }
  private _vm?: BaseViewModel;

  init(): void {
    this.displayedColumns = ['testsGroupId', 'testsGroupName', 'createDate', 'status','action'];
    this.isClick = false;
    this.getTestsGroupList();
    this.testBookFilter = '';
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getTestsGroupList();
  }

  /** 查詢題本清單 */
  getTestsGroupList(){
    if(this.selected===undefined){
      this.selected='';
    };
    //有按查詢按鈕
    if(this.isClick==true){
      this.testBookService.getTestsGroupList({testsGroupName: this.testBookFilter, status: this.selected, pageSize: this.pageSize, pageNum: this.currentPage}).subscribe((res)=>{
        console.log(this.selected);
        console.log(this.testBookFilter)
        console.log(res);
        this.testsGroupList = res.body?.pageData as TestsGroup[];
        this.dataSource.data = res.body?.pageData as TestsGroup[];
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        this.loadingService.hide();
      })
    }
    else{
      this.testBookService.getTestsGroupList({status: this.selected, pageSize: this.pageSize, pageNum: this.currentPage}).subscribe((res)=>{
        console.log(this.selected);
        console.log(res);
        this.testsGroupList = res.body?.pageData as TestsGroup[];
        this.dataSource.data = res.body?.pageData as TestsGroup[];
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        this.loadingService.hide();
      })
    }
  }

  /** 將要編輯的資料帶入編輯頁 */
  edit(testsGroupId: number){
    Swal.fire({
      title: '進行編輯',
      text: '是否進行編輯?',
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true,
    }).then((res) => {
      if (res.value === true) {
        this.testBooksArr[0] = testsGroupId;
        this.messageService.sendArrMessage(this.testBooksArr);
        this.router.navigate(['/main/exam/test-book/edit-tests-group']);
      }
    });
  }

  /** 刪除題本 */
  deleteTestsGroupList(id: string){
    this.testBookService.deleteTestGroup({testsGroupId: id}).subscribe((res)=>{
      console.log(res);
      if(res.header?.returnCode==='B0805'){
        this.alertService.error('此筆題本已有受測者使用或已被刪除!不可刪除');
      }
      else if(res.header?.returnCode==='B0801'){
        this.alertService.error('查無題本，請重新查詢!');
      }
      else{
        this.alertService.success('刪除成功！');
      }
      this.loadingService.hide();
      this.getTestsGroupList();
    })
  }

  //檢視按鈕
  view(testGroupId: number){
    this.testGroupArr[0] = testGroupId;
    console.log(this.testGroupArr[0]);
    this.messageService.sendArrMessage(this.testGroupArr);
  }

  /** 編輯題本狀態 EB080302 */
  editStatus(status: string, testsGroupId: string){
    this.testBookService.editTestGroupStatus({testsGroupId: testsGroupId, status: status}).subscribe((res)=>{
      console.log(res);
      if(res.header?.returnCode==='B0804'){
        this.alertService.error('已有受測者使用此題本，不可以停用!');
      }
      else if(res.header?.returnCode==='B0801'){
        this.alertService.error('查無題本，請重新查詢!');
      }
      this.getTestsGroupList();
    })
  }
}
