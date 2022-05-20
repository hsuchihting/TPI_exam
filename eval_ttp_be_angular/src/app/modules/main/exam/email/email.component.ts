import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EmailViewModel } from './email.view-model';
import { VMComponent } from './../../../../common/base/vm.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/common/services/alert.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent extends VMComponent<EmailViewModel> {
  /** 動態分頁 */
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor(
    private item: EmailViewModel,
    private alertService: AlertService,
  ) {
    super(item);
  }
  ngOnInit(){
    this.vm.init();
  }
  ngAfterViewInit() {
    //this.vm.dataSource.paginator = this.paginator as any;
  }
  onSearch(event: MouseEvent){
    if(event){
      this.vm.isSearched = true;
      this.vm.getEmailList();
      this.vm.emailArr[1] = this.vm.isSearched;
      this.vm.emailArr[2] = this.vm.selectedRole;
    }
  }
}
