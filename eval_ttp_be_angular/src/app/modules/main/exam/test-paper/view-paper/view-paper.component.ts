import { ViewPaperViewModel } from './view-paper.view-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/common/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-paper',
  templateUrl: './view-paper.component.html',
  styleUrls: ['./view-paper.component.scss']
})
export class ViewPaperComponent extends VMComponent<ViewPaperViewModel> {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private item: ViewPaperViewModel,
    private alertService: AlertService,
    private router:Router
  )
  {
    super(item)
  }

  ngOnInit(): void {
    this.vm.init();
  }

  // ngAfterViewInit() {
  //   this.vm.dataSourceChild.paginator = this.paginator as any;
  // }

}
