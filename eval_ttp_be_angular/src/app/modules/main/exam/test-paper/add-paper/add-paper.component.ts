import { AlertService } from 'src/app/common/services/alert.service';
import { FileUpload } from './../../../../../enum/fileUpload.enum';
import {
  FileUploadModel,
  UpdateErrorModel,
} from './../../../../../models/Exam/testPaper/file-upload';
import { Component, OnInit } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AddPaperViewModel } from './add-paper.view-model';

@Component({
  selector: 'app-add-paper',
  templateUrl: './add-paper.component.html',
  styleUrls: ['./add-paper.component.scss'],
})
export class AddPaperComponent extends VMComponent<AddPaperViewModel> {
  constructor(
    private item: AddPaperViewModel,
    private alertService: AlertService
  ) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
  }

  timeValue(e: any) {
    this.vm.timeValue(e);
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
    this.ValidateAllFormFields(this.vm.addPaper);
    this.ValidateAllFormFields(this.vm.addPaperItem);
    this.vm.checkBothContent();
    // const errorMsg = '資料填寫有誤，再請確認！';
    // if (this.vm.addPaperItem.invalid) {
    //   this.alertService.error(errorMsg);
    // } else {
    this.vm.save();
    // }
  }

  onFileChange(event: FileUploadModel, i: number) {
    // this.ValidateAllFormFields(this.vm.addPaperItemChild);
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
