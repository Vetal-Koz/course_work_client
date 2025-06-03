import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-person-expel-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './person-expel-form.component.html',
  styleUrl: './person-expel-form.component.css'
})
export class PersonExpelFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  personForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      expelDate: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('expelDate', this.personForm.get('expelDate'));
  }
}
