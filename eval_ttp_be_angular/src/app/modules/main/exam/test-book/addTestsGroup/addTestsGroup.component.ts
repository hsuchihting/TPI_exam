import { Component, OnInit } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { AddTestGroupViewModel } from './addTestGroup.view-model';

@Component({
  selector: 'app-addTestsGroup',
  templateUrl: './addTestsGroup.component.html',
  styleUrls: ['./addTestsGroup.component.scss']
})
export class AddTestsGroupComponent extends VMComponent<AddTestGroupViewModel> {

  constructor(
    private item: AddTestGroupViewModel
  ) {
    super(item)
  }

  ngOnInit(): void {
    this.vm.init();
  }

}
