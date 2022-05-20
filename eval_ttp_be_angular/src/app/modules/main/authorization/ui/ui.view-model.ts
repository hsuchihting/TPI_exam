import { Component, Directive, Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { editorLimit } from 'src/app/common/validator/checkEditorWordLimit';
import { RoleDataRes, RoleDataReq } from 'src/app/models/ui-data';
import { LoadingService } from 'src/app/common/services/loading.service';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../authorization.service';

@Injectable({
  providedIn: 'root',
})
export class UiViewModel extends BaseViewModel {
  roleData!: any[];
  roleFilter!: string;
  dateFilter!: Date;
  roleFilterdateFilter!: Date;
  displayedColumns!: string[];
  roles!: any[];
  role!: number | number[];
  multiple!: boolean;
  disabled!: boolean;
  required!: boolean;
  checked!: boolean;
  slide!: any;
  indeterminate!: boolean;
  labelPosition!: 'before' | 'after';
  roleForm!: FormGroup;
  rolesList: RoleDataRes[] = [];
  newRole!: RoleDataReq;
  dataSource = new MatTableDataSource<RoleElement>(ROLE_ELEMENT_DATA);
  constructor(
    private manageService: ManageService,
    private loadingService: LoadingService,
    private fb: FormBuilder
  ) {
    super();
  }

  init(): void {
    this.displayedColumns = ['roleName', 'editer', 'editDate', 'operating'];
    this.roleData = [
      {
        id: 222,
        name: 'HR',
      },
      {
        id: 3356,
        name: 'Admin',
      },
      {
        id: 8085,
        name: 'HR2',
      },
      {
        id: 3946,
        name: 'Admin2',
      },
      {
        id: 3140,
        name: 'Admin3',
      },
      {
        id: 3681,
        name: 'HR01',
      },
    ]
    this.dateFilter = new Date();
    this.roleFilterdateFilter = new Date();
    this.roles = [
      { id: 1, name: 'HR' },
      { id: 2, name: 'Admin' },
      { id: 3, name: 'EvalHR', disabled: true },
      { id: 4, name: 'AdminTest' },
    ];
    this.role = 1;
    this.multiple = false;
    this.disabled = false;
    this.required = true;
    this.checked = false;
    this.indeterminate = false;
    this.labelPosition = 'after';
    this.roleForm = this.fb.group({
      roleContent: ['', [Validators.required, editorLimit(2000, 'editor1')]],
      roleCode: ['', Validators.required],
      userName: ['', Validators.required],
    });
    this.loadingService.show();
    this.getRoles();
  }

  addRole() {
    this.loadingService.show();
    this.newRole = this.roleForm.value as RoleDataReq;
    this.manageService.addRole(this.newRole).subscribe(
      (res) => {
        this.newRole = new RoleDataReq();
        this.roleForm.reset();
        this.getRoles();
      },
    );
  }

  onMultiSelectChange() {
    this.role = this.multiple ? [2] : 2;
  }

  getRoles() {
    this.manageService.getRoles().subscribe(
      (res) => {
        this.rolesList = res as RoleDataRes[];
        this.loadingService.hide();
      }
    );
  }
}

export interface RoleElement {
  roleName: string;
  editer: string;
  editDate: string;
}

export const ROLE_ELEMENT_DATA: RoleElement[] = [
  { roleName: 'HR', editer: 'Kenny', editDate: '2012/03/03' },
  { roleName: 'HR', editer: 'Jimmy', editDate: '2012/03/03' },
  { roleName: 'HR', editer: 'Kenny', editDate: '2012/03/03' },
  { roleName: 'HR', editer: 'Lucy', editDate: '2012/03/03' },
  { roleName: 'HR', editer: 'Kenny', editDate: '2012/03/03' },
  { roleName: 'HR', editer: 'Jimmy', editDate: '2012/03/03' },
  { roleName: 'HR', editer: 'Lucy', editDate: '2012/03/03' },
  { roleName: 'HR', editer: 'Kenny', editDate: '2012/03/03' },
  { roleName: 'HR', editer: 'Lucy', editDate: '2012/03/03' },
  { roleName: 'HR', editer: 'Kenny', editDate: '2012/03/01' },
  { roleName: 'HR', editer: 'Lucy', editDate: '2012/03/01' },
  { roleName: 'HR', editer: 'Kenny', editDate: '2012/03/01' },
  { roleName: 'HR', editer: 'Lucy', editDate: '2012/03/02' },
  { roleName: 'Admin', editer: 'Kenny', editDate: '2012/03/03' },
];
