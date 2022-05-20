import { MatTableDataSource } from '@angular/material/table';
import { PrivacyElement } from './../../../../models/SystemModel';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { Injectable } from "@angular/core";
import { ExamService } from '../exam.service';
import { PrivacyPolicyDTO } from 'src/app/models/Exam/Privacy';
import { AlertService } from 'src/app/common/services/alert.service';
import { MessageService } from '../message.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator/paginator';


@Injectable({
  providedIn: 'root'
})

export class PrivacyViewModel extends BaseViewModel{

  privacyPolicyList!: PrivacyPolicyDTO[];
  dataSource = new MatTableDataSource<PrivacyElement>(this.privacyPolicyList)
  displayedColumns!: string[];
  privacyArr: any[] = [];
  privacyIndex!: number;
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
    this.displayedColumns = ['statusCode', 'ppId', 'updateTime', 'operating'];
    this.getPrivacyList();
    this.messageService.messageEvent.subscribe((msg: any) => {
      console.log('msg', msg);
      this.privacyIndex = msg;
    })
  }
  /** 動態分頁 */
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getPrivacyList();
  }

  getPrivacyList(){
    this.examService.getPrivacyPolicyList({pageNum: this.currentPage, pageSize: this.pageSize}).subscribe(
      res=> {
        // console.log(res);
        this.privacyPolicyList = res.body?.pageData as PrivacyPolicyDTO[];
        this.dataSource.data = res.body?.pageData as PrivacyPolicyDTO[];
        console.log(this.dataSource.data);
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
      }
    )
  }

  getPrivacy(index: string){
    this.messageService.sendMessage(index);
  }

  addPrivacy(){
    this.privacyArr[1] = 0;
    this.messageService.sendArrMessage(this.privacyArr);
  }

  editPrivacy(index: string){
    this.privacyArr[0] = index;
    this.privacyArr[1] = 1;
    this.messageService.sendArrMessage(this.privacyArr);
  }

  deletePrivacy(index: string){
    Swal.fire({
      title: '確定要刪除嗎？',
      text: '此隱私權政策將於確認後刪除，請確認是否仍要執行\n刪除作業',
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true
    }).then(res => {
      if(res.value === true){
        this.getPrivacy(index);
        // console.log('from delete', index)
        this.examService.deletePrivacyPolicy({ppId: index}).subscribe(
          res => {
            let returnCode = res.header?.returnCode;
            if(returnCode === 'B0501'){
              return this.alertService.error('啟用狀態不可刪除')
            }
            this.getPrivacyList();
            this.alertService.success('刪除成功');
            return
          }
        )
      }
      return Swal.close
    })
  }

}

export const PRIVACY_ELEMENT_DATA: PrivacyElement[] = [
  { statusCode: 'Y' ,ppId: '20210118121122033', updateTime: '2021/02/03 08:30:22' },
  { statusCode: 'N' ,ppId: '20210224256773245', updateTime: '2021/03/05 07:10:57' },
  { statusCode: 'Y' ,ppId: '20210304125649487', updateTime: '2021/02/26 20:23:34' },
]
