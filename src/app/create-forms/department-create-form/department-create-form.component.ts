import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  SubdivisionUpdateFormComponent
} from "../../update-forms/subdivision-update-form/subdivision-update-form.component";
import {SubdivisionCreateFormComponent} from "../subdivision-create-form/subdivision-create-form.component";

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
  facultyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.facultyForm = this.fb.group({
      teachingFocus: ['', Validators.required],
      budget: [null, Validators.required, Validators.min(0)],
    });

  }

  ngOnInit(): void {
    this.parentForm.addControl('teachingFocus', this.facultyForm.get('teachingFocus'));
    this.parentForm.addControl('budget', this.facultyForm.get('budget'));
  }
}
