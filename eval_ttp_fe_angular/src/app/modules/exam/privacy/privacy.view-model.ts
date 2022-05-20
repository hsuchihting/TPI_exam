import { ExamService } from './../exam.service';
import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SysDescQryRes } from 'src/app/models/sysDescQryModel';

@Injectable({
  providedIn: 'root',
})
export class PrivacyViewModel extends BaseViewModel {
  checkboxForm!: FormGroup;
  data!: SysDescQryRes;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private examService: ExamService
  ) {
    super();
  }

  init(): void {
    this.createForm();
    this.examService.sysDescQry().subscribe((res) => {
      this.data = res.body as SysDescQryRes;
    });
  }
  createForm() {
    this.checkboxForm = this.formBuilder.group({
      checkbox1: ['', Validators.requiredTrue],
    });
  }

  next() {
    if (this.checkboxForm.valid) {
      this.examService
        .sysDescAgree({
          isAgree: 'Y',
          sdId: this.data.sdId,
          ppId: this.data.ppId,
        })
        .subscribe(() => {
          this.router.navigate(['/exam/instruction']);
        });
    }
  }
}
