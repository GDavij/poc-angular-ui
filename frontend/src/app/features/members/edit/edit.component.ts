import { Component, OnInit } from '@angular/core';
import { UiInputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputWrapperComponent } from '../../../components/input-wrapper/input-wrapper.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Member } from '../../../models/members';
import { TableComponent } from '../../../components/table/table.component';
import { TableHeaderComponent } from '../../../components/table/table-header/table-header.component';
import { TableBodyComponent } from '../../../components/table/table-body/table-body.component';
import { TableRowComponent } from '../../../components/table/table-row/table-row.component';
import { TableCellComponent } from '../../../components/table/table-cell/table-cell.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { MembersService } from '../../../services/members/members.service';
import { catchError, of, retry } from 'rxjs';
import { ErrorModalComponent } from '../../../components/modal/error-modal/error-modal.component';

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
  private _member: Member | null = null;

  form!: FormGroup;
  isSaving: boolean = false;


  public constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _membersService: MembersService,
    private readonly _dialog: Dialog,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.paramMap.subscribe((params) => {
      this._id = params.get('id');
    });
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
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: [
        '',
        [Validators.required, Validators.maxLength(255), Validators.email],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{11}$/),
        ],
      ],
    });
  }

  loadForm(member: Member) {
    this.form.patchValue({
      name: member.name,
      email: member.email,
      phone: member.phone,
    });
  }

  clearForm() {
    if (this._member) {
      this.loadForm(this._member);
      return;
    }

    this.form.reset();
  }

  nameErrorMessages(control: AbstractControl<any, any>) {
    if (control.hasError('required')) {
      return 'Nome é obrigatório';
    }

    if (control.hasError('maxlength')) {
      return 'Nome deve ter no máximo 255 caracteres';
    }

    return '';
  }

  emailErrorMessages(control: AbstractControl<any, any>) {
    if (control.hasError('required')) {
      return 'E-mail é obrigatório';
    }

    if (control.hasError('maxlength')) {
      return 'E-mail deve ter no máximo 255 caracteres';
    }

    if (control.hasError('email')) {
      return 'E-mail inválido';
    }

    return '';
  }

  phoneErrorMessages(control: AbstractControl<any, any>) {
    if (control.hasError('required')) {
      return 'Telefone é obrigatório';
    }

    if (control.hasError('pattern')) {
      return 'Telefone deve ter 11 dígitos númericos';
    }

    return '';
  }

  loadMember() {
    this._membersService
      .get(this._id!)
      .pipe(
        retry(3),
        catchError((err) => of())
      )
      .subscribe((member) => {
        this.loadForm(member.data)
        this._member = member.data;
      });
  }

  save() {
    this.isSaving = true;
    this._membersService
      .save(this._id, this.form.value)
      .pipe(
        retry(3),
        catchError((err) => {
          this.isSaving = false;

          this._dialog.open(ErrorModalComponent, {
            data: { message: 'Erro ao salvar membro, tente novamente.' },
          });

          return of();
        })
      )
      .subscribe((member) => {
        this.isSaving = false;
        member.success ? this.back() : alert('Error');
      });
  }
}
