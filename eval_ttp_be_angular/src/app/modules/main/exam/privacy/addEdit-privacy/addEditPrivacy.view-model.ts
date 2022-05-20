import { PrivacyType } from './../../enumType';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { hasChinese } from 'src/app/common/validator/checkHasChinese';
import { matchEngNum, matchLangNum } from 'src/app/common/validator/checkLangNum';
import { editorLimit } from 'src/app/common/validator/checkEditorWordLimit';
import { ExamService } from './../../exam.service';
import { Injectable, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/services/alert.service';
import { MessageService } from '../../message.service';
import { PrivacyPolicyDTO } from 'src/app/models/Exam/Privacy';
@Injectable({
  providedIn: 'root'
})
export class AddEditPrivacyViewModel extends BaseViewModel{
  @ViewChild('editor3') editor1!:EditorComponent;
  privacyForm!: FormGroup;
  types!: PrivacyType;
  privacyPolicyList!: PrivacyPolicyDTO[];
  editPrivacyIndex!: string;
  addEditPrivacyStatus!: number;
  get ppId(){
    return this.privacyForm.get("ppId");
  }
  get privacyContentCh(){
    return this.privacyForm.get("privacyContentCh");
  }
  get privacyContentEn(){
    return this.privacyForm.get("privacyContentEn");
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private examService: ExamService,
    private alertService: AlertService,
    private messageService: MessageService,
    ){
    super();
  }
  init(){
    this.messageService.messageEvent.subscribe((msg: any) => {
      this.addEditPrivacyStatus = msg[1];
      console.log('addEdit msg', this.addEditPrivacyStatus);
      this.editPrivacyIndex = msg[0];
      if(this.addEditPrivacyStatus === 1){
        setTimeout(()=> { this.getPrivacy()}, 200);
      }
    })
    this.createForm();
  }
  createForm(){
    this.privacyForm = this.fb.group({
      ppId:'',
      privacyContentCh: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(20000),
          editorLimit(20000, 'editor3'),
          matchLangNum,
          hasChinese
        ])],
      privacyContentEn: ['', [
          editorLimit(20000, 'editor3'),
          //matchEngNum
      ]]
    })
    if(this.addEditPrivacyStatus === 0){
      this.ppId?.disable();
    }
  }
  getAddEditPrivacy(){
    this.messageService.messageEvent.subscribe((msg: any[]) => {
      console.log('msg', msg);
    })
  }
  // getPrivacyList(){
  //   this.examService.getPrivacyPolicyList({pageNum: 1, pageSize: 40}).subscribe(
  //     res => {
  //       this.privacyPolicyList = res.body?.pageData as PrivacyPolicyDTO[];
  //     }
  //   )
  // }
  getPrivacy(){
    this.examService.getPrivacyPolicy({
      ppId: this.editPrivacyIndex
    }).subscribe(
      res => {
        this.privacyForm.patchValue({
          ppId: res.body?.ppId,
          privacyContentCh: res.body?.contentCh,
          privacyContentEn: res.body?.contentEn
        })
      }
    )
  }
  add(){
    this.examService.addPrivacy({
      contentCh: this.privacyForm.value.privacyContentCh.replace(/<[^>]+>/gm, ''),
      contentEn: this.privacyForm.value.privacyContentEn.replace(/<[^>]+>/gm, '')
    }).subscribe(
      res => {
        console.log('res', res);
        let returnCode = res.header?.returnCode;
        if (returnCode === "B0002"){
          return this.alertService.error('隱私權政策說明中文內容不可為空，請檢查！')
        }
        this.alertService.success('儲存成功');
        this.backSystemHome();
      }
    );
  }
  edit(){
    this.examService.editPrivacyPolicy({
      ppId: this.privacyForm.value.ppId,
      contentCh: this.privacyForm.value.privacyContentCh.replace(/<[^>]+>/gm, ''),
      contentEn: this.privacyForm.value.privacyContentEn.replace(/<[^>]+>/gm, '')
    }).subscribe( res => {
      console.log('data', res);
      let returnCode = res.header?.returnCode;
      if (returnCode === "B0001"){
        return this.alertService.error('查無資料！')
      }
      if (returnCode === "B0002"){
        return this.alertService.error('隱私權政策說明中文內容不可為空，請檢查！')
      }
      this.backSystemHome();
      this.alertService.success('儲存成功');
    })
  }
  backSystemHome():void{
    this.router.navigate(['main/exam/privacy']);
  }
}
