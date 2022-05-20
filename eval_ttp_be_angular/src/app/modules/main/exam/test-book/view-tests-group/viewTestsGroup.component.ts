import { Router } from '@angular/router';
import { AlertService } from './../../../../../common/services/alert.service';
import { TestBookService } from './../../test-book.service';
import { MessageService } from './../../message.service';
import { ViewTestsGroupViewModel } from './viewTestsGroup.view-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LoadingService } from 'src/app/common/services/loading.service';

@Component({
  selector: 'app-viewTestsGroup',
  templateUrl: './viewTestsGroup.component.html',
  styleUrls: ['./viewTestsGroup.component.scss']
})
export class ViewTestsGroupComponent extends VMComponent<ViewTestsGroupViewModel> {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  viewTestsPaperArr: any[] = [];

  constructor(
    private item: ViewTestsGroupViewModel,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private testBookService: TestBookService,
    private alertService: AlertService,
    private router: Router) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
  }

  ngAfterViewInit() {
    this.vm.dataSource.paginator = this.paginator as any;
  }

  ngOnDestroy(): void {
    this.vm.destroy();
  }

  /** 檢視按鈕 */
  view(testsId: string){
    /** 查詢試卷 EB080103*/
    this.testBookService.getTests({testsId: testsId}).subscribe((res)=>{
      if(res.header?.returnCode==='B0001' || res.header?.returnCode==='B0701'){
        this.alertService.error(res.header.returnMsg);
      }
      else{
        this.viewTestsPaperArr[0] = testsId;
        console.log(testsId)
        this.messageService.sendArrMessage(this.viewTestsPaperArr);
        this.router.navigate(['/main/exam/test-paper/view-paper']);
      }
    })
  }
}
