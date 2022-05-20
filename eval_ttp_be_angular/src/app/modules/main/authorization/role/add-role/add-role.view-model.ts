import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MatTableDataSource } from '@angular/material/table';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoadingService } from 'src/app/common/services/loading.service';
import { RoleDataReq } from 'src/app/models/RoleModel';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';
import {
  FunctionResBody,
  FunctionType,
} from 'src/app/models/RoleModels/Search-RoleModel';
import { checkSort } from 'src/app/enum/checkBox.enum';

@Injectable({
  providedIn: 'root',
})
export class AddRoleViewModel extends BaseViewModel {
  roleFilter!: string;
  functionResBody: FunctionResBody[] = [];
  functionType: FunctionType[] = [];
  functionName: Function[] = [];
  dataSource = new MatTableDataSource<FunctionResBody>(this.functionResBody);
  dataFunctionType = new MatTableDataSource<FunctionType>(this.functionType);
  dataFunctionName = new MatTableDataSource<Function>(this.functionName);
  displayedColumns!: string[];
  funcId: string[] = [];



  invalidForm!: FormGroup;

  required: boolean = false;
  newRole!: RoleDataReq;
  roleForm!: FormGroup;

  add!: boolean;
  edit!: boolean;
  delete!: boolean;
  view!: boolean;
  viewCheck!: ['edit', 'delete', 'view'];
  allComplete: boolean = false;
  complete: boolean = false;
  checkSort: typeof checkSort = checkSort;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private RoleService: RoleService,
    private router: Router
  ) {
    super();
  }

  init(): void {
    this.blank();
    this.displayedColumns = ['authName', 'operating'];
    this.getAllData();
    this.createForm();
  }
  blank(){
    this.dataFunctionType.data.length = 0;
    this.dataFunctionType.data = [];
  }


  getAllData() {
    this.RoleService.getAllFunction(null).subscribe((res) => {
      this.dataFunctionType.data = res.body?.functionType as FunctionType[];
      this.loadingService.hide();
      this.processData();
    });
  }

  checkCheckboxRequired() {
    this.required = true;
    this.dataFunctionType.data.forEach((item) => {
      if (item.function.some((child) => child.value)) {
        this.required = false;
      }
    });
  }

  processData() {

    this.dataFunctionType.data.forEach((item, index) => {
      //取得權限名稱
      item.authName = item.funcName.substring(0, item.funcName.length - 2);

      item.function.forEach((child) => {
        child.sort = this.processCheckboxSort(child.funcId.split('.')[1]);
        child.value = false;
      });

      item.function.sort((a, b) => {
        return (a.sort as number) - (b.sort as number);
      });

    });

  }

  //enum排序
  processCheckboxSort(id: string) {
    switch (id) {
      case 'add':
        return checkSort.add;
      case 'edit':
        return checkSort.edit;
      case 'delete':
        return checkSort.remove;
      case 'view':
        return checkSort.view;
      default:
        return 0;
    }
  }

  createForm() {
    this.invalidForm = this.fb.group({
      roleName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(30)]),
      ],
    });
  }

  checkEvent($event: boolean, id: string, index: number) {
    if ($event) {
      if (id.includes('add') || id.includes('edit') || id.includes('delete')) {
        const targetIndex = this.dataFunctionType.data[
          index
        ].function.findIndex((item) => item.funcId.includes('view'));
        this.dataFunctionType.data[index].function[targetIndex].value = true;
      }
    }
    this.checkCheckboxRequired();
  }

  // 新增角色
  insertData(addRoleform: any) {

    this.dataFunctionType.data.forEach((item) => {
      item.function.forEach((child) => {
        if (child.value) {
          this.funcId.push(child.funcId);
        }
      });
    });

    this.RoleService.addRole({
      roleName: this.invalidForm.value.roleName,
      funcId: this.funcId,

    }).subscribe((result) => {

      this.router.navigate(['/main/authorization/role']);

    });
  }
}
