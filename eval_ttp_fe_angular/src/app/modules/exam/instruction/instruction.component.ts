import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from 'src/app/common/services/language.service';
import { VMComponent } from 'src/app/common/base/vm.component';
import { InstructionViewModel } from './instruction.view-model';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss'],
})
export class InstructionComponent extends VMComponent<InstructionViewModel> {
  userName: string = '王曉明';
  job: string = '軟體工程師';
  test: string = '2';
  completed: boolean = false;
  constructor(private item: InstructionViewModel) {
    super(item);
  }

  ngOnInit() {
    this.vm.init();
  }

  pop() {
    this.vm.checkExamTime();
  }
}
