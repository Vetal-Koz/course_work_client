import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubdivisionUpdateFormComponent} from "../subdivision-update-form/subdivision-update-form.component";
import {IsUpdating} from "../../models/is-updating.data";
import {UniobjectService} from "../../services/uniobject.service";

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
  isUpdating = false;
  facultyForm: FormGroup;

  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
    this.facultyForm = this.fb.group({
      curricula: ['', Validators.required],
      facultyLocation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('curricula', this.facultyForm.get('curricula'));
    this.parentForm.addControl('facultyLocation', this.facultyForm.get('facultyLocation'));

    this.uniobjectService.isUpdatingEntity$.subscribe((value) => {
      this.isUpdating  = value;
      this.disableInputs(this.isUpdating);
    })
  }

  disableInputs(isUpdating: boolean) {
    if (isUpdating) {
      this.facultyForm.enable();
    }else {
      this.facultyForm.disable();
    }
  }




}
