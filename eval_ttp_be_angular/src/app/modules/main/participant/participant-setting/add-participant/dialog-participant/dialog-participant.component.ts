import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TesterEmailTemplateRes } from 'src/app/models/participantModels/ParticipantSearchModel';
import { DialogComponent } from 'src/app/modules/main/authorization/ui/dialog/dialog.component';
import { ParticipantService } from '../../../participant.service';

@Component({
  selector: 'app-dialog-participant',
  templateUrl: './dialog-participant.component.html',
  styleUrls: ['./dialog-participant.component.scss'],
})
export class DialogParticipantComponent implements OnInit {
  etSeq:string;
  etName!:string;
  subject!:string;
  etContent!:string;
  isEdit!:boolean;

  constructor(
    private participantService: ParticipantService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.etSeq = this.data.etSeq;
    this.isEdit = this.data.isEdit;
  }

  ngOnInit(): void {
    this.getTesterEmailTemplate();

  }

  getTesterEmailTemplate() {
    if(this.etSeq != undefined){
      this.participantService
      .getTesterEmailTemplate({
        etSeq:Number(this.etSeq),
        isEdit:this.isEdit
      })
      .subscribe((res) => {
        console.log('getTesterEmailTemplate - res = ', res);
        this.etName = res.body?.etName as string;
        this.subject = res.body?.subject as string;
        this.etContent = res.body?.etContent as string;
      });
    }

  }
}
