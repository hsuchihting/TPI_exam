import { RoleMessageService } from './../roleMessage.service';
import { ListRoleModle } from './../../../../../models/RoleModel';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { BaseViewModel } from "src/app/common/base/base.view-model";
import { LoadingService } from "src/app/common/services/loading.service";
import { RoleDataRes, RoleModel } from "src/app/models/RoleModel";
import { RoleService } from '../role.service';
import { ERPEmpResBody } from 'src/app/models/ShareModel';
import { Subscription } from 'rxjs';
import { ValueTransformer } from '@angular/compiler/src/util';
import { DataSource } from '@angular/cdk/collections';
import { Member, MemberResBody } from 'src/app/models/RoleModels/Search-RoleModel';
import { PageEvent } from '@angular/material/paginator';



@Injectable({
  providedIn: 'root',
})
export class ListRoleViewModel extends BaseViewModel {
  roleFilter!: string;
  // formData!: MemberResBody[];
  rolesList: MemberResBody[] = [];
  memberList: Member[] = [];
  dataSource = new MatTableDataSource<MemberResBody>(this.rolesList);
  dataSourceMember = new MatTableDataSource<Member>(this.memberList)
  displayedColumns!: string[];

  roleName!: string;
  empDepName!: string;
  empEnName!: string;
  empEmail!: string;
  subscription!: Subscription;
  getListIndex: any[]= [];

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
    console.log(this.dataSourceMember)
    console.log(this.memberList)
  }

  init(): void {
    this.blank();
    console.log(this.dataSourceMember)
    this.displayedColumns = ['empDepName', 'empEnName','empEmail'];

    this.subscription = this.roleMessageService.messageEvent2.subscribe((message: any[]) => {
      this.getListIndex = message;
    });

    this.getAllData();

  }

   //清空陣列
  blank(){
    this.dataSourceMember.data.length = 0;
    this.dataSourceMember.data = [];
  }

  //停止訂閱
  destroy(){
    this.subscription.unsubscribe();
  }

//取得資料 EB020102: 查詢所有角色成員 getMemberByRoleSeq
  getAllData() {
    this.roleName = this.getListIndex[1]

    console.log(this.roleName)
    this.RoleService.getMemberByRoleSeq({
      roleSeq:this.getListIndex[2],

    }).subscribe((res) => {
      console.log(res);

      //適用於object
      if('member' in (res.body as MemberResBody) == true){
        this.dataSourceMember.data = res.body?.member as Member[];
      }

      //不適用於數字
      // if(res.body && res.body?.member){
      // }

      this.loadingService.hide();

  })

    }
  }

