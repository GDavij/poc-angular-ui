import { Component, inject, Input, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TailwindService } from '../../services/tailwind.service';
import { TableDefintion, TableHeaderDefinition } from './table.models';

@Component({
  selector: 'UiTable',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() className: string = '';
  
  @Input({ required: true }) tableDefinition!: TableDefintion<any>;
  @Input({ required: true }) headerRef!: TemplateRef<any>;
  @Input({ required: true}) bodyRef!: TemplateRef<any>;

  readonly tailwindService = inject(TailwindService);

  public get headers(): TableHeaderDefinition<any>[] {
    if (this.tableDefinition.actions) {
      return this.tableDefinition.headers.concat({ label: 'Actions', property: 'actions' });
    }

    return this.tableDefinition.headers;
  }
}
