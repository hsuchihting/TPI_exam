import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { AuthService } from '../auth.service';
import { SessionStorageService } from 'src/app/common/services/session-storage.service';
import { StorageKey } from 'src/app/enum/storage-key.enum';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CounterTimeService } from 'src/app/common/services/counter-time.service';

@Injectable({
  providedIn: 'root',
})
export class LoginViewModel extends BaseViewModel {
  isTw: boolean = true;
  loginForm: FormGroup = new FormGroup({
    uuid: new FormControl(''),
    email: new FormControl(''),
    lang: new FormControl('zh-tw'),
  });
  isFail!: string; //login failure condition

  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private counterTimeService: CounterTimeService
  ) {
    super();
  }

  init(): void {
    const lang = this.sessionStorageService.get(StorageKey.lang) as string;
    if (lang) {
      this.isTw = lang === 'zh-tw';
    }

    this.createForm();
    this.clearSession();
  }

  clearSession() {
    this.sessionStorageService.clear();
    this.counterTimeService.clearSessionTime();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      uuid: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9.!#$%&』*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
          ),
        ]),
      ],
      lang: ['zh-tw', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.authService
        .login({
          testerId: this.loginForm.getRawValue().uuid,
          testerEmail: this.loginForm.getRawValue().email,
          langTag:
            this.loginForm.getRawValue().lang === 'zh-tw' ? 'zh-TW' : 'en-US',
        })
        .subscribe(res => {
          let returnCode = res.header?.returnCode;
          let returnMsg = res.header?.returnMsg;
          if(returnCode === "F2003"){
            if(returnMsg === "欄位檢核錯誤 : body.testerId tester id 不可為空，請填入！"){
              this.isFail = "uuid"
              return $('#failLogin').modal('show');
            }
            if(returnMsg === "欄位檢核錯誤 : body.testerEmail tester email 不可為空，請填入！"){
              this.isFail = "email"
              return $('#failLogin').modal('show');
            }
          }
          return
        })
    } else {
      this.authService
        .login({
          testerId: this.loginForm.getRawValue().uuid,
          testerEmail: this.loginForm.getRawValue().email,
          langTag:
            this.loginForm.getRawValue().lang === 'zh-tw' ? 'zh-TW' : 'en-US',
        })
        .subscribe((res) => {
          console.log(res);
          let returnCode = res.header?.returnCode;
          switch(returnCode){
            case "F1001":
            this.isFail = "uuidInCorrect"
            return $('#failLogin').modal('show');
            case "F1003":
            this.isFail = "finishTest"
            return $('#failLogin').modal('show');
            case "F1004":
            this.isFail = "expire"
            return $('#failLogin').modal('show');
            default:
            break
          }
          this.sessionStorageService.set(
            StorageKey.access_token,
            res.body?.accessToken
          );
          this.router.navigate(['/exam/privacy']);
        });
    }
  }
}
