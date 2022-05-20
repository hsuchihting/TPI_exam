
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-uncompleted-modal',
  templateUrl: './uncompleted-modal.component.html',
  styleUrls: ['./uncompleted-modal.component.scss'],
})
export class UncompletedModalComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef;
  constructor(
    private router: Router,
    private el: ElementRef,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  submit() {
    // this.el.nativeElement.click();
    // this.router.navigate(['/exam/thank']);

    /** 繳交試卷 */
    this.modalService.sendTest.emit();
    $('#uncompleted').modal('hide');
  }

  cancel(){
    $('#uncompleted').modal('hide');
  }
}
