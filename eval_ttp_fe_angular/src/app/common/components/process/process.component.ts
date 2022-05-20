import { Component, OnInit } from '@angular/core';
import { updateProcessModel } from 'src/app/models/projectModel';
import { ExamService } from 'src/app/modules/exam/exam.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent implements OnInit {
  percent = 0;
  currentPage = 1;
  total = 0;
  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService.updateProcessBar.subscribe((res: updateProcessModel) => {
      this.percent = Math.round(((res.finishedNum) / res.quSumQty) * 100);
      if(this.percent){
        this.percent = this.percent;
      }
      else{
        this.percent = 0;
      }
      this.currentPage = res.currentPage;
      this.total = res.totalPage;
    });
  }
}
