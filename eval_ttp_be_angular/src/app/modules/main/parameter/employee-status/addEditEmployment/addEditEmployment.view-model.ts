import { AlertService } from 'src/app/common/services/alert.service';
import { ParameterMessageService } from './../../parameter-message.service';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { LoadingService } from 'src/app/common/services/loading.service';
import { ParameterService } from '../../parameter.service';
import { EmploymentStatusDTO } from 'src/app/models/parameterModels/EmploymentSearchModel';
import { Subscription } from 'rxjs';
import { matchLangNum } from 'src/app/common/validator/checkWordLimit';

@Injectable({
  providedIn: 'root',
})
export class AddEditEmploymentViewModel extends BaseViewModel {
  addEmploymentFilter!: string;
  employmentForm!: FormGroup;
  employmentList: EmploymentStatusDTO[] = [];
  id!: number;
  subscription!: Subscription;
  getListIndex: any[] = [];

  constructor(
    private parameterService: ParameterService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private parameterMessageService: ParameterMessageService,
    private alertService: AlertService
  ) {
    super();
  }

  init(): void {
    this.createForm();

    this.route.queryParams.subscribe((queryParams) => {
      this.id= Number(queryParams['id']);
   })

   if(!isNaN(this.id)){
    this.subscription = this.parameterMessageService.messageEvent.subscribe(
      (message: any) => {
        this.getListIndex = message;
        console.log('getListIndex = ', this.getListIndex);
      }
    );
    this.getEmployment();
   }
  }

  destroy(){
    //this.subscription.unsubscribe();
  }

  /**建立表單 */
  createForm() {
    this.employmentForm = this.fb.group({
      esId: null,
      esName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          matchLangNum,
        ]),
      ],
    });
  }

  /** 編輯畫面顯示預設值(取得前一頁的值帶入) */
  getEmployment() {
    this.employmentForm.patchValue({
      esName: this.getListIndex[0].esName
    })
  }

  /** 新增就業狀況 */
  addEmployment() {
    this.parameterService
      .addEmployment({
        esName: this.employmentForm.value.esName,
      })
      .subscribe((result) => {
        console.log(result);
        if(result.header?.returnCode=='B1201'){
          this.alertService.errorRepeat(result.header?.returnMsg);
        }
      });
  }

  /** 編輯就業狀況 */
  editEmployment() {
    this.parameterService
      .editEmployment({
        esId: this.id,
        esName: this.employmentForm.value.esName,
      })
      .subscribe((res) => {
        console.log(res);
        if(res.header?.returnCode=='B1201'){
          this.alertService.errorRepeat(res.header?.returnMsg);
        }
      });
  }
}
