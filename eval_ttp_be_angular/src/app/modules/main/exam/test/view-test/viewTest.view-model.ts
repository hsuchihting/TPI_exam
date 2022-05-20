import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from "@angular/core";
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { ExamService } from "../../exam.service";
import { MessageService } from './../../message.service';
import { TestDescDTO } from 'src/app/models/Exam/Test';

@Injectable({
  providedIn: 'root',
})

export class ViewTestViewModel extends BaseViewModel{

  viewTestForm!: FormGroup;
  viewTestIndex!: number;
  viewTdName!: string
  testDescList!: TestDescDTO[];
  isSearched!: boolean;

  get tdName(){
    return this.viewTestForm.get('tdName');
  };

  get contentCh(){
    return this.viewTestForm.get('contentCh');
  };

  get contentEn(){
    return this.viewTestForm.get('contentEn');
  }

  init(){
    this.messageService.messageEvent.subscribe((msg: any) => {
      this.viewTestIndex = msg[0];
      this.isSearched = msg[2];
      this.viewTdName = msg[3];
      this.getTestList();
      setTimeout(()=> { this.getTest()}, 200);
    })
  }

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private messageService: MessageService
  ){
    super();
    this.createForm();
  }

  createForm(){
    this.viewTestForm = this.fb.group({
      tdName: '',
      contentCh: '',
      contentEn: ''
    })
    this.tdName?.disable();
    this.contentCh?.disable();
    this.contentEn?.disable();
  }

  getTestList(){
    if(this.isSearched === true){
      this.examService.getTestDescList({tdName: this.viewTdName ,pageNum: 1, pageSize: 40}).subscribe(
        res => {
          console.log('from testList', res)
          this.testDescList = res.body?.pageData as TestDescDTO[];
        }
      );
    }else{
      this.examService.getTestDescList({pageNum: 1, pageSize: 40}).subscribe(
        res => {
          console.log('from testList', res)
          this.testDescList = res.body?.pageData as TestDescDTO[];
        }
      )
    }
  }

  getTest(){
    this.examService.getTestDesc({
      tdSeq: this.viewTestIndex,
      isEdit: false
    }).subscribe(
      res => {
        this.viewTestForm.patchValue({
          tdName: res.body?.tdName,
          contentCh: res.body?.contentCh,
          contentEn: res.body?.contentEn
        })
      }
    )
  }

}
