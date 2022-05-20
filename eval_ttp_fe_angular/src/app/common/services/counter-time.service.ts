import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKey } from 'src/app/enum/storage-key.enum';
import { TimeUpModel } from 'src/app/models/timeUpModel';
import { SessionStorageService } from 'src/app/common/services/session-storage.service';
@Injectable({
  providedIn: 'root',
})
export class CounterTimeService {
  time: TimeUpModel = {
    total: 0,
    hours: '0',
    minutes: '0',
    seconds: '0',
  };
  intervalTime: any;
  intervalSessionTime: any;
  @Output() updateTime = new EventEmitter<TimeUpModel>();
  constructor(
    private router: Router,
    private sessionService: SessionStorageService
  ) {}
  //* coding start
  timeStart() {
    // if (!this.timer) {
    //   this.timer = setInterval(() => {
    //     this.timeSet();
    //   }, 1000);
    // }
    // timer(1000, 1000)
    //   .pipe(
    //     map((i) => this.start - i),
    //     take(this.start + 1)
    //   )
    //   .subscribe((i) => {
    //     this.start = i;
    //   });
  }

  timeSet() {
    // if (this.sec === 0 && this.min > 0) {
    //   this.min = this.min - 1;
    // }
    // this.minTxt = this.min < 10 ? `0${this.min}` : this.min.toString();
    // this.sec = this.sec === 0 ? (this.sec = 59) : this.sec - 1;
    // this.secTxt =
    //   this.sec === 0
    //     ? '00'
    //     : this.sec < 0
    //     ? '59'
    //     : this.sec < 10
    //     ? `0${this.sec}`
    //     : this.sec.toString();
    // if (this.sec === 0 && this.min === 0) {
    //   // this.secTxt = '00:00';
    //   this.cancelTimer();
    // }
    // if (this.sec <= 0 && this.min < 0) {
    //   this.secTxt = '00:00';
    //   this.cancelTimer();
    // }
  }

  cancelTimer() {
    // clearInterval(this.timer);
    // this.timer = false;
  }

  countSessionTimeOut() {
    if (this.sessionService.get(StorageKey.access_token)) {
      this.intervalSessionTime = setTimeout(() => {
        this.router.navigate(['/exam/timeout']);
        this.clearSessionTime();
      }, 1000 * 60 * 60);
    }
  }

  /** 倒數計時 */
  countTime(total: number) {
    // 秒 const total = 60 * 1 * 2;
    // 取餘數
    const seconds = Math.floor(total % 60);
    const minutes = Math.floor((total / 60) % 60);
    let hours = Math.floor((total / (60 * 60)) % 24);
    const days = Math.floor(total / (60 * 60 * 24));

    if (days >= 1) {
      hours = days * 24 + hours;
    }

    if (('0' + hours).length >= 4) {
      this.time.hours = ('0' + hours).slice(-3);
    } else {
      this.time.hours = ('0' + hours).slice(-2);
    }

    this.time.total = total;
    this.time.minutes = ('0' + minutes).slice(-2);
    this.time.seconds = ('0' + seconds).slice(-2);
    /** 更新倒數時間 */
    this.updateTime.emit(this.time);
  }
  /** 初始化倒數時間 */
  initialTime(initTime: number) {
    const startTime = initTime || 60 * 60 * 2;
    this.countTime(startTime);
    this.intervalTime = setInterval(() => {
      this.countTime(this.time.total - 1);
      if (this.time.total <= 0) {
        this.clearTime();
      }
    }, 1000);
  }

  clearSessionTime() {
    clearTimeout(this.intervalSessionTime);
  }

  clearTime() {
    clearInterval(this.intervalTime);
  }
}
