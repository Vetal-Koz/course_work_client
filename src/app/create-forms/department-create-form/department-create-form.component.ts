import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  SubdivisionUpdateFormComponent
} from "../../update-forms/subdivision-update-form/subdivision-update-form.component";
import {SubdivisionCreateFormComponent} from "../subdivision-create-form/subdivision-create-form.component";
import {RegisterCreateComponent} from "../../decorators/register-create-component-decorator";

@RegisterCreateComponent("DepartmentForm")
@Component({
  selector: 'app-department-create-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SubdivisionUpdateFormComponent,
    SubdivisionCreateFormComponent
  ],
  templateUrl: './department-create-form.component.html',
  styleUrl: './department-create-form.component.css'
})
export class DepartmentCreateFormComponent implements OnInit {
  @Input({required: true}) parentForm!: FormGroup;
  departmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.departmentForm = this.fb.group({
      teachingFocus: ['', Validators.required],
      budget: [null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.parentForm.addControl('teachingFocus', this.departmentForm.get('teachingFocus'));
    this.parentForm.addControl('budget', this.departmentForm.get('budget'));
  }
}
