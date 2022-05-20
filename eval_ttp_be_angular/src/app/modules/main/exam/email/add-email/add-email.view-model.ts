import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { Injectable, ViewChild } from '@angular/core';
import { editorLimit } from 'src/app/common/validator/checkEditorWordLimit';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { hasChinese } from 'src/app/common/validator/checkHasChinese';
import { matchLangNum } from 'src/app/common/validator/checkLangNum';
import { ExamService } from '../../exam.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { Router } from '@angular/router';
import { checkImagePiece } from 'src/app/common/validator/imagePieceLimit';
@Injectable({
  providedIn: 'root',
})
export class AddEmailViewModel extends BaseViewModel {
  @ViewChild('editor2') editor1!:EditorComponent;
  addEmailForm!: FormGroup;
  selectedRole!: "H" | 'M' | 'E';
  _imageUrl!: string[]; // 新增 email 上傳圖片
  get addEmailName(){
    return this.addEmailForm.get("addEmailName");
  }
  get addEmailPurpose(){
    return this.addEmailForm.get("addEmailPurpose");
  }
  get addEmailContent(){
    return this.addEmailForm.get("addEmailContent");
  }
  constructor(
    private fb : FormBuilder,
    private examService: ExamService,
    private alertService: AlertService,
    private router: Router,
    ) {
    super();
    this.createForm();
  }
  init(){
    this.createForm();
  }
  createForm(){
    this.selectedRole = "H";
    this.addEmailForm = this.fb.group(
      {
        addEmailName: ["", Validators.compose([Validators.required, Validators.maxLength(100)])],
        addEmailPurpose: ["", Validators.compose([Validators.required, Validators.maxLength(300)])],
        addEmailContent: ["", Validators.compose([
          Validators.required,
          editorLimit(1000, 'editor2'),
          hasChinese,
          matchLangNum,
          checkImagePiece
        ])]
      },
    )
  }
  /** get addImageUrl from editorComponent */
  getImageUrl(addImageUrl: string[]){
    //this._imageUrl = addImageUrl;
    //console.log('addImageUrl is in app component', this._imageUrl);
  }
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
    console.log(images)
    return images;
  }
  add(){
    this.examService.addEmailTemplate({
      etName: this.addEmailForm.value.addEmailName.replace(/<[^>]+>/gm, ''),
      etTypeCode: this.selectedRole,
      subject: this.addEmailForm.value.addEmailPurpose.replace(/<[^>]+>/gm, ''),
      etContent: this.addEmailForm.value.addEmailContent,
      imgName: [...this.getImageName(this.addEmailForm.value.addEmailContent)]
    }).subscribe(
      res => {
        let returnMsg = res.header?.returnMsg;
        if(returnMsg === "欄位檢核錯誤，欄位:body.imgName，錯誤訊息:範本圖片數量不可超出3張，請重新輸入!"){
          return this.alertService.error('範本圖片數量不可超出3張，請重新輸入!');
        }
        this.backEmailHome();
        this.alertService.success('儲存成功');
        return;
      }
    )
  }
  backEmailHome():void{
    this.router.navigate(['main/exam/email'])
  }

}
