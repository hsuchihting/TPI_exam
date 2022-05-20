import { AlertService } from 'src/app/common/services/alert.service';
import { hasEnglish } from 'src/app/common/validator/ckeckWordLimitEn';
import { hasChinese } from 'src/app/common/validator/chechWordLimitCh';
import { ParameterMessageService } from './../../parameter-message.service';
import { ActivatedRoute } from '@angular/router';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from '../../parameter.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { TitleDTO } from 'src/app/models/parameterModels/PositionSearchModel';
import { Subscription } from 'rxjs';
import { swalProviderToken } from '@sweetalert2/ngx-sweetalert2/lib/di';

@Injectable({
  providedIn: 'root',
})
export class AddEditPositionViewModel extends BaseViewModel {
  addPositionFilter!: string;
  positionForm!: FormGroup;
  positionList: TitleDTO[] = [];
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
    this.creatForm();

    this.route.queryParams.subscribe((queryParams) => {
      this.id = Number(queryParams['id']);
   })

   if(!isNaN(this.id)){
    this.subscription = this.parameterMessageService.messageEvent.subscribe(
      (message: any) => {
        this.getListIndex = message;
        console.log('getListIndex = ', this.getListIndex);
      }
    );
    this.getPosition();
   }
  }

  destroy(){
    //this.subscription.unsubscribe();
  }

  /**建立表單 */
  creatForm() {
    this.positionForm = this.fb.group({
      titleId: null,
      titleNameCh: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200),hasChinese]),
      ],
      titleNameEn: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200),hasEnglish]),
      ],
    });
  }

  /** 編輯畫面顯示預設值(取得前一頁的值帶入) */
  getPosition() {
        this.positionForm.patchValue({
          titleNameCh: this.getListIndex[0].titleNameCh,
          titleNameEn: this.getListIndex[0].titleNameEn,
        });
  }

  /** 新增職務別*/
  addPosition() {
    this.parameterService
      .addPosition({
        titleNameCh: this.positionForm.value.titleNameCh,
        titleNameEn: this.positionForm.value.titleNameEn,
      })
      .subscribe((result) => {
        console.log(result);
        if(result.header?.returnCode=='B1101'){
          this.alertService.errorRepeat(result.header?.returnMsg);
        }
      });
  }

   /** 編輯職務別 */
   editPosition() {
    this.parameterService
      .editPosition({
        titleId: this.id,
        titleNameCh: this.positionForm.value.titleNameCh,
        titleNameEn: this.positionForm.value.titleNameEn
      })
      .subscribe((res) => {
        console.log(res);
        if(res.header?.returnCode=='B1101'){
          this.alertService.errorRepeat(res.header?.returnMsg);
        }
      });
  }
}
