import { Injectable, ViewChild } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hasChinese } from 'src/app/common/validator/checkHasChinese';
import { matchEngNum, matchLangNum } from 'src/app/common/validator/checkLangNum';
import { ExamService } from './../../exam.service';
import { MessageService } from '../../message.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { TestDescDTO } from 'src/app/models/Exam/Test';


@Injectable({
  providedIn: 'root',
})

export class AddEditTestViewModel extends BaseViewModel{

  @ViewChild('editor3') editor1!:EditorComponent;

  testForm!: FormGroup;
  testDescList!: TestDescDTO[];
  editTestIndex!: number;
  addEditTestStatus!: number;
  addEditTdName!:string;
  isSearched!: boolean;

  get tdName(){
    return this.testForm.get("tdName");
  }

  get statusCode(){
    return this.testForm.get("statusCode");
  }

  get contentCh(){
    return this.testForm.get("contentCh");
  }

  get contentEn(){
    return this.testForm.get("contentEn");
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private examService: ExamService,
    private messageService: MessageService,
    private alertService: AlertService,
  ){
    super()
    this.createForm();
  }

  init(){
    this.createForm();
    this.messageService.messageEvent.subscribe((msg: any)=> {
      this.editTestIndex = msg[0];
      this.addEditTestStatus = msg[1];
      this.isSearched = msg[2];
      this.addEditTdName = msg[3];
      if(this.addEditTestStatus === 1){
        this.getTestList();
        setTimeout(()=> { this.getTest() }, 200);
      }
    });
  }

  createForm(){
    this.testForm = this.fb.group({
      tdName: ["", Validators.compose([Validators.required, Validators.maxLength(100)])],
      statusCode: ["", Validators.compose([Validators.required])],
      contentCh: ["", Validators.compose([Validators.required, Validators.maxLength(20000), matchLangNum,hasChinese])],
      contentEn: ["",]
    });
  }

  add(){
    this.examService.addTestDesc({
      tdName: this.testForm.value.tdName,
      statusCode: this.testForm.value.statusCode,
      contentCh: this.testForm.value.contentCh,
      contentEn: this.testForm.value.contentEn
    }).subscribe( res => {
      console.log('from add', res)
      let returnCode = res.header?.returnCode;
      let returnMsg = res.header?.returnMsg;
      if (returnCode === "B0002"){
        switch (returnMsg){
          case "欄位檢核錯誤，欄位:body.tdName，錯誤訊息:[測驗說明名稱]不可超過[100]字！":
            return this.alertService.error('[測驗說明名稱]不可超過 100 字！');
          case "[測驗說明名稱/測驗說明內容]不可為空，請填入！":
            return this.alertService.error('[測驗說明名稱/測驗說明內容]不可為空，請填入！');
          case `欄位檢核錯誤，欄位:body.statusCode，錯誤訊息:must match \"[YN]\"`:
            return this.alertService.error('使用狀態不可為空!');
          default:
            break
        }
      }
      if(returnCode === "B0601"){
        this.alertService.error('測驗說明名稱不可重複，請重新輸入!');
      }
      this.alertService.success('儲存成功');
      this.backTestHome();
      return
    })
  }

  edit(){
    this.examService.editTestDesc({
      tdSeq: this.editTestIndex,
      tdName: this.testForm.value.tdName,
      statusCode: this.testForm.value.statusCode,
      contentCh: this.testForm.value.contentCh,
      contentEn: this.testForm.value.contentEn
    }).subscribe( res => {
      console.log('from edit', res);
      this.backTestHome();
      this.alertService.success('儲存成功');
    })
  }

  getTestList(){
    if(this.isSearched === true){
      console.log('getTestList', this.isSearched);
      this.examService.getTestDescList({tdName: this.addEditTdName ,pageNum: 1, pageSize: 40}).subscribe(
        res => {
          console.log('from testList', res)
          this.testDescList = res.body?.pageData as TestDescDTO[];
        }
      );
    }else{
      console.log('getTestList', this.isSearched);
      this.examService.getTestDescList({pageNum: 1, pageSize: 40}).subscribe(
        res => {
          console.log('from testList', res)
          this.testDescList = res.body?.pageData as TestDescDTO[];
        }
      )
    }
  }

  getTest(){
    console.log('from addEditTest', this.editTestIndex)
    this.examService.getTestDesc({
      tdSeq: this.editTestIndex,
      isEdit: true
    }).subscribe(
      res => {
        this.testForm.patchValue({
          tdName: res.body?.tdName,
          statusCode: res.body?.statusCode,
          contentCh: res.body?.contentCh,
          contentEn: res.body?.contentEn
        })
      }
    )
  }

  backTestHome():void{
    this.router.navigate(['main/exam/test']);
  }
}
