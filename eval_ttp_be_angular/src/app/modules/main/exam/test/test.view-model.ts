import { TestDescDTO } from './../../../../models/Exam/Test';
import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MatTableDataSource } from '@angular/material/table';
import { ExamService } from '../exam.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { MessageService } from '../message.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator/paginator';

@Injectable({
  providedIn: 'root',
})

export class TestViewModel extends BaseViewModel{

  displayedColumns!: string[];
  testDescList!: TestDescDTO[];
  tdName!:string;
  dataSource = new MatTableDataSource<TestDescDTO>(this.testDescList);
  testIndex!: number;
  testArr: any[] = [];
  isSearched: boolean = false;
  /** 動態分頁 */
  pageSize = 10;
  currentPage = 1;
  pageLength = 0;

  constructor(
    private examService: ExamService,
    private alertService: AlertService,
    private messageService: MessageService,
  ){
    super()
  }

  init(){
    this.displayedColumns = ['tdSeq', 'tdName', 'statusCode', 'updateTime', 'operating'];
    this.getTestList();
    this.messageService.messageEvent.subscribe((msg:any)=>{
      console.log('msg', msg);
      this.testIndex = msg
    })
  }
  /** 動態分頁 */
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getTestList();
  }

  getTestList(){
    if(this.isSearched === true){
      const tdName = this.tdName === '' ? null : this.tdName;
      this.examService.getTestDescList({tdName: tdName! ,pageNum: this.currentPage, pageSize: this.pageSize}).subscribe(
        res => {
          console.log('search', res)
          this.testDescList = res.body?.pageData as TestDescDTO[];
          this.dataSource.data = res.body?.pageData as TestDescDTO[];
          console.log('dataSource', this.dataSource.data);
          this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        }
      );
      return this.isSearched;
    }
    this.isSearched = false;
    this.testArr[2] = this.isSearched;
    return this.examService.getTestDescList({pageNum: this.currentPage, pageSize: this.pageSize}).subscribe(
      res => {
        this.testDescList = res.body?.pageData as TestDescDTO[];
        this.dataSource.data = res.body?.pageData as TestDescDTO[];
        console.log('dataSource', this.dataSource.data);
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
      }
    );
  }

  getTest(index: number){
    this.messageService.sendMessage(index);
  }

  addTest(){
    this.testArr[1] = 0;
    this.messageService.sendArrMessage(this.testArr);
  }

  editViewTest(index: number){
    const tdName = this.tdName === '' ? null : this.tdName;
    this.testArr[0] = index;
    this.testArr[1] = 1;
    this.testArr[2] = this.isSearched;
    this.testArr[3] = tdName;
    this.messageService.sendArrMessage(this.testArr);
    this.isSearched = false;
  }

  deleteTest(index: number){
    Swal.fire({
      title: '確定要刪除嗎？',
      text: '此測驗說明將於確認後刪除，請確認是否仍要執行\n刪除作業',
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true
    }).then(res => {
      if(res.value === true){
        //this.getTest(index);
        console.log('from delete', index)
        this.examService.deleteTestDesc({tdSeq: index}).subscribe(
          res => {
            console.log(res);
            let returnCode = res.header?.returnCode;
            if(returnCode === 'B0501'){
              return this.alertService.error('啟用狀態不可刪除')
            }
            this.getTestList();
            this.alertService.success('刪除成功');
            return
          }
        )
      }
      return Swal.close
    })
  }

}

export const TEST_ELEMENT_DATA: TestDescDTO[] = [
  { tdSeq: 1, tdName: '這是測驗說明名稱' , statusCode: 'Y' , updateTime: '2021/02/03 08:30:22' },
  { tdSeq: 2, tdName: '這是測驗說明名稱' , statusCode: 'N' , updateTime: '2021/03/05 07:10:57' },
  { tdSeq: 3, tdName: '這是測驗說明名稱' , statusCode: 'Y' , updateTime: '2021/02/26 20:23:34' },
]
