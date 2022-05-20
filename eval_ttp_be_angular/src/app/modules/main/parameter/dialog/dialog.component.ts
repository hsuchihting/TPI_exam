import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/services/alert.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  titleDialog: string;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private alertService: AlertService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      this.titleDialog = this.data.title;
    }

  public delete(): void {
    this.alertService.success('刪除成功!');
  }

  cancel(){
     this.router.navigate(['/parameter/category-setting']);
  }

  ngOnInit(): void {
  }
}
