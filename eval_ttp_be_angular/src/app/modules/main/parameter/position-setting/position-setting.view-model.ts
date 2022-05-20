import { AlertService } from 'src/app/common/services/alert.service';
import { ParameterMessageService } from './../parameter-message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { ParameterService } from '../parameter.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { PositionSearchDataRes, TitleDTO } from '../../../../models/parameterModels/PositionSearchModel';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PositionSettingViewModel extends BaseViewModel {
  positionFilter!: string;
  positionForm!: FormGroup;
  positionList: TitleDTO[] = [];
  dataSource = new MatTableDataSource<TitleDTO>(this.positionList);
  displayedColumns!: string[];
  isClick = false;
  searchArr: any[] = [];
  pageSize = 10;
  currentPage = 1;
  pageLength = 0;

  constructor(
    private fb: FormBuilder,
    private parameterService: ParameterService,
    private loadingService: LoadingService,
    private parameterMessageService: ParameterMessageService,
    private alertService: AlertService
  ) {
    super();
  }
  private _vm?: BaseViewModel;

  init(): void {
    this.displayedColumns = ['titleId', 'titleNameCh', 'titleNameEn','editable'];
    this.isClick = false;
    this.createForm();
    this.getPosition();
    this.positionFilter = '';
  }
  /** 建立表單 */
  createForm() {
    this.positionForm = this.fb.group({
      titleId: null,
      titleNameCh: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200)],)
      ],
      titleNameEn: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200)],)
      ],
      editable: null
    });
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getPosition();
  }

  /**取得職務別資料 */
  getPosition() {
    if(this.isClick == true){
      this.parameterService.getPosition({titleName: this.positionFilter, pageNum: this.currentPage, pageSize: this.pageSize}).subscribe((res) => {
        this.positionList = res.body?.pageData as TitleDTO[];
        this.dataSource.data = res.body?.pageData as TitleDTO[];
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        this.loadingService.hide();
        if(res.header?.returnCode=='B0001'){
          this.alertService.noDatas(res.header?.returnMsg);
        }
        console.log(res);
      });
    }
    else{
      this.parameterService.getPosition({ pageNum: this.currentPage, pageSize: this.pageSize}).subscribe((res) => {
        this.positionList = res.body?.pageData as TitleDTO[];
        this.dataSource.data = res.body?.pageData as TitleDTO[];
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        this.loadingService.hide();
        console.log(res);
      });
    }
  }

  /** 將要編輯的資料帶入編輯頁 */
  edit(index: number){
    this.searchArr[0] = this.dataSource.data[index];
    this.parameterMessageService.sendMessage(this.searchArr);
   }

  /** 刪除職務別資料 */
  deletePosition(id: number){
    console.log(id);
    this.parameterService.deletePosition({titleId: id}).subscribe((res)=>{
      console.log(res);
      this.loadingService.hide();
      this.alertService.success('刪除成功！')
      this.getPosition();
    })
  }
}
