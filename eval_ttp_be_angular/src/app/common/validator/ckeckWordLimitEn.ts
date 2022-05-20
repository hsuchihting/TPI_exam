import { FormControl } from '@angular/forms';
export function hasEnglish(c: FormControl) {
  //英文數字
  let English_CHECK = /^[_a-zA-Z0-9]+$/;
  // ^[a-zA-Z0-9]+$ contain number and english
  return English_CHECK.test(c.value)
    ? null
    : {
        hasEnglish: {
          valid: false,
        },
      };
}
