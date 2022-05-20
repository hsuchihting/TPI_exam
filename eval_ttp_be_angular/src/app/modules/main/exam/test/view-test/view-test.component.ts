import { VMComponent } from 'src/app/common/base/vm.component';
import { Component } from '@angular/core';
import { ViewTestViewModel } from './viewTest.view-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.scss']
})
export class ViewTestComponent extends VMComponent<ViewTestViewModel> {

  constructor(
    private item: ViewTestViewModel,
    private router: Router,
  ) {
    super(item)
  }

  backTestHome(){
    this.router.navigate(['main/exam/test'])
  }

}
