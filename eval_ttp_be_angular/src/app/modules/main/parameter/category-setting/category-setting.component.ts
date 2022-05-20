import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { LoadingService } from 'src/app/common/services/loading.service';
import { CategorySetttingViewModel } from './category-setting.view-model';
import {
  MatDialog,
  throwMatDialogContentAlreadyAttachedError,
} from '@angular/material/dialog';
import { AlertService } from 'src/app/common/services/alert.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-setting',
  templateUrl: './category-setting.component.html',
  styleUrls: ['./category-setting.component.scss'],
})
export class CategorySettingComponent extends VMComponent<CategorySetttingViewModel> {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor(
    private item: CategorySetttingViewModel,
    private dialog: MatDialog,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    super(item);
  }
  ngOnInit() {
    this.vm.init();
    this.vm.getCategory();
  }
  search($event: MouseEvent) {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
    console.log($event);
    if ($event) {
      this.vm.isClick = true;
    }
    this.vm.getCategory();
  }
  add() {
    console.log('新增題目類型');
  }

  deleteCategory(id: number) {
    Swal.fire({
      title: '確認是否刪除',
      text: '此題目類別將於確認後刪除，請確認是否仍要執行刪除作業？',
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true,
    }).then((res) => {
      if (res.value === true) {
        this.vm.deleteCategory(id);
      }
    });
  }

  public handleDismiss(dismissMethod: string): void {
    console.log(dismissMethod);
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

  ngAfterViewInit() {
    //this.vm.dataSource.paginator = this.paginator as any;
  }
}
