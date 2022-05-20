import { FormControl } from '@angular/forms';
export function matchLangNum(c: FormControl) {
  //中英文數字
  let LangNum_CHECK = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
  // ^[a-zA-Z0-9]+$ contain number and english
  return LangNum_CHECK.test(c.value)
    ? null
    : {
        matchLangNum: {
          valid: false,
        },
      };
}
