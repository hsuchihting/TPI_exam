import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TbContent } from 'src/app/models/participantModels/ParticipantSearchModel';
import { DialogComponent } from 'src/app/modules/main/authorization/ui/dialog/dialog.component';
import { ParticipantService } from '../../../participant.service';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
})
export class DialogTestComponent implements OnInit {

  tdName!:string;
  contentCh!:string;
  contentEn!:string;
  tbContentList:TbContent[]=[];

  tdSeq!:string
  isEdit!:boolean;
  testerId!:string;

  constructor(
    private participantService: ParticipantService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tdSeq = this.data.tdSeq;
    this.isEdit = this.data.isEdit;
    this.testerId = this.data.testerId;
  }

  ngOnInit(): void {
    this.getTesterTestDesc();
  }

  getTesterTestDesc() {
    if(this.tdSeq != undefined){
      this.participantService
      .getTesterTestDesc({
        testerId:this.testerId,
        tdSeq:Number(this.tdSeq),
        isEdit:this.isEdit,
      })
      .subscribe((res) => {
        console.log('getTesterEmailTemplate - res = ', res);
        this.tdName = res.body?.tdName as string;
        this.contentCh = res.body?.contentCh as string;
        this.contentEn = res.body?.contentEn as string;
        this.tbContentList = res.body?.tbContentList as TbContent[];
        console.log('this.tbContentList=',this.tbContentList)
      });
    }
  }

}
