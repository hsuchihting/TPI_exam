import { FormControl } from '@angular/forms';

export function matchLangNum(c: FormControl) {
  const changedString = String(c.value).replace(/<[^>]+>/gm, '');

  let LangNum_CHECK = /^[\u4e00-\u9fa5_a-zA-Z0-9\s\S]+$/;
  // ^[a-zA-Z0-9]+$ contain number and english

  return LangNum_CHECK.test(changedString)
    ? null
    : {
        matchLangNum: {
          valid: false,
        },
      };
}

export function matchEngNum(c: FormControl) {
  const changedString = String(c.value).replace(/<[^>]+>/gm, '');

  let EngNum_CHECK = /^[a-zA-Z#$-/:-?{-~!"^_`\[\]0-9\s]+$/;

  return EngNum_CHECK.test(changedString)
    ? null
    : {
        matchEngNum: {
          valid: false,
        },
      };
}
