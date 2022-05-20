import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { StorageKey } from 'src/app/enum/storage-key.enum';
import { SessionStorageService } from './session-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CounterTimeService {

  intervalTime: any;
  intervalSessionTime: any;
  user!: SocialUser;
  empName!: string;


  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private authService: SocialAuthService,)
     {

   }

   //登入系統後閒置30分鐘後，系統會自動進行session timeout並導回登入頁
  countSessionTimeOut() {
    if (this.sessionStorageService.get(StorageKey.access_token)) {
      this.intervalSessionTime = setTimeout(() => {
        this.logOut();
      }, 1000 * 60 * 30);
    }
  }

  logOut(): void {
    this.authService
      .signOut()
      .then((res) => {
        console.log(res);
        this.user != res;
        this.sessionStorageService.clear();
        this.authService.signOut();
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clearSessionTime() {
    clearTimeout(this.intervalSessionTime);
  }
}
