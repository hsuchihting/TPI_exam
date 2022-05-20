import { Inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { SessionStorageService } from '../services/session-storage.service';
import { StorageKey } from 'src/app/enum/storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private sessionService: SessionStorageService,
    private router: Router
  ) {}
  canActivate(
    //
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.doAction();
  }
  doAction(): boolean {
    const token = this.sessionService.get(StorageKey.access_token) as string;
    if (!token) {
      Swal.fire({
        title: '無此功能使用權限',
        text: '您尚無此功能使用權限，如有疑問，請洽系統管理員！',
        icon: 'error',
        confirmButtonText: '確認',
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return false;
    } else return true;
  }
}
