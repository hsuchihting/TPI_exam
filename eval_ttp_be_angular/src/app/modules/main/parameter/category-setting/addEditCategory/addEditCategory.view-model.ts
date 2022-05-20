import { ParameterMessageService } from './../../parameter-message.service';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from '../../parameter.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryEditDataReq } from 'src/app/models/parameterModels/CategoryEditModel';
import { SubjectTypeDTO } from 'src/app/models/parameterModels/CategorySearchModel';
import { Subscription } from 'rxjs';
import { hasChinese } from 'src/app/common/validator/chechWordLimitCh';
import { hasEnglish } from 'src/app/common/validator/ckeckWordLimitEn';
import { AlertService } from 'src/app/common/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AddEditCategoryViewModel extends BaseViewModel {
  addCategoryFilter!: string;
  categoryForm!: FormGroup;
  categoriesList: SubjectTypeDTO[] = [];
  id!: number;
  subscription!: Subscription;
  getListIndex: any[] = [];

  constructor(
    private parameterService: ParameterService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private parameterMessageService: ParameterMessageService,
    private alertService: AlertService,
  ) {
    super();
  }

  init(): void {
    this.createForm();

    this.route.queryParams.subscribe((queryParams) => {
      this.id = Number(queryParams['id']);
   })

    if(!isNaN(this.id)){
      this.subscription = this.parameterMessageService.messageEvent.subscribe(
        (message: any) => {
          this.getListIndex = message;
        }
      );
      this.getCategory();
    }
  }

  destroy(){
    //this.subscription.unsubscribe();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      stNameCh: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200),hasChinese]),
      ],
      stNameEn: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200),hasEnglish]),
      ],
    });
  }

  /** 編輯畫面顯示預設值(取得前一頁的值帶入) */
  getCategory() {
    this.categoryForm.patchValue({
            stNameCh: this.getListIndex[0].stNameCh,
            stNameEn: this.getListIndex[0].stNameEn,
          });
  }

  /** 新增題目類別 */
  addCategory() {
    this.parameterService
      .addCategory({
        stNameCh: this.categoryForm.value.stNameCh,
        stNameEn: this.categoryForm.value.stNameEn,
      })
      .subscribe((result) => {
        console.log(result);
        if(result.header?.returnCode=='B1001'){
           this.alertService.errorRepeat(result.header?.returnMsg);
        }
        else{
          this.alertService.success('儲存成功！')
        }
      });
  }

  /** 編輯題目類別 */
  editCategory() {
    this.parameterService
      .editCategory({
        stId: this.id,
        stNameCh: this.categoryForm.value.stNameCh,
        stNameEn: this.categoryForm.value.stNameEn
      })
      .subscribe((res) => {
        console.log(res);
        if(res.header?.returnCode=='B1001'){
          this.alertService.errorRepeat(res.header?.returnMsg);
       }
       else{
         this.alertService.success('儲存成功！');
       }
      });
  }
}
