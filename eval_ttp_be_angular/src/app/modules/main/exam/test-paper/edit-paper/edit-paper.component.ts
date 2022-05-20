import { AlertService } from 'src/app/common/services/alert.service';
import { FileUpload } from './../../../../../enum/fileUpload.enum';
import {
  FileUploadModel,
  UpdateErrorModel,
} from './../../../../../models/Exam/testPaper/file-upload';
import { Component, OnInit } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { EditPaperViewModel } from './edit-paper.view-model';

@Component({
  selector: 'app-edit-paper',
  templateUrl: './edit-paper.component.html',
  styleUrls: ['./edit-paper.component.scss'],
})
export class EditPaperComponent extends VMComponent<EditPaperViewModel> {
  constructor(
    private item: EditPaperViewModel,
    private alertService: AlertService
  ) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
  }

  addTestPaper() {
    this.vm.addTestPaper();
  }

  delTestPaper(i: number) {
    this.vm.delTestPaper(i);
  }
  add(i: number) {
    this.vm.add(i);
  }

  del(i: number, j: number) {
    this.vm.del(i, j);
  }

  trackFn(index: any) {
    return index;
  }

  //*驗證所有表單
  saveAllForm() {
    // console.log(this.vm.editPaper);
    // console.log(this.vm.paperControl.value);
    this.ValidateAllFormFields(this.vm.editPaper);
    this.ValidateAllFormFields(this.vm.editPaperItem);
    this.vm.checkBothContent();
    // this.vm.checkCorrectAns();
    // const errorMsg = '資料填寫有誤，再請確認！';
    // if (this.vm.editPaperItem.invalid || this.vm.editPaper.invalid) {
    //   this.alertService.error(errorMsg);
    // } else {
      this.vm.save();
    // }
  }

  onFileChange(event: FileUploadModel, i: number) {
    this.vm.onFileChange(event, i);
  }

  uploadAns(event: FileUploadModel, i: number, j: number) {
    this.vm.uploadAns(event, i, j);
  }

  updateError(event: UpdateErrorModel, i: number) {
    this.vm.updateError(event, i);
  }

  answerTitle(j: number) {
    return this.vm.answerTitle(j);
  }

  cancel() {
    this.vm.cancel();
  }
}
