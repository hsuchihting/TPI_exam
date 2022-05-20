import { MessageService } from './../message.service';
import { ExamService } from './../exam.service';
import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { SystemElement } from 'src/app/models/SystemModel';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common/services/alert.service';
import { SysDescDTO } from 'src/app/models/Exam/System';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator/paginator';
@Injectable({
  providedIn: 'root',
})
export class SystemViewModel extends BaseViewModel{
  systemDescList!: SysDescDTO[];
  dataSource = new MatTableDataSource<SystemElement>(this.systemDescList);
  displayedColumns!: string[];
  systemArr: any[] = [];
  systemIndex!: number;
  statusBoolean: boolean = false;
  /** 動態分頁 */
  pageSize = 10;
  currentPage = 1;
  pageLength = 0;

  constructor(
    private alertService: AlertService,
    private examService: ExamService,
    private messageService: MessageService,
    ){
    super()
  }
  init(){
    this.displayedColumns = ['statusCode', 'sdId', 'updateTime', 'operating'];
    this.getSystemList();
    this.messageService.messageEvent.subscribe((msg:any) => {
      console.log('msg', msg);
      this.systemIndex = msg;
    })
  }
  /** 動態分頁 */
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getSystemList();
  }

  getSystemList(){
    this.examService.getSystemDescList({pageNum: this.currentPage, pageSize: this.pageSize}).subscribe(
      res=> {
        // console.log(res);
        this.systemDescList = res.body?.pageData as SysDescDTO[];
        this.dataSource.data = res.body?.pageData as SysDescDTO[];
        console.log(this.dataSource.data);
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
      }
    )
  }
  getSystem(index: string){
    this.messageService.sendMessage(index);
    console.log('index', index);
  }
  addSystem(){
    this.systemArr[1] = 0;
    this.messageService.sendArrMessage(this.systemArr);
  }
  editSystem(index: string){
    this.systemArr[0] = index;
    this.systemArr[1] = 1;
    this.messageService.sendArrMessage(this.systemArr)
  }
  deleteSystem(index: string){
    Swal.fire({
      title: '確定要刪除嗎？',
      text: '此系統說明將於確認後刪除，請確認是否仍要執行\n刪除作業',
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true
    }).then(res => {
      if(res.value === true){
        this.getSystem(index);
        this.examService.deleteSystemDesc({sdId: index}).subscribe(
          res => {
            console.log(res);
            this.getSystemList();
            this.alertService.success('刪除成功');
          }
        )
      }
    })
  }
}
// assign systemDescList to resBody now
export const SYSTEM_ELEMENT_DATA: SystemElement[] = [
  { statusCode: 'Y' ,sdId: '20210118121122033', updateTime: '2021/02/03 08:30:22' },
  { statusCode: 'N' ,sdId: '20210224256773245', updateTime: '2021/03/05 07:10:57' },
  { statusCode: 'Y' ,sdId: '20210304125649487', updateTime: '2021/02/26 20:23:34' },
]
