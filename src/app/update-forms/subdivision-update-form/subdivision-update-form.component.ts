import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectUpdateFormComponent} from "../uniobject-update-form/uniobject-update-form.component";
import {UniobjectService} from "../../services/uniobject.service";

@Component({
  selector: 'app-subdivision-update-form',
  standalone: true,
  imports: [
    UniobjectUpdateFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './subdivision-update-form.component.html',
  styleUrl: './subdivision-update-form.component.css'
})
export class SubdivisionUpdateFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  isUpdating = false;
  subdivisionForm: FormGroup;

  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
    this.subdivisionForm = this.fb.group({
      chef: ['', Validators.required],
    });

    // Додаємо форму до батьківської
  }

  ngOnInit(): void {
    this.parentForm.addControl('chef', this.subdivisionForm.get('chef'));
    this.uniobjectService.isUpdatingEntity$.subscribe((value) => {
      this.isUpdating  = value;
      this.disableInputs(this.isUpdating);
    })
  }

  disableInputs(isUpdating: boolean) {
    if (isUpdating) {
      this.subdivisionForm.enable();
    }else {
      this.subdivisionForm.disable();
    }
  }

}
