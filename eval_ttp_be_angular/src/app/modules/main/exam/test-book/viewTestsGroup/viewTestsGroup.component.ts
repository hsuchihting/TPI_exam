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
  constructor(
    private item: ViewTestsGroupViewModel,
    private loadingService: LoadingService) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
  }
  ngAfterViewInit() {
    this.vm.dataSource.paginator = this.paginator as any;
  }
  /** 檢視按鈕 */
  view(){

  }

}
