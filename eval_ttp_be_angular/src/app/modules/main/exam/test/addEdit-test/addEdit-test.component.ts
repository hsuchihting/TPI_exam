import { Component, ElementRef, ViewChild } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { AddEditTestViewModel } from './addEditTest.view-model';

@Component({
  selector: 'app-addEdit-test',
  templateUrl: './addEdit-test.component.html',
  styleUrls: ['./addEdit-test.component.scss']
})
export class AddEditTestComponent extends VMComponent<AddEditTestViewModel>  {
  @ViewChild('editor3') editor1!:EditorComponent;
    constructor(
      item: AddEditTestViewModel,
      private elementRef: ElementRef,
      private alertService: AlertService,
    ) {
      super(item)
     }
    ngOnInit() {
      this.vm.init();
    }
    ngAfterViewInit(){
      this.elementRef.nativeElement.querySelector('.link').addEventListener(
        'click', this.insertContent.bind(this)
      )
    }
    insertContent(event:any, para:string) {
      let link = para;
      console.log(this.editor1);
      switch (link) {
        case "${USER_NAME}":
          this.editor1.SetContent('${USER_NAME}')
          console.log(this.editor1.SetContent)
          break;
        case "${JOB_TITLE}":
          this.editor1.SetContent('${JOB_TITLE}')
          break
        case "${TB_COUNT}":
          this.editor1.SetContent('${TB_COUNT}')
          break
        case "${EVAL_TIME}":
          this.editor1.SetContent('${EVAL_TIME}')
          break
        case "${TB_CONTENT}":
          this.editor1.SetContent('${TB_CONTENT}')
          break
        default:
          break;
      }
      // this.editor1.SetContent('${USER_NAME}')
      event.preventDefault()
    }
    onAddEdit(){
      this.ValidateAllFormFields(this.vm.testForm);
      if(this.vm.addEditTestStatus === 0){
        if(!this.vm.testForm.valid){
          if(this.vm.statusCode!.errors?.required === true){
            return this.alertService.error('使用狀態不可為空，請檢查！');
          }
          return this.alertService.error('欄位有錯，請檢查！');
        }
        return this.vm.add();
      }else if(this.vm.addEditTestStatus === 1){
        if(this.vm.statusCode!.errors?.required === true){
          return this.alertService.error('使用狀態不可為空，請檢查！');
        }
        if(!this.vm.testForm.valid){
          this.alertService.error('欄位有錯，請檢查！');
        }
        return this.vm.edit();
      }
    }
  }
