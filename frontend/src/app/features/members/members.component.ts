import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-members',
  imports: [ButtonComponent, TableComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {

}
