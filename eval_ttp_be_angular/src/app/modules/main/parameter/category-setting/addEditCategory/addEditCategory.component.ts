import { AddEditCategoryViewModel } from './addEditCategory.view-model';
import { LoadingService } from 'src/app/common/services/loading.service';
import { VMComponent } from 'src/app/common/base/vm.component';
import { Component} from '@angular/core';
import { AlertService } from 'src/app/common/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addEditCategory',
  templateUrl: './addEditCategory.component.html',
  styleUrls: ['./addEditCategory.component.scss']
})
export class AddEditCategoryComponent extends VMComponent<AddEditCategoryViewModel> {
  id!:number
  constructor(
    private item: AddEditCategoryViewModel,
    private LoadingService: LoadingService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(item);
  }

  addEditSave(){
     this.route.queryParams.subscribe((queryParams) => {
       this.id=(queryParams['id']);
    })

    if(this.id==null){
      //新增儲存
      console.log(123)
      if(this.vm.categoryForm.invalid){
        this.alertService.error('儲存失敗！');
        return;
      }
      else{
        this.vm.addCategory();
        this.router.navigate(['/main/parameter/category-setting']);
      }

    }
    else{
      // 編輯儲存
      console.log(465)
      if(this.vm.categoryForm.invalid){
        this.alertService.error('儲存失敗！');
        return;
      }
      else{
      this.vm.editCategory();
      this.router.navigate(['/main/parameter/category-setting']);
      this.vm.getCategory();
      }
    }
  }

  addEditCancel(){
    this.router.navigate(['/main/parameter/category-setting']);
  }

  ngOnInit(){
    this.vm.init();
  }

  ngOnDestroy(): void {
    this.vm.destroy();
  }
}
