import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/common/base/base.view-model';
import { AuthService } from '../auth.service';
import { SessionStorageService } from 'src/app/common/services/session-storage.service';
import { StorageKey } from 'src/app/enum/storage-key.enum';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/common/services/loading.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginViewModel extends BaseViewModel {
  user!: SocialUser;
  loggedIn: boolean = false;
  subscription: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private loadingService: LoadingService,
    private socialAuthService: SocialAuthService,

  ) {
    super();
  }

  init(): void {
    this.subscription.add(
      this.socialAuthService.authState.subscribe((user) => {
        // console.log(this.loggedIn);
        // console.log(this.user);
        this.user = user;
        if (this.user && this.loggedIn) {
          this.loginMain();
        }
      })
    );
  }

  destory() {
    this.subscription.unsubscribe();
  }

  login() {
    this.loggedIn = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginMain() {
    this.authService
      .verifyPermissions({
        token: this.user.authToken,
        type: 'Google',
        userEmail: this.user.email,
      })
      .subscribe((res) => {
        // console.log(res);
        if (res.body?.accessToken) {
          this.sessionStorageService.set(
            StorageKey.access_token,
            res.body?.accessToken
          );
          this.sessionStorageService.set(StorageKey.menu, res.body?.roleFunction);
          this.router.navigate(['/main']);
        } else{

            Swal.fire({
              title: '系統訊息!',
              text: '無使用權限',
              icon: 'error',
              confirmButtonText: '取消',
            }).then(() => {
              this.router.navigate(['/login']);
            });

        }
      });
  }
}
