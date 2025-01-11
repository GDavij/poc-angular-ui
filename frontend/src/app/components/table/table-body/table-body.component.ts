import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import { TailwindService } from '../../../services/tailwind.service';

@Component({
  selector: 'TableBody',
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './table-body.component.html',
  styleUrl: './table-body.component.scss'
})
export class TableBodyComponent {
  tailwindService = inject(TailwindService);

  @Input() className: string = '';

  @Input({ required: true }) rows!: any[];
  @Input({ required: true }) rowRef!: any;
}
