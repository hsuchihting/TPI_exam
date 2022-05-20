import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { VMComponent } from 'src/app/common/base/vm.component';
import { ViewPrivacyViewModel } from './viewPrivacy.view-model';
@Component({
  selector: 'app-view-privacy',
  templateUrl: './view-privacy.component.html',
  styleUrls: ['./view-privacy.component.scss']
})
export class ViewPrivacyComponent extends VMComponent<ViewPrivacyViewModel> {
  constructor(
    private router: Router,
    private item: ViewPrivacyViewModel
  ) {
    super(item)
  }
  backPrivacyHome(){
    this.router.navigate(['main/exam/privacy'])
  }
}
