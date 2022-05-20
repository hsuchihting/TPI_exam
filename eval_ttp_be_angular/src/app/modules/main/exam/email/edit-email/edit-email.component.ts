import { EditEmailViewModel } from './editEmail.view-model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { AlertService } from 'src/app/common/services/alert.service';
@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss']
})
export class EditEmailComponent extends VMComponent<EditEmailViewModel> {
  @ViewChild('editor2') editor1!:EditorComponent;
  constructor(private item: EditEmailViewModel, private elementRef:ElementRef, private alertService: AlertService) {
    super(item);
  }
  ngAfterViewInit(){
    console.log('ngAfterViewInit');
    this.elementRef.nativeElement.querySelector('.link').addEventListener(
      'click', this.insertContent.bind(this)
    )
  }
  insertContent(event:any, para:string){
    let link = para;
    switch (link) {
      case "${USER_NAME}":
        this.editor1.SetContent('${USER_NAME}');
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
    this.ValidateAllFormFields(this.vm.editEmailForm);
    if(!this.vm.editEmailForm.valid){
      this.alertService.error('欄位有錯，請檢查！');
      return
    }
    return this.vm.edit();
  }
}
