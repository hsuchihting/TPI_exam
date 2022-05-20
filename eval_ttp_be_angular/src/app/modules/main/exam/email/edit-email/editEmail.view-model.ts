import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { ExamService } from '../../exam.service';
import { MessageService } from '../../message.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { editorLimit } from 'src/app/common/validator/checkEditorWordLimit';
import { hasChinese } from 'src/app/common/validator/checkHasChinese';
import { matchLangNum } from 'src/app/common/validator/checkLangNum';
import { EmailTmplDTO } from 'src/app/models/Exam/Email';
import { checkImagePiece } from 'src/app/common/validator/imagePieceLimit';
@Injectable({
  providedIn: 'root',
})
export class EditEmailViewModel extends BaseViewModel {
  @ViewChild('editor1') editor1!:EditorComponent;
  editEmailForm!: FormGroup;
  emailTemplate!: EmailTmplDTO[];
  editEmailIndex!: number;
  isSearched!: boolean;
  selectedRole!:  "H" | 'M' | 'E';
  _imageUrl!: string[]; // 新增 email 上傳圖片
  get editEmailName(){
    return this.editEmailForm.get("editEmailName");
  }
  get editEmailPurpose(){
    return this.editEmailForm.get("editEmailPurpose");
  }
  get editEmailContent(){
    return this.editEmailForm.get("editEmailContent");
  }
  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private messageService: MessageService,
    private alertService: AlertService,
    private router: Router
  ){
    super();
    this.createForm();
  }
  init(){
    this.createForm();
    this.messageService.messageEvent.subscribe((msg: any) => {
      console.log(msg);
      this.editEmailIndex = msg[0];
      this.isSearched = msg[1];
      this.selectedRole = msg[2];
      setTimeout(()=> { this.getEmail()}, 200);
    })
  }
  createForm(){
    this.editEmailForm = this.fb.group({
      editEmailName: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      editEmailPurpose: ['', Validators.compose([Validators.required, Validators.maxLength(300)])],
      editEmailContent: ['', Validators.compose([
        Validators.required,
        editorLimit(1000, 'editor2'),
        hasChinese,
        matchLangNum,
        checkImagePiece
      ])]
    })
  }

  getEmail(){
    this.examService.getEmailTemplate({
      etSeq: this.editEmailIndex,
      isEdit: true
    }).subscribe(
      res => {
        console.log(res);
        this.selectedRole = res.body?.etTypeCode as "H" | 'M' | 'E';
        this.editEmailForm.patchValue({
          editEmailName: res.body?.etName,
          editEmailPurpose: res.body?.subject,
          editEmailContent: res.body?.etContent
        })
      }
    )
  }
  getImageUrl(addImageUrl: string[]){
    // this._imageUrl = addImageUrl;
    // console.log('addImageUrl is in app component', this._imageUrl);
  }
  /** get addImageUrl from formControl editEmailContent */
  getImageName(_content: string){
    const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
    const images: string[] = [];
    let img;
    while ((img = imgRex.exec(_content))) {
      // "http://elite-erp-ttp.10.20.30.226.nip.io/img/email/M/06e2f6353ab44f479e0f3d35d83b3be8.jpg"
      let urlLength = img[1].split('/').length; //7
      images.push(img[1].split('/')[urlLength - 1]);
    }
    // images = ["06e2f6353ab44f479e0f3d35d83b3be8.jpg"]
    return images;
  }
  edit(){
    this.examService.editEmailTemplate({
      etSeq: this.editEmailIndex,
      etName: this.editEmailForm.value.editEmailName.replace(/<[^>]+>/gm, ''),
      etTypeCode: this.selectedRole,
      subject: this.editEmailForm.value.editEmailPurpose.replace(/<[^>]+>/gm, ''),
      etContent: this.editEmailForm.value.editEmailContent,
      imgName: [...this.getImageName(this.editEmailForm.value.editEmailContent)]
    }).subscribe(
      res => {
        this.backEmailHome();
        this.alertService.success('儲存成功');
        console.log("response",res);
        return;
      }
    );
  }
  backEmailHome():void{
    this.router.navigate(['main/exam/email']);
  }
}
