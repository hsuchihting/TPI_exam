import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';
import { EmployeeStatusViewModel } from './employee-status.view-model';

@Component({
  selector: 'app-employee-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.scss']
})
export class EmployeeStatusComponent extends VMComponent<EmployeeStatusViewModel> {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
    constructor(
      private item: EmployeeStatusViewModel,
      private dialog: MatDialog,
      private alertService: AlertService,
      private loadingService: LoadingService) { super(item); }

      OnInit(){
        this.vm.init();
        this.vm.getEmployment();
      }

    search($event: MouseEvent) {
      this.loadingService.show();
      setTimeout(() => {
        this.loadingService.hide();
      }, 2000);
      if($event){
        this.vm.isClick = true;
      }
      this.vm.getEmployment();
      //this.vm.employmentFilter = '';
    }
    add() {
      console.log('新增就業狀況')
    }

    deleteEmployment(id: number){
      Swal.fire({
        title: '確認是否刪除',
        text: '此就業狀況將於確認後刪除，請確認是否仍要執行刪除作業？',
        icon: 'warning',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        showCancelButton: true
      }).then(res => {
        if(res.value === true){
          this.vm.deleteEmployment(id);
        }
      })
    }

    public handleDismiss(dismissMethod: string): void {
      console.log(dismissMethod);
      // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
      // ... do something
    }

    ngAfterViewInit() {
      //this.vm.dataSource.paginator = this.paginator as any;
      //this.vm.afterInit();
    }
  }
