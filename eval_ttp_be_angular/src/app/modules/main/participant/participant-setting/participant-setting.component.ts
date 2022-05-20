import { element } from 'protractor';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { ParticipantSettingViewModel } from './participant-setting.view-model';
import { ParticipantService } from '../participant.service';
import { Router } from '@angular/router';
import { TesterListRes } from 'src/app/models/participantModels/ParticipantSearchModel';
import Swal from 'sweetalert2';
import { ParticipantMessageService } from '../message.service';

@Component({
  selector: 'app-participant-setting',
  templateUrl: './participant-setting.component.html',
  styleUrls: ['./participant-setting.component.scss'],
})
export class ParticipantSettingComponent extends VMComponent<ParticipantSettingViewModel> {
  //@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  name!: string;
  email!: string;
  num!: number;
  test_deadline!: Date;
  department!: string;
  dateStart!: Date;
  dateEnd!: Date;

  sendArr:any[]=[];
  setTesterId!:string


  constructor(
    private messageService: ParticipantMessageService,
    private item: ParticipantSettingViewModel,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private participantService: ParticipantService,
    private router: Router
  ) {
    super(item);
  }

  ngOnInit() {
    this.vm.init();
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.vm.dataSourceChild.paginator = this.paginator as any;
  //   }, 0);
  // }

  onClickSearch() {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);

    this.vm.getAllFormData();

  }

  onClickDelete(index: number): void {
    //console.log('testerId = ',this.vm.dataSourceChild.data[index].testerId)
    Swal.fire({
      title: '確認是否刪除',
      text:'此受測者將於確認後刪除，請確認是否仍要執行刪除作業?',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        console.log('OK...............');
        this.participantService.deleteTester({
          testerId:this.vm.dataSourceChild.data[index].testerId
        }).subscribe((res) => {
          console.log('deleteTester - res= ' , res);
          this.vm.getAllFormData();
        });
      }
    });
  }

  //確認是否刪除
  public handleDismiss(dismissMethod: string): void {
    console.log(dismissMethod);
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

  onClickEdit(index: number) {
    this.setTesterId = this.vm.dataSourceChild.data[index].testerId;
    this.messageService.sendMessage(this.setTesterId);
  }

  //寄送次數
  onClickSendNumLink(index: number) {
    console.log('index = ', index);
    this.sendArr[0] = index;
    this.sendArr[1] = this.vm.dataSourceChild.data[index];
    this.messageService.sendMessage2(this.sendArr);
  }

  //進行受測者通知信寄送，並記錄
  onClickSendEmail(index:number){
    this.participantService.sendTestNoticeEmail({
      testerId:this.vm.dataSourceChild.data[index].testerId
    }).subscribe((res) => {
      console.log('sendTestNoticeEmail - res= ' , res)
      if(res.header?.returnCode == 'B0000'){
        this.vm.getAllFormData();
      }

    });
  }

  //題本
  onClickTestsGroup(index:number){
    this.sendArr[0] = true;
    this.sendArr[1] = this.vm.dataSourceChild.data[index].testsGroupSeq;
    this.messageService.sendMessage2(this.sendArr);
    this.router.navigate(['/main/exam/test-book/view-tests-group']);
  }
}
