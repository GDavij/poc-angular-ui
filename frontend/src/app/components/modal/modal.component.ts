import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Inject } from '@angular/core';

@Component({
  selector: 'Modal',
  imports: [DialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  dialogRef = inject(DialogRef);

  constructor() {}

  close() {
    this.dialogRef.close();
  }
}
