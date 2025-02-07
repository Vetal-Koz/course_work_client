import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  SubdivisionUpdateFormComponent
} from "../../update-forms/subdivision-update-form/subdivision-update-form.component";
import {SubdivisionCreateFormComponent} from "../subdivision-create-form/subdivision-create-form.component";

@Component({
  selector: 'app-faculty-create-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SubdivisionUpdateFormComponent,
    SubdivisionCreateFormComponent
  ],
  templateUrl: './faculty-create-form.component.html',
  styleUrl: './faculty-create-form.component.css'
})
export class FacultyCreateFormComponent implements OnInit {
  @Input({required: true}) parentForm!: FormGroup;
  facultyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.facultyForm = this.fb.group({
      curricula: ['', Validators.required],
      facultyLocation: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.parentForm.addControl('curricula', this.facultyForm.get('curricula'));
    this.parentForm.addControl('facultyLocation', this.facultyForm.get('facultyLocation'));
  }

}
