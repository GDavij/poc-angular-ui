import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, Input, TemplateRef } from '@angular/core';
import { TailwindService } from '../../../services/tailwind.service';

@Component({
  selector: 'TableRow',
  imports: [],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss'
})
export class TableRowComponent {
  tailwindService = inject(TailwindService);

  @Input() className: string = '';
}
