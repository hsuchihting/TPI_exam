import { LoginViewModel } from './login.view-model';
import { VMComponent } from './../../../common/base/vm.component';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends VMComponent<LoginViewModel>
  implements OnDestroy {
  constructor(private item: LoginViewModel) {
    super(item);
  }
  ngOnDestroy(): void {
    this.vm.destory();
  }

  ngOnInit(): void {
    this.vm.init();
  }

  logIn() {
    this.vm.login();
  }
}
