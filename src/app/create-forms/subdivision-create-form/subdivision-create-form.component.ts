import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectUpdateFormComponent} from "../../update-forms/uniobject-update-form/uniobject-update-form.component";
import {UniobjectCreateFormComponent} from "../uniobject-create-form/uniobject-create-form.component";

@Component({
  selector: 'app-subdivision-create-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UniobjectUpdateFormComponent,
    UniobjectCreateFormComponent
  ],
  templateUrl: './subdivision-create-form.component.html',
  styleUrl: './subdivision-create-form.component.css'
})
export class SubdivisionCreateFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  subdivisionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.subdivisionForm = this.fb.group({
      chef: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('chef', this.subdivisionForm.get('chef'));
  }
}
