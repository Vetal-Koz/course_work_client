import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectCreateFormComponent} from "../uniobject-create-form/uniobject-create-form.component";
import {PersonCreateFormComponent} from "../person-create-form/person-create-form.component";
import {RegisterCreateComponent} from "../../decorators/register-create-component-decorator";


@RegisterCreateComponent("StudentForm")
@Component({
  selector: 'app-student-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UniobjectCreateFormComponent,
    PersonCreateFormComponent
  ],
  templateUrl: './student-create-form.component.html',
  styleUrl: './student-create-form.component.css'
})
export class StudentCreateFormComponent implements OnInit {
  @Input({required: true}) parentForm!: FormGroup;
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      averageMark: [null, [Validators.required]],
      universityGroup: ['', Validators.required],
      practicalExperience: [null, [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.parentForm.addControl('averageMark', this.studentForm.get('averageMark'));
    this.parentForm.addControl('universityGroup', this.studentForm.get('universityGroup'));
    this.parentForm.addControl('practicalExperience', this.studentForm.get('practicalExperience'));
  }
}
