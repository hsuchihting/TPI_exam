import { EmailTmplDTO } from './../../../../models/Exam/Email';
import { ExamService } from './../exam.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { MessageService } from '../message.service';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator/paginator';

@Injectable({
  providedIn: 'root',
})
export class EmailViewModel extends BaseViewModel {
  roleFilter!: string;
  emailTemplate!: EmailTmplDTO[];
  dataSource = new MatTableDataSource<EmailTmplDTO>(this.emailTemplate);
  displayedColumns!: string[];
  selectedRole!: 'H'|'M'|'E';
  emailIndex!: number;
  emailArr: any[] = [];
  isSearched!: boolean;
  /** 動態分頁 */
  pageSize = 10;
  currentPage = 1;
  pageLength = 0;


  constructor(
    private examService: ExamService,
    private alertService: AlertService,
    private messageService: MessageService,
  ){
    super();
  }
  init(): void {
    this.displayedColumns = ['etSeq', 'etName', 'etTypeCode', 'operating'];
    this.getEmailList();
    this.isSearched = false;
    this.messageService.messageEvent.subscribe((msg: any) => {
      console.log('msg', msg);
      this.emailIndex = msg;
    })
  }
  /** 動態分頁 */
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getEmailList();
  }
  getEmailList(){
    console.log('from email',this.isSearched);
    if(this.isSearched === true){
      this.examService.getEmailTemplateList({etTypeCode: this.selectedRole, pageNum: this.currentPage, pageSize: this.pageSize}).subscribe(
        res => {
          this.emailTemplate = res.body?.pageData as EmailTmplDTO[];
          this.dataSource.data = this.emailTemplate;
          this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        }
      )
      return this.isSearched;
    }
    this.isSearched = false;
    this.emailArr[1] = this.isSearched;
    return this.examService.getEmailTemplateList({pageNum: this.currentPage, pageSize: this.pageSize}).subscribe(
      res => {
        console.log(res)
        this.emailTemplate = res.body?.pageData as EmailTmplDTO[];
        this.dataSource.data = this.emailTemplate;
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
      }
    )
  }
  getEmail(index: number){
    this.messageService.sendMessage(index);
  }
  editViewEmail(index: number){
    this.emailArr[0] = index;
    this.messageService.sendArrMessage(this.emailArr);
  }
  deleteEmail(index: number){
    Swal.fire({
      title: '確定要刪除嗎？',
      text: '此Email範本將於確認後刪除，請確認是否仍要執行\n刪除作業',
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true
    }).then( res => {
      if(res.value === true){
        this.getEmail(index);
        console.log('index', index)
        this.examService.deleteEmailTemplate({etSeq: index}).subscribe(
          res => {
            console.log(res);
            this.getEmailList();
            this.alertService.success('刪除成功');
          }
        )
      }
      return Swal.close
    })
  }
}
// assign emailTemplate to resBody now
export const ROLE_ELEMENT_DATA: EmailTmplDTO[] = [
  { "etSeq": 1 ,"etName": 'JAVA測驗通知', "etType": '受測者'},
  { "etSeq": 2 ,"etName": 'Vue測驗通知', "etType": '受測者'},
  { "etSeq": 3 ,"etName": 'JAVA測驗通知', "etType": 'HR'},
  { "etSeq": 4 ,"etName": '.Net測驗通知', "etType": '主管'},
  { "etSeq": 5 ,"etName": '邏輯測驗', "etType": 'HR'},
  { "etSeq": 6 ,"etName": '邏輯測驗', "etType": '受測者'},
];
