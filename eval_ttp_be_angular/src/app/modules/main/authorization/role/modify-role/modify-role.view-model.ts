import { AlertService } from './../../../../../common/services/alert.service';
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
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { RoleMessageService } from '../roleMessage.service';
import { checkSort } from 'src/app/enum/checkBox.enum';

@Injectable({
  providedIn: 'root',
})
export class ModifyRoleViewModel extends BaseViewModel {
  roleFilter!: string;

  //EB020103: 查詢現有功能 getAllFunction 無reqBody
  functionResBody: FunctionResBody[] = [];
  functionType: FunctionType[] = [];
  functionName: Function[] = [];
  dataSource = new MatTableDataSource<FunctionResBody>(this.functionResBody);
  dataFunctionType = new MatTableDataSource<FunctionType>(this.functionType);
  dataFunctionName = new MatTableDataSource<Function>(this.functionName);

  //EB020105: 查詢角色功能權限 getRoleFunctionByRoleSeq
  functionResBody2: FunctionResBody[] = [];
  functionType2: FunctionType[] = [];
  functionName2: Function[] = [];
  dataSource2 = new MatTableDataSource<FunctionResBody>(this.functionResBody2);
  dataFunctionType2 = new MatTableDataSource<FunctionType>(this.functionType2);
  dataFunctionName2 = new MatTableDataSource<Function>(this.functionName2);

  displayedColumns!: string[];
  funcId: string[] = [];

  //畫面顯示dataSource
  datas: FunctionType[] = [];

  invalidForm!: FormGroup;
  required: boolean = false;

  add!: boolean;
  edit!: boolean;
  delete!: boolean;
  view!: boolean;
  viewCheck!: ['edit', 'delete', 'view'];
  allComplete: boolean = false;
  complete: boolean = false;

  items!: any[];
  item!: any[];
  sorting: any[] = [];
  subscription!: Subscription;
  getListIndex: any[] = [];
  roleName!: string;
  checkSort: typeof checkSort = checkSort;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private RoleService: RoleService,
    private router: Router,
    private alertService: AlertService,
    private roleMessageService: RoleMessageService
  ) {
    super();
  }

  init(): void {
    this.blank();
    this.displayedColumns = ['authName', 'operating'];
    this.subscription = this.roleMessageService.messageEvent2.subscribe(
      (message: any[]) => {
        this.getListIndex = message;
      }
    );
    this.getAllData();
    this.createForm();
  }

   //清空陣列
  blank(){
    this.datas.length = 0;
    this.datas = [] ;
  }

  //停止訂閱
  destroy(){
    this.subscription.unsubscribe();
  }

  getAllData() {
    this.roleName = this.getListIndex[1];

    this.RoleService.getAllFunction(null).subscribe((res) => {
      this.functionResBody = res as FunctionResBody[];
      this.dataSource.data = this.functionResBody;
      this.dataFunctionType.data = res.body?.functionType as FunctionType[];
      this.invalidForm.patchValue({
        roleName: this.getListIndex[1],
      });

      this.RoleService.getRoleFunctionByRoleSeq({
        roleSeq: this.getListIndex[2],
      })
        .pipe(
          finalize(() => {
            this.loadingService.hide();
          })
        )
        .subscribe((res) => {
          this.functionResBody2 = res as FunctionResBody[];
          this.dataSource.data = this.functionResBody2;
          this.dataFunctionType2.data = res.body
            ?.functionType as FunctionType[];
          console.log('data2', res);

          let funcId: string[] = [];
          this.dataFunctionType2.data.forEach((item) => {
            funcId = funcId.concat(item.function.map((child) => child.funcId));
          });
          this.processData(funcId);
        });
    });
  }

  processData(funcId: string[]) {
    this.dataFunctionType.data.forEach((item) => {
      item.authName = item.funcName.substring(0, item.funcName.length - 2);
      item.function.forEach((child) => {
        child.sort = this.processCheckboxSort(child.funcId.split('.')[1]);
        child.value = funcId.some((id) => id === child.funcId);
      });
      item.function.sort((a, b) => {
        return (a.sort as number) - (b.sort as number);
      });
      // this.sortArrayData = this.dataFunctionType.data;
      this.datas = this.dataFunctionType.data;
    });
  }

  //checkbox排序（enum)
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

  //角色名稱驗證
  createForm() {
    this.invalidForm = this.fb.group({
      roleName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(30)]),
      ],
    });
  }

  //checkbox驗證
  checkCheckboxRequired() {
    this.required = true;
    this.datas.forEach((item) => {
      if (item.function.some((child) => child.value)) {
        this.required = false;
      }
    });
  }

  //當「新增」或「編輯」或「刪除」勾起，「可視」也要勾起
  checkEvent($event: boolean, id: string, index: number) {
    if ($event) {
      if (id.includes('add') || id.includes('edit') || id.includes('delete')) {
        const targetIndex = this.datas[index].function.findIndex((item) =>
          item.funcId.includes('view')
        );
        this.datas[index].function[targetIndex].value = true;
      }
    }
    this.checkCheckboxRequired();
  }

  // 編輯
  modifyFuncData(modifyFuncform: any) {
    this.funcId = [];
    this.dataFunctionType.data.forEach((item) => {
      item.function.forEach((child) => {
        if (child.value) {
          this.funcId.push(child.funcId);
        }
      });
    });

    this.RoleService.ditRoleFuncByRoleSeq({
      roleSeq: this.getListIndex[2],
      roleName: this.invalidForm.value.roleName,
      funcId: this.funcId,
    }).subscribe((result) => {
      console.log(this.getListIndex[2]);
      console.log(this.funcId);
      console.log(this.invalidForm.value.roleName);
      this.router.navigate(['/main/authorization/role']);
    });
  }

  //固定排序
  // sortArray() {
  //   console.log(this.modifyRoleDatas);
  //   var items = this.modifyRoleDatas;
  //   console.log(this.sortArrayData);

  //   var sorting = [
  //     'role_setting.view',
  //     'email_setting.view',
  //     'sysdesc_setting.view',
  //     'privacy_setting.view',
  //     'tests_setting.view',
  //     'testsgroup_setting.view',
  //     'tester_setting.view',
  //     'testerresult_setting.view',
  //     'subject_setting.view',
  //     'title_setting.view',
  //     'employ_setting.view',
  //   ];

  //   console.log('this.modifyRoleDatas', this.modifyRoleDatas);
  //   console.log('Function:', this.modifyRoleDatas[0].function);

  //   sorting.forEach((key) => {
  //     var found = false;
  //     items = items.filter((item) => {
  //       if (!found && item['funcId'] == key) {
  //         this.modifyResult.push(item);
  //         found = true;
  //         return false;
  //       } else return true;
  //     });
  //   });
  //   console.log('this.modifyresult', this.modifyResult);
  //   this.dataModifyResult.data = this.modifyResult;
  //   console.log('this.dataModifyResult.data', this.dataModifyResult.data);

  // }
}
