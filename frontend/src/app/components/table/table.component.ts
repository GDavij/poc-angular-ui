import { Component, inject } from '@angular/core';
import { TailwindService } from '../../services/tailwind.service';

@Component({
  selector: 'Table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  readonly tailwindService = inject(TailwindService)

}
