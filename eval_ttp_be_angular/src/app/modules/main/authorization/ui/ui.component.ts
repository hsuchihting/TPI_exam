import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VMComponent } from 'src/app/common/base/vm.component';
import { UiViewModel } from './ui.view-model';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { LoadingService } from 'src/app/common/services/loading.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
})
export class UiComponent extends VMComponent<UiViewModel> {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('editor1') editor1!:EditorComponent;
  constructor(
    private item: UiViewModel,
    private dialog: MatDialog,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {
    super(item);
  }

  submit() {
    this.ValidateAllFormFields(this.vm.roleForm);
    if (!this.vm.roleForm.valid) {
      this.alertService.error('欄位有錯，請檢查！');
    } else {
      this.vm.addRole()
    }
  }

  onOpenDialog(roleName: string) {
    this.dialog
      .open(DialogComponent, {
        data: {
          title: `編輯${roleName}`,
        },
      })
      .afterClosed()
      .subscribe((r) => {
        console.log(r);
      });
  }

  search() {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }

  ngAfterViewInit() {
    this.vm.dataSource.paginator = this.paginator as any;
    this.vm.dataSource.sort = this.sort as any;
  }

  public delete(name: string): void {
    this.alertService.success('刪除成功');
  }

  public handleDismiss(dismissMethod: string): void {
    console.log(dismissMethod);
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

  insertContent() {
    this.editor1.SetContent('${TEST}')
  }


}
