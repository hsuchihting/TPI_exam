import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function editorLimit(limit: number, editorId: string = ''): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (editorId) {
      const countWord = $(`#${editorId}  .formInput_count`).text() || 0;
      return +countWord > limit
        ? { errorWord: `輸入字元已超過${limit}字！` }
        : null;
    } else {
      return null;
    }
  };
}

@Directive({
  selector: '[editorLimit]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EditorLimitValidatorDirective,
      multi: true,
    },
  ],
})
export class EditorLimitValidatorDirective implements Validator {
  @Input() editorId: string = '';
  @Input() limit: number = 2000;
  validate(control: AbstractControl): { [key: string]: any } | null {
    return editorLimit(this.limit, this.editorId)(control);
  }
}
