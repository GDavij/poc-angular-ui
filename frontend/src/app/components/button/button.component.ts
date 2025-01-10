import { Component, inject, Input } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { TailwindService } from '../../services/tailwind.service';

@Component({
  selector: 'Button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  readonly tailwindService = inject(TailwindService);

  @Input() className: string = '';
}
