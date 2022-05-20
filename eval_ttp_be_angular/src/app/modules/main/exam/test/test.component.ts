import { TestViewModel } from './test.view-model';
import { Component, ViewChild } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatRadioChange } from '@angular/material/radio';
import { ExamService } from './../exam.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends VMComponent<TestViewModel> {

  /** 動態分頁 */
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor(
    private item: TestViewModel,
    private examService: ExamService,
  ) {
    super(item);
  }

  ngOnInit(){
    this.vm.init();
  }

  ngAfterViewInit(){
    //this.vm.dataSource.paginator = this.paginator as any;
  }

  changeRadioValue(event: MatRadioChange, element: any){
    const { tdSeq, statusCode } = element;
    if(statusCode === 'Y'){
      this.examService.editTestDescStatus({
        tdSeq: tdSeq,
        statusCode: 'N'
      }).subscribe((res) => {
        console.log('from radiobutton',res);
        this.vm.getTestList();
      })
      return
    }
    if(statusCode === 'N'){
      this.examService.editTestDescStatus({
        tdSeq: tdSeq,
        statusCode: 'Y'
      }).subscribe((res) => {
        console.log('from radiobutton',res);
        this.vm.getTestList();
      })
      return
    }
  }

  onSearch(event: MouseEvent){
    if(event){
      const tdName = this.vm.tdName === '' ? null : this.vm.tdName;
      this.vm.isSearched = true;
      this.vm.getTestList();
      this.vm.testArr[2] = this.vm.isSearched;
      this.vm.testArr[3] = tdName;
    }
  }

}
