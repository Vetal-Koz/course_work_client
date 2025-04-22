import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubdivisionCreateFormComponent} from "../subdivision-create-form/subdivision-create-form.component";
import {UniobjectCreateFormComponent} from "../uniobject-create-form/uniobject-create-form.component";
import {RegisterCreateComponent} from "../../decorators/register-create-component-decorator";


@RegisterCreateComponent("PersonForm")
@Component({
  selector: 'app-person-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubdivisionCreateFormComponent,
    UniobjectCreateFormComponent
  ],
  templateUrl: './person-create-form.component.html',
  styleUrl: './person-create-form.component.css'
})
export class PersonCreateFormComponent implements OnInit {
  @Input({required: true}) parentForm!: FormGroup;
  personForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      dateOfBirth: [null, [Validators.required]],
      sex: ['', Validators.required],
      nationality: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.parentForm.addControl('dateOfBirth', this.personForm.get('dateOfBirth'));
    this.parentForm.addControl('sex', this.personForm.get('sex'));
    this.parentForm.addControl('nationality', this.personForm.get('nationality'));
  }
}
