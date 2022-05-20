import { Component, ElementRef, HostListener } from '@angular/core';

import { VMComponent } from 'src/app/common/base/vm.component';
import { PrivacyViewModel } from './privacy.view-model';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent extends VMComponent<PrivacyViewModel> {
  disabled: boolean = true;
  check: boolean = false;
  //* 監聽 DOM
  @HostListener('scroll', ['$event']) onElementScroll($event: any) {
    // console.log($event); //有事件觸發
    let modal = this.el.nativeElement.querySelector('.scrollModal');
    let readPrivacy =
      modal.scrollHeight - modal.scrollTop === modal.clientHeight;
    if (readPrivacy) {
      this.onCheck();
    }
  }

  constructor(private item: PrivacyViewModel, private el: ElementRef) {
    super(item);
  }

  ngOnInit() {
    this.vm.init();
    this.onElementScroll(event);
  }

  onCheck() {
    if (this.vm.data) {
      this.disabled = false;
      this.check = true;
    }
  }

  next() {
    this.ValidateAllFormFields(this.vm.checkboxForm);
    this.vm.next();
  }
}
