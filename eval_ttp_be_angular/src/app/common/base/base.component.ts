import { Component, OnInit } from '@angular/core';
import { BaseViewModel } from './base.view-model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
@Component({
  template: '',
})
export class BaseComponent implements OnInit {
  private _vm?: BaseViewModel;

  constructor(private model: BaseViewModel) {
    this._vm = this.model;
  }

  ngOnInit(): void {
    this._vm?.init();
  }

  ValidateAllFormFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.ValidateAllFormFields(control);
      }
    });
  }
}
