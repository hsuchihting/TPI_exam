import { AlertService } from 'src/app/common/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AddRoleViewModel } from './add-role.view-model';
import { LoadingService } from 'src/app/common/services/loading.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent extends VMComponent<AddRoleViewModel> {
  constructor(
    private item: AddRoleViewModel,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
    super(item);
  }

  ngOnInit() {
    this.vm.init();
  }



  submit(addRoleform: any) {
    this.ValidateAllFormFields(this.vm.invalidForm);

    this.vm.checkCheckboxRequired();

    if (!this.vm.invalidForm.valid) {
      this.alertService.error('請輸入角色名稱');
    } else if (this.vm.required) {
      this.alertService.error('未勾選權限');
    } else {
      this.alertService.success('新增成功');
      this.vm.insertData(addRoleform);
    }
  }
}
