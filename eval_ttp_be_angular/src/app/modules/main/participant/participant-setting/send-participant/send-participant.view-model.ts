import { Component, Directive, Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { LoadingService } from 'src/app/common/services/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TesterResult, TesterResultRes } from 'src/app/models/participantModels/TestResultModel';
import { ParticipantService } from '../../participant.service';
import { TesterListRes, TesterNotifyList, TesterNotifyRes } from 'src/app/models/participantModels/ParticipantSearchModel';
import { Dep } from 'src/app/models/ShareModel';
import { Subscription } from 'rxjs';
import { ParticipantMessageService } from '../../message.service';


@Injectable({
  providedIn: 'root',
})
export class SendParticipantViewModel extends BaseViewModel {

  roleFilter!: string;
  displayedColumns!: string[];
  roles!: any[];
  role!: number | number[];
  multiple!: boolean;
  disabled!: boolean;
  required!: boolean;

  TesterList:TesterListRes[]=[];
  NotifyList: TesterNotifyRes[] = [];
  NotifyList2: TesterNotifyList[] = [];
  dataSource = new MatTableDataSource<TesterNotifyRes>(this.NotifyList);
  dataSourceChild = new MatTableDataSource<TesterNotifyList>(this.NotifyList2);
  depList: Dep[] = [];
  subscription!:Subscription;

  sendNum!:number;
  getIndex!: number;
  getTesterId!:string;

    //分頁
    pageSize = 10;
    currentPage = 1;
    pageLength = 0;

  constructor(
    private messageService: ParticipantMessageService,
     private participantService: ParticipantService,
     private loadingService: LoadingService,
     private fb: FormBuilder,
    ) {
    super();
  }

  init(): void {
    this.displayedColumns = ['testerName', 'testerEmail', 'depName', 'testsGroupName','notifyDate','notifyIsSuccess'];
    this.getMessage();
    this.getERPDep()
    this.getAllFormData();
  }

  destroy(){
    this.subscription.unsubscribe();
  }

  getMessage(){
    this.subscription = this.messageService.messageEvent2.subscribe((msg: any[]) => {
      this.getIndex = msg[0];
      this.sendNum = msg[1].testerNotify;
      this.getTesterId = msg[1].testerId;
      //console.log('getIndex = ', this.getIndex);
      //console.log('getTesterArr = ', msg[1]);
    });
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getAllFormData();
  }

  getERPDep() {
    this.participantService.getERPDep(null).subscribe((res: any) => {
      console.log('getERPDep - res  = ', res);
      this.depList = res.body.dep;
    });
  }

  getAllFormData(){
    console.log('getTesterId = ',this.getTesterId);
    this.participantService.getTesterNotify({
      pageSize: this.pageSize,
      pageNum: this.currentPage,
      testerId:this.getTesterId

    }).subscribe((res) => {
      console.log('getTesterNotify - res = ' , res);
      // this.NotifyList = res as TesterNotifyRes[];
      // this.dataSource.data = this.NotifyList;
      this.dataSourceChild.data = res.body?.pageData as TesterNotifyList[];
      if(res.header?.returnCode == 'B0000'){
        this.dataSourceChild.data.forEach((item)=>{
          if(item.notifyIsSuccess == 'Y'){
            item.notifyName = '成功'
          }else{
            item.notifyName = '失敗'
          }

          this.depList.forEach((child: any) => {
            if (child.depId == item.depName) {
              item.depTrueName = child.depName;
            }
          });

        })
      }

      this.pageLength = (res.body?.totalPages as number) * this.pageSize;
      this.loadingService.hide();
    });
  }
}




