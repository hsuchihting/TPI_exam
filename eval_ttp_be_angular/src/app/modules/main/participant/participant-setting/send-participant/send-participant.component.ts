import { Component, OnInit } from '@angular/core';
import { VMComponent } from 'src/app/common/base/vm.component';
import { ParticipantService } from '../../participant.service';
import { SendParticipantViewModel } from './send-participant.view-model';

@Component({
  selector: 'app-send-participant',
  templateUrl: './send-participant.component.html',
  styleUrls: ['./send-participant.component.scss']
})
export class SendParticipantComponent extends VMComponent<SendParticipantViewModel> {

  constructor(
    private item: SendParticipantViewModel,
    private participantService: ParticipantService,
      ) {
    super(item);
  }

  ngOnInit(){
    this.vm.init();
  }

  ngOnDestroy() {
    this.vm.destroy();
  }

  onClickExport(){
    this.participantService.getTestsNotify({
      testerId:this.vm.getTesterId
    }).subscribe((res) => {
      console.log('getTestsNotify - res = ' , res);
      let downloadURL = window.URL.createObjectURL(res);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'test.xlsx'; //瀏覽器下載時的檔案名稱
      link.click();
    });
  }

}
