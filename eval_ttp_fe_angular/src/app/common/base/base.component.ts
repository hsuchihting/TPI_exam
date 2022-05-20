import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseViewModel } from './base.view-model';
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

  ValidateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.ValidateAllFormFields(control);
      }
    });
  }
}
