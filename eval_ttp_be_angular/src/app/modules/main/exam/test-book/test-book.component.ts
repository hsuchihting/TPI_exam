import { AlertService } from './../../../../common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TestBookViewModel } from './test-book.view-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-book',
  templateUrl: './test-book.component.html',
  styleUrls: ['./test-book.component.scss'],
})
export class TestBookComponent extends VMComponent<TestBookViewModel> {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor(
    private item: TestBookViewModel,
    private loadingService: LoadingService,
    private alert: AlertService
  ) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
    this.vm.getTestsGroupList();
  }

  /** 查詢按鈕 */
  search($event: MouseEvent) {
    if ($event) {
      this.vm.isClick = true;
      this.vm.getTestsGroupList();
    }
  }

  /** 新增按鈕 */
  add() {}

  /** 刪除按鈕 */
  deleteCategory(id: string) {
    Swal.fire({
      title: '確認刪除',
      html:
        '<p>請確認是否進行刪除？</p><p style="color:red">※請注意刪除後將無法復原</p>',
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true,
    }).then((res) => {
      if (res.value === true) {
        this.vm.deleteTestsGroupList(id);
      }
    });
  }

  ngAfterViewInit() {
    //this.vm.dataSource.paginator = this.paginator as any;
  }
}
