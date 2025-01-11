import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input, TemplateRef } from '@angular/core';
import { TailwindService } from '../../services/tailwind.service';

@Component({
  selector: 'InputWrapper',
  imports: [],
  templateUrl: './input-wrapper.component.html',
  styleUrl: './input-wrapper.component.scss'
})
export class InputWrapperComponent {
  tailwindService = inject(TailwindService);
  

  @Input() label: string = '';
  @Input() className: string = '';

}
