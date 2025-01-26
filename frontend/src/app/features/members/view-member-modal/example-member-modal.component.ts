import { Component, Inject, inject, OnInit } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Member, MemberBorrowBook } from '../../../models/members';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { InputWrapperComponent } from "../../../components/input-wrapper/input-wrapper.component";
import { UiInputComponent } from "../../../components/input/input.component";
import { FormsModule } from '@angular/forms';
import { TableComponent } from "../../../components/table/table.component";
import { TableHeaderComponent } from "../../../components/table/table-header/table-header.component";
import { TableCellComponent } from "../../../components/table/table-cell/table-cell.component";
import { TableBodyComponent } from "../../../components/table/table-body/table-body.component";
import { TableRowComponent } from "../../../components/table/table-row/table-row.component";
import { TableDefintion } from '../../../components/table/table.models';
import { MembersService } from '../../../services/members/members.service';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-example-member-modal',
  imports: [ModalComponent, InputWrapperComponent, UiInputComponent, FormsModule, TableComponent, TableHeaderComponent, TableCellComponent, TableBodyComponent, TableRowComponent, ButtonComponent],
  templateUrl: './example-member-modal.component.html',
  styleUrl: './example-member-modal.component.scss'
})
export class ExampleMemberModalComponent extends ModalComponent implements OnInit {
  borrowRecordsTable = this.renderTable();
  isLoadingBorrowRecords: boolean = false;

  member: Member;

  constructor(private readonly _membersService: MembersService, @Inject(DIALOG_DATA) data: Member) {
   super(); 
   this.member = data;
  }

  ngOnInit(): void {
    this.loadUser();
  }


  loadUser() {
    this.isLoadingBorrowRecords = true;
    this._membersService.get(this.member.id?.toString()!).subscribe(member => {
      this.member.borrowRecords = member.data.borrowRecords;
      this.borrowRecordsTable.body = this.member.borrowRecords
      this.borrowRecordsTable.paginator.totalItems = this.member.borrowRecords.length;
      this.isLoadingBorrowRecords = false;
    });

  }

  renderTable(): TableDefintion<MemberBorrowBook> {
      return {
        headers: [
          {
            property: 'bookTitle',
            label: "Titulo"
          },
          {
            property: 'bookAuthor',
            label: "Autor"
          },
          {
            property: 'genre',
            label: "Gênero"
          },
          {
            property: 'publishedYear',
            label: "Ano de publicação"
          },
          {
            property: 'borrowAt',
            label: "Emprestado em"
          },
          {
            property: 'returnAt',
            label: "Devolvido em"
          },
        ],
        actions: {
          label: "Ações",
          view: {
            active: true,
          },
          delete: false,
          update: false
        },
        body: [],
        paginator: {
          page: 1,
          pageSize: 50,
          pageSizeOptions: [50, 100, 200],
          totalItems: 0 
        }
        
      }
  }
}
