import { AlertService } from 'src/app/common/services/alert.service';
import { ParameterMessageService } from './../parameter-message.service';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { LoadingService } from 'src/app/common/services/loading.service';
import {
  CategorySearchDataRes,
  SubjectTypeDTO,
} from '../../../../models/parameterModels/CategorySearchModel';
import { ParameterService } from '../parameter.service';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class CategorySetttingViewModel extends BaseViewModel {
  categoryFilter!: string;
  categoryForm!: FormGroup;
  categoriesList: SubjectTypeDTO[] = [];
  dataSource = new MatTableDataSource<SubjectTypeDTO>(this.categoriesList);
  displayedColumns!: string[];
  searchArr: any[] = [];
  isClick = false;
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
    this.displayedColumns = ['stId', 'stNameCh', 'stNameEn', 'editable'];
    this.isClick = false;
    this.createForm();
    this.getCategory();
    this.categoryFilter = '';
  }
  /** 建立表單 */
  createForm() {
    this.categoryForm = this.fb.group({
      stId: null,
      stNameCh: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200)]),
      ],
      stNameEn: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200)]),
      ],
      editable: null,
    });
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getCategory();
  }

  /**取得題目類別資料 */
  getCategory() {
    if(this.isClick==true){
      this.parameterService
      .getCategory({stName: this.categoryFilter, pageNum: this.currentPage, pageSize: this.pageSize })
      .subscribe((res) => {
        console.log(res);
        this.categoriesList = res.body?.pageData as SubjectTypeDTO[];
        this.dataSource.data = res.body?.pageData as SubjectTypeDTO[];
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        this.loadingService.hide();
      });
    }
    else{
      this.parameterService
      .getCategory({ pageNum: this.currentPage, pageSize: this.pageSize })
      .subscribe((res) => {
        console.log(res);
        this.categoriesList = res.body?.pageData as SubjectTypeDTO[];
        this.dataSource.data = res.body?.pageData as SubjectTypeDTO[];
        this.pageLength = (res.body?.totalPages as number) * this.pageSize;
        this.loadingService.hide();
      });
    }
  }

  /** 將要編輯的資料帶入編輯頁 */
   edit(index: number){
     console.log(index)
     console.log(this.dataSource.data[index]);
    this.searchArr[0] = this.dataSource.data[index];
    this.parameterMessageService.sendMessage(this.searchArr);
   }

  /** 刪除題目類別資料 */
  deleteCategory(id: number){
    console.log(id);
    this.parameterService.deleteCategory({stId: id}).subscribe((res)=>{
      console.log(res);
      this.loadingService.hide();
      this.alertService.success('刪除成功！')
      this.getCategory();
    })
  }
}
