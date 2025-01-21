import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Inject } from '@angular/core';

@Component({
  selector: 'Modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  dialogRef = inject(DialogRef<any>);

  close() {
    this.dialogRef.close();
  }
}
