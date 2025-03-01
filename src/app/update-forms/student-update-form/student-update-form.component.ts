import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectUpdateFormComponent} from "../uniobject-update-form/uniobject-update-form.component";
import {UniobjectService} from "../../services/uniobject.service";
import {PersonUpdateFormComponent} from "../person-update-form/person-update-form.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-student-update-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UniobjectUpdateFormComponent,
    PersonUpdateFormComponent,
    NgClass,
  ],
  templateUrl: './student-update-form.component.html',
  styleUrl: './student-update-form.component.css'
})
export class StudentUpdateFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() parentClass = 'student-info';
  isUpdating = false;
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
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

    this.uniobjectService.isUpdatingEntity$.subscribe((value) => {
      this.isUpdating  = value;
      this.disableInputs(this.isUpdating);
    })
  }

  disableInputs(isUpdating: boolean) {
    if (isUpdating) {
      this.studentForm.enable();
    }else {
      this.studentForm.disable();
    }
  }
}
