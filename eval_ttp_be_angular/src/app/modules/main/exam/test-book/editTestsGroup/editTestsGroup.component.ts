import { Router, RouterLink } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import Swal from 'sweetalert2';
import { EditTestsGroupViewModel } from './editTestsGroup.view-model';

@Component({
  selector: 'app-editTestsGroup',
  templateUrl: './editTestsGroup.component.html',
  styleUrls: ['./editTestsGroup.component.scss']
})
export class EditTestsGroupComponent extends VMComponent<EditTestsGroupViewModel> {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private item: EditTestsGroupViewModel,
    private loadingService: LoadingService,
    private alert: AlertService,
    private router: Router
  ) {
    super(item);
   }

  ngOnInit(): void {
    this.vm.init();
  }

  //取消按鈕
  editCancel(){
    Swal.fire({
      title: '離開編輯頁面',
      text: '資料尚未儲存，是否離開編輯頁面？',
      icon: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      showCancelButton: true
    }).then(res => {
      if(res.value === true){
        this.router.navigate(['/main/exam/test-book']);
      }
    })
  }
  //移除試卷按鈕
  deleteTestsPaper(){

  }
}
