import { Component, OnInit } from '@angular/core';
import { UiInputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputWrapperComponent } from '../../../components/input-wrapper/input-wrapper.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Member } from '../../../models/members';
import { TableComponent } from '../../../components/table/table.component';
import { TableHeaderComponent } from '../../../components/table/table-header/table-header.component';
import { TableBodyComponent } from '../../../components/table/table-body/table-body.component';
import { TableRowComponent } from '../../../components/table/table-row/table-row.component';
import { TableCellComponent } from '../../../components/table/table-cell/table-cell.component';
import { DialogModule } from '@angular/cdk/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MembersService } from '../../../services/members/members.service';
import { catchError, of, retry } from 'rxjs';

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputWrapperComponent,
    UiInputComponent,
    ButtonComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  private _id!: string | null;

  form!: FormGroup;


  public constructor(private readonly _fb: FormBuilder,
                     private readonly _router: Router,
                     private readonly _membersService: MembersService,
                     activatedRoute: ActivatedRoute) {
                      activatedRoute.paramMap.subscribe(params => {
                        this._id = params.get('id');
                     })
                     }

  ngOnInit(): void {
    this.createForm();

    if (this.isUpdating) {
      this.loadMember();
    }
  }

  get isUpdating() {
    return this._id;
  }

  back() {
    this._router.navigate(['/members']);
  }

  createForm() {
    this.form = this._fb.group({
      name: '',
      email: '',
      phone: '',
    });
  }

  loadForm(member: Member) {
    this.form.patchValue({
      name: member.name,
      email: member.email,
      phone: member.phone,
    })
  }

  loadMember() {
    this._membersService.get(this._id!).pipe(
      retry(3),
      catchError(err => of())
    ).subscribe(member => this.loadForm(member.data));    
  }

  save() {
    this._membersService.save(this._id, this.form.value).subscribe(member => {
      member.success ? this.back() : alert('Error');
    });
  }
}
