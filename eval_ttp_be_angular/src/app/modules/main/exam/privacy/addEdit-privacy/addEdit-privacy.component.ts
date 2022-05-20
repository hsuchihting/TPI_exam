import { PrivacyType } from './../../enumType';
import { AddEditPrivacyViewModel } from './addEditPrivacy.view-model';
import { Component, ElementRef, ViewChild, Injectable } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { AlertService } from 'src/app/common/services/alert.service';
@Component({
  selector: 'app-addEdit-privacy',
  templateUrl: './addEdit-privacy.component.html',
  styleUrls: ['./addEdit-privacy.component.scss']
})
export class AddEditPrivacyComponent extends VMComponent<AddEditPrivacyViewModel> {
  @ViewChild('editor3') editor1!:EditorComponent;
  constructor(
    private item: AddEditPrivacyViewModel,
    private elementRef: ElementRef,
    private alertService: AlertService
  ) {
    super(item);
  }
  ngAfterViewInit(){
    console.log('ngAfterViewInit');
    this.elementRef.nativeElement.querySelector('.link').addEventListener(
      'click', this.insertContent.bind(this)
    )
  }
  insertContent(event: any, para:string){
    let link = para;
    switch (link) {
      case "${USER_NAME}":
        this.editor1.SetContent('${USER_NAME}');
        // console.log(this.editor1.SetContent)
        break;
      default:
        break;
    }
    event.preventDefault();
  }
  onAdd(){
    this.ValidateAllFormFields(this.vm.privacyForm);
    if(this.vm.addEditPrivacyStatus === 0){
      if(this.vm.privacyContentCh!.errors?.required === true){
        return this.alertService.error('隱私權政策說明中文內容不可為空，請檢查！');
      }
      if(!this.vm.privacyForm.valid){
        return this.alertService.error('欄位有錯，請檢查！');
      }
      return this.vm.add();
    }else if(this.vm.addEditPrivacyStatus === 1){
      if(this.vm.privacyContentCh!.errors?.required === true){
        return this.alertService.error('隱私權政策說明中文內容不可為空，請檢查！');
      }
      if(!this.vm.privacyForm.valid){
        return this.alertService.error('欄位有錯，請檢查！');
      }
      return this.vm.edit();
    }
  }
}





