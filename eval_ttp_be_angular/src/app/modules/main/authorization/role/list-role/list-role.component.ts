import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { RoleDataRes } from 'src/app/models/RoleModel';
import { AddRoleViewModel } from '../add-role/add-role.view-model';
import { ListRoleViewModel } from './list-role.view-model';
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent extends VMComponent<ListRoleViewModel> {
  @ViewChild(MatPaginator, { static: true }) paginator:
  | MatPaginator
  | undefined;
@ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
rolesList!: RoleDataRes[];
ngAfterViewInit() {
this.vm.dataSourceMember.paginator = this.paginator as any;
}
  constructor( private item: ListRoleViewModel,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {
    super(item);
  }
  ngOnInit(){
    this.vm.init();
  }
  ngOnDestroy(): void {
    this.vm.destroy();
  }


}
