import { Component, OnInit } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { RoleViewModel } from './role.view-model';
import { LoadingService } from 'src/app/common/services/loading.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { RoleDataRes } from 'src/app/models/RoleModel';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent extends VMComponent<RoleViewModel> {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  rolesList!: RoleDataRes[];

  ngOnInit() {
    this.vm.init();
  }

  ngAfterViewInit() {
    // this.vm.dataSourceChild.paginator = this.paginator as any;
  }

  constructor(
    private item: RoleViewModel,
    private loadingService: LoadingService
  ) {
    super(item);
  }

  search() {
    this.vm.getAllData();
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }

  add() {
    console.log('新增角色');
  }
}
