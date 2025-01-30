import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-uniobject-update-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './uniobject-update-form.component.html',
  styleUrl: './uniobject-update-form.component.css'
})
export class UniobjectUpdateFormComponent implements OnInit {
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
