import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { StorageKey } from 'src/app/enum/storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language$ = new ReplaySubject<LangChangeEvent>(1);
  translate = this.translateService;

  constructor(
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService
  ) {}

  setInitState() {
    this.translateService.addLangs(['en', 'zh-tw']);
    const lang = this.sessionStorageService.get(StorageKey.lang) as string;
    if (lang) {
      this.setLang(lang);
    } else {
      this.sessionStorageService.set(StorageKey.lang, 'zh-tw');
      this.setLang('zh-tw');
    }
  }

  setLang(lang: string) {
    this.translateService.onLangChange.pipe(take(1)).subscribe((result) => {
      this.language$.next(result);
    });
    this.translateService.use(lang);
  }
}
