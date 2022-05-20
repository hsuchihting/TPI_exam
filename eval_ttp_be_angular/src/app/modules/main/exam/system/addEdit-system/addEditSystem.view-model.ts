import { ExamService } from './../../exam.service';
import { hasChinese } from 'src/app/common/validator/checkHasChinese';
import { matchEngNum, matchLangNum } from 'src/app/common/validator/checkLangNum';
import { Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/services/alert.service';
import { SysDescDTO } from 'src/app/models/Exam/System';
import { MessageService } from '../../message.service';
@Injectable({
  providedIn: 'root'
})
export class AddEditViewModel extends BaseViewModel{
  @ViewChild('editor1') editor1!:EditorComponent;
  systemForm!: FormGroup;
  systemDescList!: SysDescDTO[];
  editSystemIndex!: string;
  addEditSystemStatus!: number;
  get sdId(){
    return this.systemForm.get("sdId");
  }
  get systemContentCh(){
    return this.systemForm.get("systemContentCh");
  }
  get systemContentEn(){
    return this.systemForm.get("systemContentEn");
  }
  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService
    ){
    super()
  }
  init(){
    //this.getSystemList();
    this.messageService.messageEvent.subscribe((msg: any)=> {
      this.addEditSystemStatus = msg[1];
      console.log('addEdit msg', this.addEditSystemStatus);
      this.editSystemIndex = msg[0];
      if(this.addEditSystemStatus === 1){
        setTimeout(()=> { this.getSystem()}, 200);
      }
    });
    this.createForm()
  }
  createForm(){
    this.systemForm = this.fb.group({
      sdId: '',
      systemContentCh: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(2000),
        hasChinese,
        matchLangNum
      ])],
      systemContentEn: ['', [
        //matchEngNum
      ]]
    })
    if(this.addEditSystemStatus === 0){
      this.sdId?.disable();
    }
  }
  backSystemHome():void{
    this.router.navigate(['main/exam/system'])
  }
  add(){
    this.examService.addSystem({
      contentCh: this.systemForm.value.systemContentCh,
      contentEn: this.systemForm.value.systemContentEn
    }).subscribe( data => {
      console.log('data', data);
      let returnCode = data.header?.returnCode;
      if (returnCode === "B0002"){
        return this.alertService.error('系統說明中文內容不可為空，請檢查！')
      }
      this.backSystemHome();
      this.alertService.success('儲存成功');
    });
  }
  edit(){
    this.examService.editSystemDesc({
      sdId: this.systemForm.value.sdId,
      contentCh: this.systemForm.value.systemContentCh,
      contentEn: this.systemForm.value.systemContentEn
    }).subscribe( data => {
      console.log('data', data);
      let returnCode = data.header?.returnCode;
      if (returnCode === "B0002"){
        return this.alertService.error('系統說明中文內容不可為空，請檢查！')
      }
      this.backSystemHome();
      this.alertService.success('儲存成功');
    });
  }
  getSystem(){
    this.examService.getSystemDesc({
      sdId: this.editSystemIndex,
      isEdit: true
    }).subscribe(
      res => {
        // console.log(res);
        this.systemForm.patchValue({
          sdId: res.body?.sdId,
          systemContentCh: res.body?.contentCh,
          systemContentEn: res.body?.contentEn
        })
      }
    )
  }
}
