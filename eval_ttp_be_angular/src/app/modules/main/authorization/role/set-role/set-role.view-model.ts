import { SharedModule } from './../../../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import {
  ComponentFactoryResolver,
  Injectable,
  AfterViewInit,
  TRANSLATIONS_FORMAT,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { LoadingService } from 'src/app/common/services/loading.service';

import { RoleService } from '../role.service';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { RoleDataRes } from 'src/app/models/RoleModel';
import { MatTableDataSource } from '@angular/material/table';
import {
  AuthResBody,
  Member,
  MemberResBody,
  Role,
  RoleResBody,
} from 'src/app/models/RoleModels/Search-RoleModel';
import { RoleMessageService } from '../roleMessage.service';
import {
  ERPEmpResBody,
  DepEmp,
  ERPDepResBody,
  Dep,
} from 'src/app/models/ShareModel';
import { stringify } from '@angular/compiler/src/util';
import { finalize, map, startWith } from 'rxjs/operators';
import { timeStamp } from 'node:console';
import { Router } from '@angular/router';
import { Key } from 'selenium-webdriver';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Input } from '@angular/core';

import { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SetRoleViewModel extends BaseViewModel {
  roleFilter!: string;

  //使用者 EB010102: 取得組織表
  erpDepResBody: ERPDepResBody[] = [];
  depArray: Dep[] = [];
  dataERPDepResBody = new MatTableDataSource<ERPDepResBody>(this.erpDepResBody);
  dataDepArray = new MatTableDataSource<Dep>(this.depArray);
  depId!: string;
  depName!: string | string[];
  depIdCheck!: string;

  //未授權人員 EB020104: 查詢未授權員工
  authResBody: AuthResBody[] = [];
  memberArray: Member[] = [];
  dataAuthResBody = new MatTableDataSource<AuthResBody>(this.authResBody);
  empEngNameData: any[] = [];
  memberArrayAll: Member[] = [];

  //已授權人員 EB020102: 查詢所有角色成員
  memberResBody: MemberResBody[] = [];
  memberData: Member[] = [];
  memberDataSubmit: Member[] = [];
  dataMemberResBody = new MatTableDataSource<MemberResBody>(this.memberResBody);
  dataMemberData = new MatTableDataSource<Member>(this.memberData);
  empIdArray: string[] = [];

  ERPEmpResBody: ERPEmpResBody[] = [];

  displayedColumns!: string[];
  rolesList: RoleDataRes[] = [];
  dataSourceRole = new MatTableDataSource<RoleDataRes>(this.rolesList);


  depData!: ERPEmpResBody[];
  depNames!: any[];
  depEmp: DepEmp[] = [];
  selectEmpData: MemberResBody[] = [];
  
  empNames!: any[];
  empName!: string | string[];
  empId!: string;
  empEmail!: string;
  selected: boolean = false;

  selectEmpDataArray: any[] = [];
  empEngFalseData: any[] = [];
  confirmed: any[] = [];
  multiple!: boolean;
  disabled!: boolean;
  required: boolean = false;
  i!: number;
  empEngName!: string;
  subscription!: Subscription;
  invalidForm!: FormGroup;

  filterdata1 = null;
  filterdata2 = null;

  searchText = '';
  status = 'Enable';
  getListIndex: any[] = [];
  roleName!: string;
  roleSeq!: string;
  chosenArray!: any[];
  myControl = new FormControl();
  selectClass!: any[];

  constructor(
    private fb: FormBuilder,
    private RoleService: RoleService,
    private loadingService: LoadingService,
    private roleMessageService: RoleMessageService,
    private router: Router,
    // private confirmedStations:Array<any>,
    http: HttpClient
  ) {
    super();
  }

  init(): void {
    this.blank();
    this.createForm();
    this.multiple = false;
    this.disabled = false;
    this.required = true;

    //get前一頁的值
    this.subscription = this.roleMessageService.messageEvent2.subscribe(
      (message: any) => {
        this.getListIndex = message;
        console.log('getListIndex = ', this.getListIndex);
      }
    );

    this.getAllData();
  }

  //清空陣列
  blank() {
    this.depId = '';
    this.filterdata1 = null;
    this.filterdata2 = null;

    this.depArray.length = 0;
    this.depArray = [];

    this.memberArray.length = 0;
    this.memberArray = [];

    this.memberData.length = 0;
    this.memberData = [];
  }

  //停止訂閱
  destroy() {
    this.subscription.unsubscribe();
    console.log('destroy');
  }

  createForm() {
    this.invalidForm = this.fb.group({
      roleName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(30)]),
      ],
    });
  }

  //使用者下拉選單 EB020104: 查詢未授權員工 getUnAuthEmpByDepId
  checkEvent(event: any) {
    console.log('event', event);

    this.RoleService.getUnAuthEmpByDepId({
      depId: event,
    }).subscribe((res) => {
      if (res.body && (res.body as MemberResBody)) {
        this.authResBody = res as AuthResBody[];
        this.dataAuthResBody.data = this.authResBody;
        this.memberArray = res.body?.member as Member[];
      }
      this.filterMember();
      this.loadingService.hide();
      console.log(res);
      this.memberArray.forEach((child) => {
        child.value = false;
      });
      console.log(this.memberArray);
    });

    this.checkListboxRequired();
  }

  getAllData() {
    //使用者 EB010102: 取得組織表  getERPDep 無req
    this.roleName = this.getListIndex[1];
    this.RoleService.getERPDep(null).subscribe((res) => {
      console.log(res);

      this.erpDepResBody = res as ERPDepResBody[];
      this.dataDepArray.data = res.body?.dep as Dep[];
      this.depArray = res.body?.dep as Dep[];

      this.invalidForm.patchValue({
        roleName: this.getListIndex[1],
      });

      console.log('depIdCheck', this.depIdCheck);

      this.checkListboxRequired();
      this.loadingService.hide();
    });

    //EB020102：查詢所有角色成員 getMemberByRoleSeq
    this.RoleService.getMemberByRoleSeq({
      roleSeq: this.getListIndex[2],
    }).subscribe((res) => {
      console.log('res', res);
      console.log('res.body', res.body);
      if ('member' in (res.body as MemberResBody) == true) {
        this.dataMemberData.data = res.body?.member as Member[];
        this.memberData = res.body?.member as Member[];
      }
      this.checkListboxRequired();
    });

    this.checkListboxRequired();
  }

  //將選取未授權傳至已授權
  doAdd() {
    console.log('for', this.memberArray);
    console.log('for memberArrayAll', this.memberArrayAll);

    for (var i = 0; i < this.memberArray.length; i++) {
      if (this.memberArray[i].value == true) {
        this.memberData.push(this.memberArray[i]);

        console.log('if', this.memberArray[i]);
        console.log(' this.memberData', this.memberData);
      }
      this.filterdata1 = null;
    }

    this.filterMember();

    //重新給「未授權人員」陣列value: false
    this.memberArray.forEach((child) => {
      child.value = false;
    });

    this.checkListboxRequired();
  }

  //已授權人員與未授權人員不可重複
  filterMember() {
    this.empIdArray = [];
    this.memberData.forEach((childItem) => {
      //已授權人員之empId放入empIdArray
      this.empIdArray.push(childItem.empId);

    });
    //未授權人員中，若與已授權人員之empId相同，故刪除
    for (let i = 0; i < this.empIdArray.length; i++) {
      var members = this.memberArray.filter((child, j) => {
        console.log(child.empId, this.empIdArray);
        if (child.empId == this.empIdArray[i]) {
          this.memberArray.splice(j, 1);
        }

        return child.empId == this.empIdArray[i];
      });

      console.log('members', members);
    }
    console.log('memberArray', this.memberArray);
  }

  //未授權listbox點擊
  toggleSelection(item: object, memberArray: Member[], index: number) {
    console.log(item);
    console.log(index);

    //點擊的陣列value
    const selectA = Object.values(item);
    console.log('selectA', selectA);

    this.memberArray.forEach((child, index) => {
      //selectA[0] = empId
      if (child.empId == selectA[0]) {
        child.value = !child.value;
      }
    });
  }

  //刪除已授權人員
  remove(index: number, item: object) {
    console.log(index);

    console.log(this.memberData);
    const selectB = Object.values(item);

    if (index > -1) {
      this.memberData.forEach((child, index) => {
        if (child.empId == selectB[0]) {
          this.memberData.splice(index, 1);
        }
      });
      //清空已授權人員查詢框
      this.filterdata2 = null;
    }
    this.checkListboxRequired();

    //刪除後重新呼叫 EB020104: 查詢未授權員工 getUnAuthEmpByDepId
    this.RoleService.getUnAuthEmpByDepId({
      depId: this.depId,
    }).subscribe((res) => {
      this.authResBody = res as AuthResBody[];
      this.dataAuthResBody.data = this.authResBody;
      this.memberArray = res.body?.member as Member[];

      this.filterMember();
      this.loadingService.hide();
      console.log(res);
      this.memberArray.forEach((child) => {
        child.value = false;
      });
    });
    return this.memberData;
  }

  //驗證已授權人員不為空值
  checkListboxRequired() {
    console.log(this.selectEmpDataArray.length);
    this.required = false;
    if (this.memberData.length < 1) {
      this.required = true;
    }
  }

  //儲存 EB020301: 編輯角色成員 editRoleMemberByRoleSeq 無resBody
  modifyRoleData(modifyFuncform: any) {
    this.memberDataSubmit = [];
    for (let i = 0; i < this.memberData.length; i++) {
      this.memberDataSubmit.push({
        empId: this.memberData[i].empId,
        empName: this.memberData[i].empName,
        empEnName: this.memberData[i].empEnName,
        empEmail: this.memberData[i].empEmail,
      });
    }

    this.RoleService.editRoleMemberByRoleSeq({
      roleSeq: this.getListIndex[2],
      roleName: this.invalidForm.value.roleName,
      member: this.memberDataSubmit,
    }).subscribe((result) => {
      console.log(result);

      //跳轉至角色清單
      this.router.navigate(['/main/authorization/role']);
    });
  }
}
