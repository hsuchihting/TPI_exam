import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { ViewEmailViewModel } from './viewEmail.view-model';
@Component({
  selector: 'app-view-email',
  templateUrl: './view-email.component.html',
  styleUrls: ['./view-email.component.scss'],
})
export class ViewEmailComponent extends VMComponent<ViewEmailViewModel> {
  constructor(private router: Router, private item: ViewEmailViewModel) {
    super(item);
  }
  backEmailHome(): void {
    this.router.navigate(['main/exam/email']);
  }
}
