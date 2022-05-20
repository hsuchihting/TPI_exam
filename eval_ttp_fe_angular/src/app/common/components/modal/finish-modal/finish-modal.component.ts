import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish-modal',
  templateUrl: './finish-modal.component.html',
  styleUrls: ['./finish-modal.component.scss']
})
export class FinishModalComponent implements OnInit {
  @Input() isFail!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
