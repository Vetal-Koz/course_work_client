import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubdivisionUpdateFormComponent} from "../subdivision-update-form/subdivision-update-form.component";
import {Faculty} from "../../models/faculty.data";

@Component({
  selector: 'app-faculty-update-form',
  standalone: true,
  imports: [
    SubdivisionUpdateFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './faculty-update-form.component.html',
  styleUrl: './faculty-update-form.component.css'
})
export class FacultyUpdateFormComponent implements OnInit {
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
