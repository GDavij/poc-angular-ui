import { Component, inject, Inject, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet, CommonModule } from '@angular/common';
import { TableHeaderDefinition } from '../table.models';
import { TailwindService } from '../../../services/tailwind.service';

@Component({
  selector: 'TableHeader',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent {
  tailwindService = inject(TailwindService);

  @Input() className: string = '';

  @Input() headers!: TableHeaderDefinition<any>[]; // Use a specific type if your headers are well-defined
  @Input({ required: true }) headerCell!: TemplateRef<any>;
}
