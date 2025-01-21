import { Component, inject, Input } from '@angular/core';
import { TailwindService } from '../../../services/tailwind.service';

@Component({
  selector: 'TreeNode',
  imports: [],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss'
})
export class TreeNodeComponent {
  tailwindService = inject(TailwindService);

  @Input() className: string = '';
}
