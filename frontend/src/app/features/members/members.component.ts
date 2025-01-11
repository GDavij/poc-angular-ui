import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { TableComponent } from '../../components/table/table.component';
import { TableDefintion } from '../../components/table/table.models';
import { TableHeaderComponent } from "../../components/table/table-header/table-header.component";
import { CommonModule } from '@angular/common';
import { TableCellComponent } from "../../components/table/table-cell/table-cell.component";
import { TableBodyComponent } from '../../components/table/table-body/table-body.component';
import { TableRowComponent } from '../../components/table/table-row/table-row.component';
import { Member } from '../../models/members';
import { MembersService } from '../../services/members/members.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ExampleMemberModalComponent } from './example-member-modal/example-member-modal.component';

@Component({
  selector: 'app-members',
  imports: [ButtonComponent,
            TableComponent,
            TableHeaderComponent,
            CommonModule,
            TableCellComponent,
            TableBodyComponent,
            TableRowComponent,
            DialogModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements OnInit{
  tableDefinition = this.renderTable();

  form!: FormGroup


  constructor(private readonly _membersService: MembersService,
              private readonly _fb: FormBuilder,
              private readonly dialog: Dialog) { }

  ngOnInit(): void {
    this.createForm();
    this.loadMembers();
  }

  createForm() {
    this.form = this._fb.group({
      name: [''],
      phone: ['']
    });
  }

  openInfoModal(row: Member) {
    this.dialog.open(ExampleMemberModalComponent, {
      width: '500px',
      data: row
    });
  }

  loadMembers(): void {
    const { name, phone } = this.form.value;

    const { page, pageSize } = this.tableDefinition.paginator;
    this._membersService.list(name, phone, page, pageSize).subscribe(result => {
      const {data} = result;
      this.tableDefinition.body = data.items;
      this.tableDefinition.paginator.totalItems = data.count;
      this.tableDefinition.paginator.page = data.page;
      console.log({data});
    });
  }

  private renderTable(): TableDefintion<Member> {
    return {
      headers: [
        {
          property: 'name',
          label: "Nome",
        },
        {
          property: 'email',
          label: "Email"
        },
        {
          property: 'phone',
          label: "Telefone"
        },
      ],
      body: [],
      paginator: {
        page: 1,
        pageSize: 10,
        pageSizeOptions: [10, 15, 20],
        totalItems: 0
      }
    }
  }
}
