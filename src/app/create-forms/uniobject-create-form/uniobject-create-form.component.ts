import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterCreateComponent} from "../../decorators/register-create-component-decorator";


@RegisterCreateComponent("UniobjectForm")
@Component({
  selector: 'app-uniobject-create-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './uniobject-create-form.component.html',
  styleUrl: './uniobject-create-form.component.css'
})
export class UniobjectCreateFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  uniobjectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.uniobjectForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('name', this.uniobjectForm.get('name'));
  }

}
