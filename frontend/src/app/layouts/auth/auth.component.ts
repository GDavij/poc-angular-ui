import { Component, EventEmitter } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TreeComponent } from '../../components/tree/tree.component';
import { TreeDefinition } from '../../components/tree/tree.models';
import { TreeNodeComponent } from "../../components/tree/tree-node/tree-node.component";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, TreeComponent, TreeNodeComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  readonly closeEventEmmiter = new EventEmitter<void>()

  constructor(private readonly _router: Router) {}

  treeDef: TreeDefinition = {
    name: "Funcionalidades",
    nodes: [
      {
        name: "Membros",
        action: () => {},
        nodes: [
          {
            name: 'Listar Membros',
            action: () => {
              this._router.navigate(['/members'])
            },
            nodes: []
          },
          {
            name: "Adicionar Membro",
            action: () => {
              this._router.navigate(['/members', 'new'])
            },
            nodes: []
          }
        ],
      }
    ]
  }
}
