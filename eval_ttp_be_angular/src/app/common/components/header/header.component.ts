import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavService } from '../sidenav/nav.service';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { SessionStorageService } from '../../services/session-storage.service';
import { StorageKey } from 'src/app/enum/storage-key.enum';
import { Base64 } from 'js-base64';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: SocialUser;
  empName!: string;
  constructor(
    private navService: NavService,
    private authService: SocialAuthService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    const token: string = this.sessionStorageService.get(
      StorageKey.access_token
    ) as string;
    const user = JSON.parse(Base64.decode(token.split('.')[1])).empUser;
    this.empName = JSON.parse(user).empName;
  }

  open() {
    this.navService.appDrawer.toggle();
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
}
