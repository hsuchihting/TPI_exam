import { Injectable, ViewChild } from "@angular/core";
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { editorLimit } from 'src/app/common/validator/checkEditorWordLimit';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExamService } from "../../exam.service";
import { MessageService } from './../../message.service';
import { EmailTmplDTO } from 'src/app/models/Exam/Email';

@Injectable({
  providedIn: 'root',
})
export class ViewEmailViewModel extends BaseViewModel{
  @ViewChild('editor2') editor1!:EditorComponent;

  viewEmailForm!: FormGroup;
  viewEmailIndex!: number;
  isSearched!: boolean;
  selectedRole!:  "H" | 'M' | 'E';
  emailTemplate!: EmailTmplDTO[];

  get viewEmailName(){
    return this.viewEmailForm.get('viewEmailName');
  };

  get viewEmailContent(){
    return this.viewEmailForm.get('viewEmailContent');
  };

  constructor(
    private fb : FormBuilder,
    private examService: ExamService,
    private messageService: MessageService
  ){
    super();
    this.createForm();
  }

  init(){
    //this.getEmailList();
    this.messageService.messageEvent.subscribe((msg: any) => {
      console.log('form view email', msg);
      this.viewEmailIndex = msg[0];
      this.isSearched = msg[1];
      this.selectedRole = msg[2];
      setTimeout(()=> { this.getEmail()}, 200);
    })
  }

  createForm(){
    this.viewEmailForm = this.fb.group({
      viewEmailName: '',
      viewEmailContent: ['', Validators.compose([
        Validators.required,
        editorLimit(1000, 'editor2'),
      ])]
    })
    this.viewEmailContent?.disable();
  }

  getEmailList(){
    if(this.isSearched === true){
      this.examService.getEmailTemplateList({etTypeCode: this.selectedRole, pageNum: 1, pageSize: 20}).subscribe(
        res => {
          this.emailTemplate = res.body?.pageData as EmailTmplDTO[];
        }
      )
    }else{
      this.examService.getEmailTemplateList({pageNum: 1, pageSize: 40}).subscribe(
        res => {
          this.emailTemplate = res.body?.pageData as EmailTmplDTO[];
        }
      )
    }
  }

  getEmail(){
    this.examService.getEmailTemplate({
      etSeq: this.viewEmailIndex,
      isEdit: false
    }).subscribe(
      res => {
        this.viewEmailForm.patchValue({
          viewEmailName: res.body?.etName,
          viewEmailContent: res.body?.etContent
        })
      }
    )
  }
}
