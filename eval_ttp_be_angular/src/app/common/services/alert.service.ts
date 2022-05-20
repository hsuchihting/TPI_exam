import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
  })
  export class AlertService {
    success(msg: string): void {
        Swal.fire({
          title: '系統訊息!',
          text: msg,
          icon: 'success',
          confirmButtonText: '確定',
        });
      }

      error(msg: string | undefined): void {
        Swal.fire({
          title: '系統訊息!',
          text: msg,
          icon: 'error',
          confirmButtonText: '確定',
        });
      }

      errorRepeat(msg: string|undefined): void {
        Swal.fire({
          title: '系統訊息!',
          text: msg,
          icon: 'error',
          confirmButtonText: '確定',
        });
      }

      noDatas(msg: string|undefined): void {
        Swal.fire({
          title: '系統訊息!',
          text: msg,
          icon: 'error',
          confirmButtonText: '確定',
        });
      }

  }
