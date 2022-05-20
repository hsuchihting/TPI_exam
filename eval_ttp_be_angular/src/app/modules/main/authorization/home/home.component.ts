import { HomeViewModel } from './home.view-model';
import {
  Component,
} from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends VMComponent<HomeViewModel> {

  constructor(private item: HomeViewModel) {
    super(item);
  }
}
