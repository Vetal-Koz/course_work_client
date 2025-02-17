import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectUpdateFormComponent} from "../uniobject-update-form/uniobject-update-form.component";
import {UniobjectService} from "../../services/uniobject.service";

@Component({
  selector: 'app-person-update-form',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        UniobjectUpdateFormComponent
    ],
  templateUrl: './person-update-form.component.html',
  styleUrl: './person-update-form.component.css'
})
export class PersonUpdateFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  isUpdating = false;
  personForm: FormGroup;

  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
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

    this.uniobjectService.isUpdatingEntity$.subscribe((value) => {
      this.isUpdating  = value;
      this.disableInputs(this.isUpdating);
    })
  }

  disableInputs(isUpdating: boolean) {
    if (isUpdating) {
      this.personForm.enable();
    }else {
      this.personForm.disable();
    }
  }
}
