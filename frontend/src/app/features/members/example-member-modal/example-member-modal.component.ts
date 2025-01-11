import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Member } from '../../../models/members';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-example-member-modal',
  imports: [ModalComponent],
  templateUrl: './example-member-modal.component.html',
  styleUrl: './example-member-modal.component.scss'
})
export class ExampleMemberModalComponent {
  member: Member = inject(DIALOG_DATA);
}
