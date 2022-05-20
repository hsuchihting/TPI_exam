import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/common/services/session-storage.service';
import { CounterTimeService } from 'src/app/common/services/counter-time.service';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss'],
})
export class TimeoutComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private sessionService: SessionStorageService,
    private counterTimeService: CounterTimeService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sessionService.clear();
    this.counterTimeService.clearSessionTime();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
