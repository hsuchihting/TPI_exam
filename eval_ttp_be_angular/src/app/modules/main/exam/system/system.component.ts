import { SystemViewModel } from './system.view-model';
import { Component, ViewChild } from '@angular/core';
import { VMComponent } from './../../../../common/base/vm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatRadioChange } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExamService } from './../exam.service';
@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent extends VMComponent<SystemViewModel> {
  /** 動態分頁 */
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor(
    private item: SystemViewModel,
    private router: Router,
    private examService: ExamService,
    ) {
    super(item);
  }
  ngOnInit(){
    this.vm.init();
  }
  ngAfterInit(){
    //this.vm.dataSource.paginator = this.paginator as any;
  }
  changeRadioValue(radioEvent: MatRadioChange, index: number){
    radioEvent.source.checked = false;
    Swal.fire({
      title: '確定是否啟用',
      text: '此隱私權政策將於確認後啟用，請確認是否仍要執行\n啟用作業',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((res)=> {
      if(res.value === true){
        return this.examService.editSystemDescStatus({sdId: this.vm.systemDescList[Number(index)].sdId}).subscribe(
          () => {
            this.vm.getSystemList();
          }
        )
      }else{
        radioEvent.source.checked = false;
        return
      }
    }).finally(() => this.vm.getSystemList());
  }
}
