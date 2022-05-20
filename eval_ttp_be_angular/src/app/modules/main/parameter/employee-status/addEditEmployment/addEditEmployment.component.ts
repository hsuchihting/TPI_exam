import { LoadingService } from '../../../../../common/services/loading.service';
import { Component} from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditEmploymentViewModel } from './addEditEmployment.view-model';

@Component({
  selector: 'app-addEditEmployment',
  templateUrl: './addEditEmployment.component.html',
  styleUrls: ['./addEditEmployment.component.scss'],
})
export class AddEditEmploymentComponent extends VMComponent<AddEditEmploymentViewModel> {
  id!: number;
  constructor(
    private item: AddEditEmploymentViewModel,
    private LoadingService: LoadingService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(item);
  }

  ngOnInit(){
    this.vm.init();
  }

  ngOnDestroy(): void {
    this.vm.destroy();
  }

  addEditSave() {
    this.route.queryParams.subscribe((queryParams) => {
      this.id = queryParams['id'];
    });

    if (this.id == null) {
      //新增儲存
      console.log(123);
      if (this.vm.employmentForm.invalid) {
        this.alertService.error('儲存失敗!');
        return;
      }
      else {
        this.vm.addEmployment();
        this.alertService.success('儲存成功！');
        this.router.navigate(['/main/parameter/employee-status']);
      }
    }
    else{
      //編輯儲存
      console.log(456)
      if(this.vm.employmentForm.invalid){
        this.alertService.error('儲存失敗！')
        return;
      }
      else{
        this.vm.editEmployment();
        this.alertService.success('儲存成功');
        this.router.navigate(['/main/parameter/employee-status']);
        this.vm.getEmployment();
      }
    }
  }
  addEditCancel() {
    this.router.navigate(['/main/parameter/employee-status']);
  }
}
