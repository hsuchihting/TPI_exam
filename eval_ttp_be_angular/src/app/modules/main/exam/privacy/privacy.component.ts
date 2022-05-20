import { PrivacyViewModel } from './privacy.view-model';
import { Component, ViewChild } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatRadioChange } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { ExamService } from './../exam.service';
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent extends VMComponent<PrivacyViewModel> {
  // @ViewChild(MatPaginator)paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  /** 動態分頁 */
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor(
    private item: PrivacyViewModel,
    private examService: ExamService,
    ) {
    super(item)
   }
  ngOnInit(){
    this.vm.init();
  }
  ngAfterViewInit(){
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
        this.examService.editPrivacyPolicyStatus({ppId: this.vm.privacyPolicyList[Number(index)].ppId}).subscribe(
          () => {
            this.vm.getPrivacyList()
          }
        )
      }else{
        radioEvent.source.checked = false;
        return
      }
    }).finally(() => this.vm.getPrivacyList());
  }
}


