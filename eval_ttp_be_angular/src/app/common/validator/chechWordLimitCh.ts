import { FormControl } from '@angular/forms';
export function hasChinese(c: FormControl) {
  //中文數字
  let CHINESE_CHECK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f0-9]/;
  return CHINESE_CHECK.test(c.value)
    ? null
    : {
        hasChinese: {
          valid: false,
        },
      };
}
