import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LanguageService } from 'src/app/common/services/language.service';
import { map } from 'rxjs/operators';

// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [],
  exports: [CommonModule, HttpClientModule, TranslateModule],
  providers: [],
})
export class LanguageModule {
  language$ = this.languageService.language$;
  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {
    this.language$
      .pipe(map((language) => language.lang))
      .subscribe((lang) => this.translateService.use(lang));
  }
}
