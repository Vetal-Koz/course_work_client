import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubdivisionUpdateFormComponent} from "../subdivision-update-form/subdivision-update-form.component";
import {IsUpdating} from "../../models/is-updating.data";
import {UniobjectService} from "../../services/uniobject.service";
import {RegisterUpdateComponent} from "../../decorators/register-update-component-decorator";


@RegisterUpdateComponent("DepartmentForm")
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
  isUpdating = false;
  departmentForm: FormGroup;

  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
    this.departmentForm = this.fb.group({
      teachingFocus: ['', Validators.required],
      budget: [null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.parentForm.addControl('teachingFocus', this.departmentForm.get('teachingFocus'));
    this.parentForm.addControl('budget', this.departmentForm.get('budget'));

    this.uniobjectService.isUpdatingEntity$.subscribe((value) => {
      this.isUpdating  = value;
      this.disableInputs(this.isUpdating)
    })
  }

  disableInputs(isUpdating: boolean) {
    if (isUpdating) {
      this.departmentForm.enable()
    }else {
      this.departmentForm.disable();
    }
  }

}
