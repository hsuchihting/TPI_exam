import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { RoleDataRes } from 'src/app/models/ui-data';
import { SetRoleViewModel } from './set-role.view-model';

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styleUrls: ['./set-role.component.scss'],
})
export class SetRoleComponent extends VMComponent<SetRoleViewModel> {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  rolesList!: RoleDataRes[];

  constructor(
    private item: SetRoleViewModel,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) {
    super(item);
  }

  // public vm: any;
  // ValidateAllFormFields(formGroup: FormGroup): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit() {
    this.vm.init();
  }
  
  ngOnDestroy(): void {
    this.vm.destroy();
  }

  submit(modifyFuncform: any) {
    this.ValidateAllFormFields(this.vm.invalidForm);

    this.vm.checkListboxRequired();

    if (!this.vm.invalidForm.valid) {
      this.alertService.error('請輸入角色名稱');
    } else if (this.vm.required) {
      this.alertService.error('未選取角色成員');
    } else {
      this.alertService.success('編輯成功');
      this.vm.modifyRoleData(modifyFuncform);

    }
  }
}
