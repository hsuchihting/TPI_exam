import { Component } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { LoginViewModel } from './login.view-model';
import { LoadingService } from 'src/app/common/services/loading.service';
import { LanguageService } from 'src/app/common/services/language.service';
import { SessionStorageService } from 'src/app/common/services/session-storage.service';
import { StorageKey } from 'src/app/enum/storage-key.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends VMComponent<LoginViewModel> {
  disabled: boolean = true;
  checked: boolean = true;

  constructor(
    private loadingService: LoadingService,
    private languageService: LanguageService,
    private sessionStorageService: SessionStorageService,
    private item: LoginViewModel
  ) {
    super(item);
  }

  /** @param {string} lang - en:英文,zh-tw:中文 */
  setLang(lang: string) {
    this.vm.isTw = lang === 'zh-tw';
    this.vm.loginForm.patchValue({
      lang: lang
    });
    this.loadingService.show();
    this.languageService.setLang(lang);
    this.sessionStorageService.set(StorageKey.lang, lang);
    setTimeout(() => {
      this.loadingService.hide();
    }, 500);
  }
  ngOnInit(): void {
    this.vm.init();
  }

  login() {
    this.vm.login();
  }
}
