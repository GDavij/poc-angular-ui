import { Component, inject } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ButtonComponent } from "../../button/button.component";

@Component({
  selector: 'app-error-modal',
  imports: [ButtonComponent],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent extends ModalComponent {
  readonly dialogContext = inject(DIALOG_DATA);
  
  get message(): string {
    return this.dialogContext.message;
  }

}
