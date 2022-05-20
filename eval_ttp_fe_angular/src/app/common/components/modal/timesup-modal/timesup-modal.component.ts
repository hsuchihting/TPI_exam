import { MessageService } from './../../../../modules/exam/message.service';
import { ModalService } from 'src/app/common/components/modal/modal.service';
import { Router } from '@angular/router';
import { VMComponent } from './../../../base/vm.component';
import { Component, Input, OnInit } from '@angular/core';
import { TimesupViewModel } from './timesup.view-model';

@Component({
  selector: 'app-timesup-modal',
  templateUrl: './timesup-modal.component.html',
  styleUrls: ['./timesup-modal.component.scss'],
})
export class TimesupModalComponent extends VMComponent<TimesupViewModel> {
  @Input() isFinished!: string;
  isLogout: boolean = false; /** session timeout controller */
  constructor(
    private item: TimesupViewModel,
    private router: Router,
    private modalService: ModalService,
    private msgService: MessageService
  ) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
    this.vm.show();
  }

  toThank() {
    if (this.isFinished === 'Y') {
      this.router.navigate(['/exam/thank']);
      this.msgService.sendMessage(this.isLogout);
    } else {
      this.router.navigate(['/exam/instruction']);
    }
    setTimeout(() => {
      $('#timeup').modal('hide');
      this.isLogout = true;
      this.msgService.sendMessage(this.isLogout);
      this.router.navigate(['/exam/thank']);
    }, 6000000);//6000000
  }

  send() {
    $('#timesup').modal('hide');
  }
}
