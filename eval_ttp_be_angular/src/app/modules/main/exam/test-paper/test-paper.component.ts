import { MessageService } from './../message.service';
import { TestPaperViewModel } from './test-paper.view-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/common/services/alert.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-test-paper',
  templateUrl: './test-paper.component.html',
  styleUrls: ['./test-paper.component.scss'],
})
export class TestPaperComponent extends VMComponent<TestPaperViewModel> {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  sendArr: any[] = [];

  constructor(
    private item: TestPaperViewModel,
    private alertService: AlertService,
    private router: Router,
    private messageService: MessageService,
    private examService: ExamService
  ) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
  }

  // ngAfterViewInit() {
  //   this.vm.dataSourceChild.paginator = this.paginator as any;
  // }

  searchPaper() {
    this.vm.getTestsList();
  }

  onClickDel(index: number) {
    // const data = this.vm.dataSourceChild.data;
    // data.splice(this.paginator.pageIndex * this.paginator.pageSize + index, 1);
    // this.vm.dataSourceChild.data = data;
    Swal.fire({
      title: '確認變更',
      text: '確認是否進行刪除？※請注意刪除後將無法復原',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((result) => {
      // console.log(result.value);
      if (result.value) {
        this.vm.delPaper(index);
      } else {
        const errorMsg = '刪除失敗';
        this.alertService.error(errorMsg);
      }
    });
  }

  onClickEdit(index: number) {
    Swal.fire({
      title: '進行編輯',
      text: '是否進行編輯?',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.value) {
        console.log('OK...............');
        //Send Message to edit page
        this.sendArr[0] = this.vm.dataSourceChild.data[index];
        this.messageService.sendArrMessage(this.sendArr);
        console.log('sendArr = ', this.sendArr);
        this.router.navigate(['/main/exam/test-paper/edit-paper']);
      }
    });
  }

  onChangeRadio(event: any, index: number) {
    console.log('event = ', event);
    //this.vm.dataSourceChild.data[index].status = 'Y'
    console.log('event = ', event.value, ',index = ', index);
    let status = '';
    if (event.value == 'enable') {
      //this.vm.enableRadioBtn[index] = false;
      //this.vm.disableRadioBtn[index] = true;
      status = 'Y';
    } else {
      //event.source.checked = false;
      //this.vm.enableRadioBtn[index] = true;
      //this.vm.disableRadioBtn[index] = false;
      status = 'N';
    }
    //this.vm.editTestStatus(status,index);
    this.examService
      .editTestStatus({
        testsId: this.vm.dataSourceChild.data[index].testsId,
        status: status,
      })
      .subscribe((res) => {
        console.log('returnCode=', res.header?.returnCode);
        if (res.header?.returnCode == 'B0712') {
          //已有題本使用此試卷，不可以停用!
          //this.vm.enableRadioBtn[index] = true;
          //this.vm.disableRadioBtn[index] = false;
          this.alertService.error('已有題本使用此試卷，不可以停用!');
          this.vm.getTestsList();
        } else {
          //成功
          this.alertService.success('成功');

          //   if (event.value == 'enable') {
          //     this.vm.enableRadioBtn[index] = true;
          //     this.vm.disableRadioBtn[index] = false;
          //  } else {
          //     this.vm.enableRadioBtn[index] = false;
          //     this.vm.disableRadioBtn[index] = true;
          //   }
        }
        //console.log('enableRadioBtn2 = ' ,this.vm.enableRadioBtn);
        //console.log('disableRadioBtn2 = ' ,this.vm.disableRadioBtn);
      });
  }
}
