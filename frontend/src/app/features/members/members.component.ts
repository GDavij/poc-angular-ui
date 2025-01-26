import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { TableDefintion } from '../../components/table/table.models';
import { TableHeaderComponent } from '../../components/table/table-header/table-header.component';
import { CommonModule } from '@angular/common';
import { TableCellComponent } from '../../components/table/table-cell/table-cell.component';
import { TableBodyComponent } from '../../components/table/table-body/table-body.component';
import { TableRowComponent } from '../../components/table/table-row/table-row.component';
import { Member } from '../../models/members';
import { MembersService } from '../../services/members/members.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ExampleMemberModalComponent } from './view-member-modal/example-member-modal.component';
import { InputWrapperComponent } from '../../components/input-wrapper/input-wrapper.component';
import { UiInputComponent } from '../../components/input/input.component';
import { catchError, debounceTime, finalize, of, retry } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  imports: [
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableRowComponent,
    TableCellComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputWrapperComponent,
    UiInputComponent,
    ButtonComponent,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements OnInit {
  tableDefinition = this.renderTable();

  form!: FormGroup;
  isSearchingForMembers: boolean = false;

  constructor(
    private readonly _membersService: MembersService,
    private readonly _fb: FormBuilder,
    private readonly _dialog: Dialog,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.searchForMembers();
  }

  createForm() {
    this.form = this._fb.group({
      email: [''],
      phone: [''],
    });
  }

  clearForm() {
    this.form.reset();
  }

  viewMember(row: Member) {
    this._dialog.open(ExampleMemberModalComponent, {
      width: '500px',
      data: row,
    });
  }

  createMember() {
    this._router.navigate(['/members', 'new']);
  }

  editMember(row: Member) {
    this._router.navigate(['/members','edit', row.id]);
  }

  searchForMembers(): void {
    if (this.form.invalid || this.isSearchingForMembers) {
      return;
    }

    const { email, phone } = this.form.value;

    const { page, pageSize } = this.tableDefinition.paginator;
    this.isSearchingForMembers = true;

    this._membersService
      .list(email, phone, page, pageSize)
      .pipe(
        debounceTime(500),
        retry(3),
        catchError((error) => {
          console.log({error})
          return of();
        }),
        finalize(() => {
          setTimeout(() => {

            this.isSearchingForMembers = false;
          }, 500);
        })
      )
      .subscribe((result) => {
        const { data } = result;
        this.tableDefinition.body = data.items;
        this.tableDefinition.paginator.totalItems = data.count;
        this.tableDefinition.paginator.page = data.page;
      });
  }

  private renderTable(): TableDefintion<Member> {
    return {
      headers: [
        {
          property: 'name',
          label: 'Nome',
        },
        {
          property: 'email',
          label: 'Email',
        },
        {
          property: 'phone',
          label: 'Telefone',
        },
      ],
      body: [],
      paginator: {
        page: 1,
        pageSize: 10,
        pageSizeOptions: [10, 15, 20],
        totalItems: 0,
      },
      actions: {
        label: "Ações",
        view: {
          active: true
        },
        delete: false,
        update: false
      }
    };
  }
}
