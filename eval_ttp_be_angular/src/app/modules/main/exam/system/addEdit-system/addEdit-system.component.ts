import { AddEditViewModel } from './addEditSystem.view-model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { AlertService } from 'src/app/common/services/alert.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-addEdit-system',
  templateUrl: './addEdit-system.component.html',
  styleUrls: ['./addEdit-system.component.scss']
})
export class AddEditSystemComponent extends VMComponent<AddEditViewModel> {
  @ViewChild('editor1') editor1!:EditorComponent;
  id!: number;
  constructor(
    private item: AddEditViewModel,
    private elementRef: ElementRef,
    private alertService: AlertService,
    private route: ActivatedRoute
    ) {
    super(item)
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.querySelector('.link').addEventListener(
      'click', this.insertContent.bind(this)
    )
  }
  insertContent(event: any, para:string){
    let link = para;
    switch (link) {
      case "${USER_NAME}":
        this.editor1.SetContent('${USER_NAME}');
        console.log(this.editor1.SetContent)
        break;
      default:
        break;
    }
    event.preventDefault();
  }
  onAddEdit(){
    this.ValidateAllFormFields(this.vm.systemForm);
    if(this.vm.addEditSystemStatus === 0){
      if(this.vm.systemContentCh!.errors?.required === true){
        this.alertService.error('系統說明中文內容不可為空，請檢查！');
      }
      if(!this.vm.systemForm.valid){
        this.alertService.error('欄位有錯，請檢查！');
      }
      return this.vm.add();
    }else if(this.vm.addEditSystemStatus === 1){
      if(this.vm.systemContentCh!.errors?.required === true){
        return this.alertService.error('系統說明中文內容不可為空，請檢查！');
      }
      if(this.vm.systemContentCh!.errors?.maxLength === true){
        return this.alertService.error('系統說明內容字數不可超過2000字，請檢查！');
      }
      if(!this.vm.systemForm.valid){
        return this.alertService.error('欄位有錯，請檢查！');
      }
      return this.vm.edit();
    }
  }
}
