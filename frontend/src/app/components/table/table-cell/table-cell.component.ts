import { Component, inject, Inject, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TailwindService } from '../../../services/tailwind.service';

@Component({
  selector: 'TableCell',
  imports: [NgTemplateOutlet],
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
})
export class TableCellComponent {
  tailwindService = inject(TailwindService);

  @Input() className: string = '';
  
  @Input({ required: true }) cell!: any; // The actual cell data, such as a header or row data
  @Input({ required: true }) cellRef!: TemplateRef<any>;
}
