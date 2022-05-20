import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VMComponent } from 'src/app/common/base/vm.component';
import { LoadingService } from 'src/app/common/services/loading.service';
import { TestResultViewModel } from './test-result.view-model';
import { ParticipantMessageService } from '../message.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent extends VMComponent<TestResultViewModel> {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  setMsgArr:any[]=[];

  constructor(
    private item: TestResultViewModel,
    private loadingService: LoadingService,
    private messageService: ParticipantMessageService,

    ) {
      super(item);
    }

  ngOnInit(): void {
    this.vm.init();
  }

  // ngAfterViewInit() {
  //     this.vm.dataSourceChild.paginator = this.paginator as any;
  //   }

  search() {
     this.vm.getAllFormData();
  }

  onClickName(index:number){
    this.setMsgArr[0] = index;
    this.setMsgArr[1] = this.vm.dataSourceChild.data[index]
      this.messageService.sendMessage2(this.setMsgArr);
  }



}
