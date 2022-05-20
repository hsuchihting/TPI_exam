import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { ViewSystemViewModel } from './viewSystem.view-model';
@Component({
  selector: 'app-view-system',
  templateUrl: './view-system.component.html',
  styleUrls: ['./view-system.component.scss']
})
export class ViewSystemComponent extends VMComponent<ViewSystemViewModel> {
  constructor(private item: ViewSystemViewModel ,private router: Router) {
    super(item)
  }
  backSystemHome(){
    this.router.navigate(['main/exam/system'])
  }
}
