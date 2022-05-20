import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  @Output() sendTest = new EventEmitter();

  modalOpen = new EventEmitter();
  modalClose = new EventEmitter();
  modalConfirm = new EventEmitter();
  open(): void {
    this.modalOpen.emit();
  }

  // close(): void {
  //   this.modalClose.emit();
  // }

  // confirm(): void {
  //   this.modalConfirm.emit();
  // }
}
