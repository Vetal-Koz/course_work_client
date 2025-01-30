import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubdivisionUpdateFormComponent} from "../subdivision-update-form/subdivision-update-form.component";

@Component({
  selector: 'app-department-update-form',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SubdivisionUpdateFormComponent
    ],
  templateUrl: './department-update-form.component.html',
  styleUrl: './department-update-form.component.css'
})
export class DepartmentUpdateFormComponent implements OnInit {
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
