import { AlertService } from 'src/app/common/services/alert.service';
import { ParameterMessageService } from './../parameter-message.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { createPlatform, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { ParameterService } from '../parameter.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { EmploymentStatusDTO } from '../../../../models/parameterModels/EmploymentSearchModel';
import { timeStamp } from 'node:console';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStatusViewModel extends BaseViewModel {
  employmentFilter!: string;
  //itemId!: number;
  employmentForm!: FormGroup;
  employmentList: EmploymentStatusDTO[] = [];
  dataSource = new MatTableDataSource<EmploymentStatusDTO>(
    this.employmentList
  );
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
    this.displayedColumns = ['esId', 'esName','deletable'];
    this.isClick = false;
    this.createForm();
    this.getEmployment();
    this.employmentFilter = '';
  }

  /**建立表單 */
  createForm() {
    this.employmentForm = this.fb.group({
      esId: null,
      esName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200)]),
      ],
      deletable: null,
    });
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getEmployment();
  }

  /**取得就業狀況資料 */
  getEmployment() {
    if(this.isClick == true){
      this.parameterService.getEmployment({esName: this.employmentFilter, pageNum: this.currentPage, pageSize: this.pageSize}).subscribe((res) => {
        console.log(this.employmentFilter)
        this.employmentList =  res.body?.pageData as EmploymentStatusDTO[];
        this.dataSource.data = res.body?.pageData as EmploymentStatusDTO[];
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        this.loadingService.hide();
        console.log(res)
      });
    }
    else{
      this.parameterService.getEmployment({ pageNum: this.currentPage, pageSize: this.pageSize}).subscribe((res) => {
        console.log(this.employmentFilter)
        this.employmentList =  res.body?.pageData as EmploymentStatusDTO[];
        this.dataSource.data = res.body?.pageData as EmploymentStatusDTO[];
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        this.loadingService.hide();
        console.log(res)
      });
    }
  }

  /** 將要編輯的資料帶入編輯頁 */
  edit(index: number){
    this.searchArr[0] = this.dataSource.data[index];
    this.parameterMessageService.sendMessage(this.searchArr);
   }

   /** 刪除就業狀況資料 */
   deleteEmployment(id: number){
    console.log(id);
    this.parameterService.deleteEmployment({esId: id}).subscribe((res)=>{
      console.log(res);
      this.loadingService.hide();
      this.alertService.success('刪除成功！')
      this.getEmployment();
    })
   }
}

