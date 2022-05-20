import { CounterTimeService } from './../../common/services/counter-time.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/app/common/components/modal/modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  timeOut: boolean = false;
  hurry: boolean = false;
  min: number = 5;
  timesUp: boolean = false;
  constructor(private modalService: ModalService) {}
  ngOnInit(): void {
    this.timesUpShow();
  }

  showModal() {
    if (this.min) {
      this.modalService.open();
    }
  }

  timesUpShow() {
    setTimeout(() => {
      this.modalService.open();
      this.timesUp = true;
    }, 3000);
  }
}
