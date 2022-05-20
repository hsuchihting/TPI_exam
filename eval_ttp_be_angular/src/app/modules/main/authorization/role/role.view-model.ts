import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RoleService } from './role.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { RoleMessageService } from './roleMessage.service';
import { Role, RoleResBody } from 'src/app/models/RoleModels/Search-RoleModel';

@Injectable({
  providedIn: 'root',
})
export class RoleViewModel extends BaseViewModel {
  roleFilter!: string;
  rolesList: RoleResBody[] = [];
  rolesList2: Role[] = [];
  dataSource = new MatTableDataSource<RoleResBody>(this.rolesList);
  dataSourceChild = new MatTableDataSource<Role>(this.rolesList2);

  displayedColumns!: string[];

  invalidForm!: FormGroup;

  required!: boolean;
  roleName!: string;
  roleMessageArray: any[] = [];

  pageSize = 10;
  currentPage = 1;
  pageLength = 0;

  constructor(
    private fb: FormBuilder,
    private RoleService: RoleService,
    private loadingService: LoadingService,
    private roleMessageService: RoleMessageService,
    http: HttpClient
  ) {
    super();
  }

  init(): void {
    this.displayedColumns = ['roleName', 'operating'];
    this.createForm();
    this.getAllData();

    console.log('string');
  }

  createForm() {
    this.invalidForm = this.fb.group({
      roleName: ['', Validators.maxLength(30)],
    });
  }

//模糊查詢
  search() {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
    this.getAllData();

  }

//動態分頁換頁
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getAllData();
  }

  //EB020101: 查詢所有角色成員 getRoleByRoleName
  getAllData() {
    this.RoleService.getRoleByRoleName({
      pageSize: this.pageSize,
      pageNum: this.currentPage,
      roleName: this.invalidForm.value.roleName,
    }).subscribe((res) => {
      this.rolesList = res as RoleResBody[];
      this.dataSource.data = this.rolesList;
      this.rolesList2 = res.body?.pageData as Role[];
      this.pageLength = (res.body?.totalPages as number) * this.pageSize;
      this.dataSourceChild.data = res.body?.pageData as Role[];
      this.loadingService.hide();
    });
  }

  //此頁帶值到下一頁
  onClickList(index: number) {
    this.roleMessageArray[0] = index;
    this.roleMessageArray[1] = this.rolesList2[index].roleName;
    this.roleMessageArray[2] = this.rolesList2[index].roleSeq;
    this.roleMessageService.sendMessage2(this.roleMessageArray);
  }
}

export interface RoleElement {
  roleName: string;
  editer: string;
  editDate: string;
}

export const ROLE_ELEMENT_DATA: RoleElement[] = [
  { roleName: '角色1', editer: '使用者1', editDate: '2020/12/12' },
  { roleName: '角色2', editer: '使用者2', editDate: '2020/10/12' },
];
