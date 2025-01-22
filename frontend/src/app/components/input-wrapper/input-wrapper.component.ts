import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input, TemplateRef } from '@angular/core';
import { TailwindService } from '../../services/tailwind.service';
import { AbstractControl, FormControl } from '@angular/forms';

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
  @Input() control: AbstractControl<any, any> | null = null;
  @Input() errorMessage: (control: AbstractControl<any, any>) => string = () => '';


  get error() {
    console.log({touched: this.control?.touched, control: this.control, value: this.control?.value, count: this.control?.value?.length, label: this.label, errorMessage: this.control ? this.errorMessage(this.control) : null});
    if (!this.control?.touched) {
      return '';
    }


    return this.errorMessage(this.control);
  }
}
