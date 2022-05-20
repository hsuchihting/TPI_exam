import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseViewModel } from "src/app/common/base/base.view-model";
import { SysDescDTO } from "src/app/models/Exam/System";
import { ExamService } from "../../exam.service";
import { MessageService } from "../../message.service";
@Injectable({
  providedIn: 'root',
})
export class ViewSystemViewModel extends BaseViewModel{
  viewSystemForm!: FormGroup;
  viewSystemId!: string;
  systemDescList!: SysDescDTO[];
  viewSystemIndex!: string;
  get viewSystemContent(){
    return this.viewSystemForm.get('viewSystemContent');
  }
  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private messageService: MessageService
  ){
    super()
  }
  init(){
    //this.getSystemList();
    this.messageService.messageEvent.subscribe((msg: any)=> {
      console.log('msg', msg);
      this.viewSystemIndex = msg;
      setTimeout(()=> { this.getSystem()}, 200);
    })
    this.createForm();
  }
  createForm(){
    this.viewSystemForm = this.fb.group({
      viewSystemContent: '',
    })
    this.viewSystemContent?.disable();
  }
  // getSystemList(){
  //   this.examService.getSystemDescList({pageNum: 1, pageSize: 40}).subscribe(
  //     res => {
  //       this.systemDescList = res.body?.pageData as SysDescDTO[];
  //     }
  //   )
  // }
  getSystem(){
    this.examService.getSystemDesc({
      sdId: this.viewSystemIndex,
      isEdit: true
    }).subscribe(
      (res:any) => {
        console.log(res)
        this.viewSystemId = res.body?.sdId;
        this.viewSystemForm.patchValue({
          viewSystemContent: res.body?.contentCh
        })
      }
    )
  }
}
