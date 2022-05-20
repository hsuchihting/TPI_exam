import { ExamService } from './../../../../modules/exam/exam.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dotest-modal',
  templateUrl: './dotest-modal.component.html',
  styleUrls: ['./dotest-modal.component.scss'],
})
export class DotestModalComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef;
  @Input()dotestFail!: string;
  constructor(private router: Router, private examService: ExamService) {}
  ngOnInit(): void {}
  submit() {
    $('#dotest').modal('hide');
    this.router.navigate(['/exam/test/1']);
  }

  cancel() {
    $('#dotest').modal('hide');
    this.router.navigate(['/login']);
  }
}
