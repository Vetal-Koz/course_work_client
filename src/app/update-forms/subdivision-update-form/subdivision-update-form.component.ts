import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectUpdateFormComponent} from "../uniobject-update-form/uniobject-update-form.component";

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
  subdivisionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.subdivisionForm = this.fb.group({
      chef: ['', Validators.required],
    });

    // Додаємо форму до батьківської
  }

  ngOnInit(): void {
    this.parentForm.addControl('chef', this.subdivisionForm.get('chef'));
  }

}
