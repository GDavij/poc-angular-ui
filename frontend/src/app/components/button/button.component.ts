import { Component, inject, Input } from '@angular/core';
import { TailwindService } from '../../services/tailwind.service';

@Component({
  selector: 'UiButton',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  readonly tailwindService = inject(TailwindService);

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
}
