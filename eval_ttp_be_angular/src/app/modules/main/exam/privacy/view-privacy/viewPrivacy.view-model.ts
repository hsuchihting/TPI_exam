import { MessageService } from './../../message.service';
import { Injectable, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { EditorComponent } from "src/app/common/components/editor/editor.component";
import { editorLimit } from "src/app/common/validator/checkEditorWordLimit";
import { ExamService } from "../../exam.service";
import { PrivacyPolicyDTO } from 'src/app/models/Exam/Privacy';

@Injectable({
  providedIn: 'root',
})
export class ViewPrivacyViewModel extends BaseViewModel {
  @ViewChild('editor1') editor1!:EditorComponent;

  viewPrivacyForm!: FormGroup;
  viewPrivacyIndex!: string;
  viewPrivacyId!: string;
  privacyPolicyList!: PrivacyPolicyDTO[];

  get viewPrivacyContent(){
    return this.viewPrivacyForm.get('viewPrivacyContent');
  }

  init(){
    this.messageService.messageEvent.subscribe((msg: any) => {
      console.log('msg', msg);
      this.viewPrivacyIndex = msg;
      setTimeout(()=> { this.getPrivacy()}, 200);
    })
    this.createForm();
  }

  constructor(
    private fb : FormBuilder,
    private examService: ExamService,
    private messageService: MessageService
  ){
    super();
  }

  createForm(){
    this.viewPrivacyForm = this.fb.group({
      viewPrivacyContent: ['', Validators.compose([
        Validators.maxLength(20000),
        editorLimit(20000, 'editor3'),
      ])]
    })
    this.viewPrivacyContent?.disable();
  }

  // getPrivacyList(){
  //   this.examService.getPrivacyPolicyList({pageNum: 1, pageSize: 40}).subscribe(
  //     res=> {
  //       this.privacyPolicyList = res.body?.pageData as PrivacyPolicyDTO[];
  //     }
  //   )
  // }

  getPrivacy(){
    this.examService.getPrivacyPolicy({ppId: this.viewPrivacyIndex}).subscribe(
      (res: any) => {
        console.log('privacy', res);
        this.viewPrivacyId = res.body?.ppId;
        console.log('privacy index',this.viewPrivacyIndex);
        this.viewPrivacyForm.patchValue({
          viewPrivacyContent: res.body?.contentCh
        })
      }
    );
  }

}
