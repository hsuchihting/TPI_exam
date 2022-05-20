import { LoadingService } from 'src/app/common/services/loading.service';
import { Component} from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditPositionViewModel } from './addEditPosition.view-model';

@Component({
  selector: 'app-add-position',
  templateUrl: './addEditPosition.component.html',
  styleUrls: ['./addEditPosition.component.scss'],
})
export class AddEditPositionComponent extends VMComponent<AddEditPositionViewModel> {
  id!: number;
  constructor(
    private item: AddEditPositionViewModel,
    private LoadingService: LoadingService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(item);
  }

  ngOnInit() {
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
      if (this.vm.positionForm.invalid) {
        this.alertService.error('儲存失敗！');
        return;
      } else {
        this.vm.addPosition();
        this.alertService.success('儲存成功！');
        this.router.navigate(['/main/parameter/position-setting']);
      }
    }else{
      //編輯儲存
      console.log(456)
      if(this.vm.positionForm.invalid){
        this.alertService.error('儲存失敗！');
        return;
      }
      else{
        this.vm.editPosition();
        this.alertService.success('儲存成功！');
        this.router.navigate(['/main/parameter/position-setting']);
        this.vm.getPosition();
      }
    }
  }
  addEditCancel() {
    this.router.navigate(['/main/parameter/position-setting']);
  }
}
