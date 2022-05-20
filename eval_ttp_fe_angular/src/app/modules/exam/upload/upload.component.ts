import { Component, OnInit } from '@angular/core';

import { VMComponent } from 'src/app/common/base/vm.component';
import { UploadViewModel } from './upload.view-model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent extends VMComponent<UploadViewModel> {
  software: string = 'JAVA';

  constructor(
    private item: UploadViewModel,
  ) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
  }

  back() {
    this.vm.back();
  }

  submit() {
    this.vm.submit();
  }
}
