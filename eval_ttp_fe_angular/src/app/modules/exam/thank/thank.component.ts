import { Component, OnInit } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { ThankViewModel } from './thank.view-model';

@Component({
  selector: 'app-thank',
  templateUrl: './thank.component.html',
  styleUrls: ['./thank.component.scss'],
})
export class ThankComponent extends VMComponent<ThankViewModel> {
  constructor(private item: ThankViewModel) {
    super(item);
  }
  ngOnInit(): void {
    this.vm.init();
  }
}
