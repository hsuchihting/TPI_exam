import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';
import { PositionSettingViewModel } from './position-setting.view-model';

@Component({
  selector: 'app-position-setting',
  templateUrl: './position-setting.component.html',
  styleUrls: ['./position-setting.component.scss'],
})
export class PositionSettingComponent extends VMComponent<PositionSettingViewModel> {
  @ViewChild(MatPaginator, { static: true }) paginator:
  | MatPaginator
  | undefined;
@ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  constructor(
    private item: PositionSettingViewModel,
    private dialog: MatDialog,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private router: Router,
  ) {
    super(item);
  }

  OnInit(){
    this.vm.init();
    this.vm.getPosition();
  }

  search($event: MouseEvent) {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
    if($event){
      this.vm.isClick = true;
    }
    this.vm.getPosition();
    console.log(this.vm.positionFilter);
  }
  add() {
    console.log('新增職務別');
  }

  delete(id: number){
    Swal.fire({
      title: '確認是否刪除',
      text: '此職務別將於確認後刪除，請確認是否仍要執行刪除作業？',
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true
    }).then(res => {
      if(res.value === true){
        this.vm.deletePosition(id);
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
