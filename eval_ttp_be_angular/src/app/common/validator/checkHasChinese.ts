import { FormControl } from '@angular/forms';
export function hasChinese(c: FormControl) {
  let CHINESE_CHECK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
  return CHINESE_CHECK.test(c.value)
    ? null
    : {
        hasChinese: {
          valid: false,
        },
      };
}
