import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { RoleDataRes } from 'src/app/models/RoleModel';
import { ModifyRoleViewModel } from './modify-role.view-model';

@Component({
  selector: 'app-modify-role',
  templateUrl: './modify-role.component.html',
  styleUrls: ['./modify-role.component.scss'],
})
export class ModifyRoleComponent extends VMComponent<ModifyRoleViewModel> {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  rolesList!: RoleDataRes[];

  constructor(
    private item: ModifyRoleViewModel,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {
    super(item);
  }

  ngOnInit() {
    this.vm.init();
  }

  ngOnDestroy(): void {
    this.vm.destroy();
  }

  ngAfterViewInit() {
    this.vm.dataSource.paginator = this.paginator as any;
    this.vm.dataSource.sort = this.sort as any;
  }

  submit(modifyFuncform: any) {
    this.ValidateAllFormFields(this.vm.invalidForm);

    this.vm.checkCheckboxRequired();

    if (!this.vm.invalidForm.valid) {
      this.alertService.error('請輸入角色名稱');
    } else if (this.vm.required) {
      this.alertService.error('未勾選權限');
    } else {
      this.alertService.success('編輯成功');
      this.vm.modifyFuncData(modifyFuncform);
    }
  }
}
