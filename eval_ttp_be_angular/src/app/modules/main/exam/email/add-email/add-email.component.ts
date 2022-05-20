import { AlertService } from 'src/app/common/services/alert.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { Router } from '@angular/router';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AddEmailViewModel } from './add-email.view-model';
@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.scss']
})
export class AddEmailComponent extends VMComponent<AddEmailViewModel> {
  @ViewChild('editor2') editor1!:EditorComponent;
  addEmailForm!: FormGroup;
  get addEmailName(){
    return this.addEmailForm.get("addEmailName");
  }
  get addEmailPurpose(){
    return this.addEmailForm.get("addEmailPurpose");
  }
  get addEmailContent(){
    return this.addEmailForm.get("addEmailContent");
  }
  // roles: string[] = [];
  selectedRole!: "HR" | '主管' | '受測者';
  constructor
  (
    private item: AddEmailViewModel,
    private elementRef: ElementRef,
    private alertService: AlertService
  ) {
    super(item);
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
      case "${TB_NAME}":
        this.editor1.SetContent('${TB_NAME}')
        break
      case "${F_DATE}":
        this.editor1.SetContent('${F_DATE}')
        break
      case "${EVAL_EMAIL}":
        this.editor1.SetContent('${EVAL_EMAIL}')
        break
      case "${EVAL_DATE}":
        this.editor1.SetContent('${EVAL_DATE}')
        break
      case "${URL}":
        this.editor1.SetContent('${URL}')
        break
      default:
        break;
    }
    // this.editor1.SetContent('${USER_NAME}')
    event.preventDefault()
  }
  onAdd(){
    this.ValidateAllFormFields(this.vm.addEmailForm);
    if(this.vm.addEmailContent!.errors?.required === true){
      return this.alertService.error('Email 範本內容不可為空，請檢查！');
    }
    if(this.vm.addEmailContent!.errors?.imageMaxPiece === false){
      return this.alertService.error('範本圖片數量不可超出3張');
    }
    if(!this.vm.addEmailForm.valid){
      return this.alertService.error('欄位有錯，請檢查！');
    }
    return this.vm.add();
  }
  onChange(event: any){
    console.log(event);
  }
}
