import { Component, OnInit } from '@angular/core';
import { UiInputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputWrapperComponent } from '../../../components/input-wrapper/input-wrapper.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [UiInputComponent, ButtonComponent, InputWrapperComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  form!: FormGroup;

  public constructor(private readonly _fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._fb.group({});
  }
}
