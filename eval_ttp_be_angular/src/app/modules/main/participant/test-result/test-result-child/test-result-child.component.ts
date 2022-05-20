import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { LoadingService } from 'src/app/common/services/loading.service';
import { TestResultChildViewModel } from './test-result-child.view-model';
import { ParticipantService } from '../../participant.service';

@Component({
  selector: 'app-test-result-child',
  templateUrl: './test-result-child.component.html',
  styleUrls: ['./test-result-child.component.scss'],
})
export class TestResultChildComponent extends VMComponent<TestResultChildViewModel> {
  constructor(
    private item: TestResultChildViewModel,
    private loadingService: LoadingService,
    private participantService: ParticipantService
  ) {
    super(item);
  }

  ngOnInit(): void {
    this.vm.init();
  }

  ngOnDestroy() {
    this.vm.destroy();
  }

  downloadFile(index: number) {
    this.participantService
      .dowlandTesterResult({
        testerId: this.vm.getTesterId,
        testsGroupSeq: this.vm.getTestsGroupSeq,
        testSeq: this.vm.dataSourceChild.data[index].testSeq,
        type: 'U',
      })
      .subscribe((res) => {
        console.log('dowlandTesterResult = ', res);
        let downloadURL = window.URL.createObjectURL(res);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.vm.dataSourceChild.data[index].testSeq +'.zip'; //瀏覽器下載時的檔案名稱
        link.click();
      });
  }

  downloadPDF(index: number) {
    this.participantService
      .dowlandTesterResult({
        testerId: this.vm.getTesterId,
        testsGroupSeq: this.vm.getTestsGroupSeq,
        testSeq: this.vm.dataSourceChild.data[index].testSeq,
        type: 'P',
      })
      .subscribe((res) => {
        console.log('dowlandTesterResult = ', res);
        let downloadURL = window.URL.createObjectURL(res);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.vm.dataSourceChild.data[index].testSeq +'.pdf'; //瀏覽器下載時的檔案名稱
        link.click();
      });
  }

  exportExcel(index: number) {
    this.participantService
      .dowlandTesterResult({
        testerId: this.vm.getTesterId,
        testsGroupSeq: this.vm.getTestsGroupSeq,
        testSeq: this.vm.dataSourceChild.data[index].testSeq,
        type: 'E',
      })
      .subscribe((res) => {
        console.log('dowlandTesterResult = ', res);
        let downloadURL = window.URL.createObjectURL(res);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.vm.dataSourceChild.data[index].testSeq +'.xlsx'; //瀏覽器下載時的檔案名稱
        link.click();
      });
  }

}
