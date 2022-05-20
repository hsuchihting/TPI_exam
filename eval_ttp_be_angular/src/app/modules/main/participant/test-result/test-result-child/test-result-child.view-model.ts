import { Component, Directive, Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { LoadingService } from 'src/app/common/services/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Test,
  TesterResult,
  TesterResultRes,
  TesterSheetResultRes,
} from 'src/app/models/participantModels/TestResultModel';
import { ParticipantService } from '../../participant.service';
import { Subscription } from 'rxjs';
import { ParticipantMessageService } from '../../message.service';

@Injectable({
  providedIn: 'root',
})
export class TestResultChildViewModel extends BaseViewModel {
  ParticipantList: TesterSheetResultRes[] = [];
  ParticipantList2: Test[] = [];
  dataSource = new MatTableDataSource<TesterSheetResultRes>(
    this.ParticipantList
  );
  dataSourceChild = new MatTableDataSource<Test>(this.ParticipantList2);
  displayedColumns!: string[];
  getList: TesterResultRes[] = [];
  subscription!: Subscription;

  currentDisable!: string;
  btnDisabled_file: boolean[] = [];
  btnDisabled_pdf: boolean[] = [];
  btnDisabled_excel: boolean[] = [];

  getTesterId!: string;
  getTestsGroupName!: string;
  getTesterName!: string;
  getTestsGroupSeq!: string;

  constructor(
    private participantService: ParticipantService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private messageService: ParticipantMessageService
  ) {
    super();
  }

  init(): void {
    this.displayedColumns = [
      'testName',
      'lastTestDate',
      'testQty',
      'operating',
    ];
    this.blank();
    this.getMessage();
    this.getAllFormData();
  }

  //清空陣列
  blank() {
    //console.log('blank = ' ,this.dataSourceChild.data );
    if(this.dataSourceChild.data != undefined){
      this.dataSourceChild.data.length = 0;
      this.dataSourceChild.data = [];
    }
  }

  //取消訂閱
  destroy() {
    this.subscription.unsubscribe();
  }

  getMessage() {
    this.subscription = this.messageService.messageEvent2.subscribe(
      (msg: any[]) => {
        this.getTesterId = msg[1].testerId;
        this.getTestsGroupName = msg[1].testsGroupName;
        this.getTesterName = msg[1].testerName;
        this.getTestsGroupSeq = msg[1].testsGroupSeq;
      }
    );
  }

  getAllFormData() {
    console.log('getTesterId =', this.getTesterId);
    this.participantService
      .getTesterSheetResult({
        testerId: this.getTesterId,
      })
      .subscribe((res) => {
        console.log('getTesterSheetResult - res = ', res);
        // if('member' in (res.body as Test) == true){
        //   this.dataSourceMember.data = res.body?.member as Member[];
        // }
        this.dataSourceChild.data = res.body?.test as Test[];
        // if (res.header?.returnCode == 'B0000') {//成功
        //   this.dataSourceChild.data.forEach((item, i) => {
        //     if (item.testsUpload == null) {
        //       this.btnDisabled_file[i] = true;
        //     } else {
        //       this.btnDisabled_file[i] = false;
        //     }

        //     if (item.testsPdf == null) {
        //       this.btnDisabled_pdf[i] = true;
        //     } else {
        //       this.btnDisabled_pdf[i] = false;
        //     }

        //     if (item.testsExcel == null) {
        //       this.btnDisabled_excel[i] = true;
        //     } else {
        //       this.btnDisabled_excel[i] = false;
        //     }
        //   });
        // }

        this.loadingService.hide();
      });
  }
}
