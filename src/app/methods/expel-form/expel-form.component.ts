import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterMethodComponent} from "../../decorators/register-method-component-decorator";
import {UniobjectService} from "../../services/uniobject.service";
import {PersonExpelFormComponent} from "../person-expel-form/person-expel-form.component";

@RegisterMethodComponent("ExpelForm")

@Component({
  selector: 'app-expel-form',
  standalone: true,
  imports: [ReactiveFormsModule, PersonExpelFormComponent],
  templateUrl: './expel-form.component.html',
  styleUrl: './expel-form.component.css'
})

export class ExpelFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  expelForm!: FormGroup;
  entityId = 0;

  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
    this.entityId = uniobjectService.idObjectForMethodInvoking;
    this.expelForm = this.fb.group({
      recordBook: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('recordBook', this.expelForm.get('recordBook'));
  }



  async onSubmit(): Promise<any> {
    if (this.expelForm.valid) {
      const formData = this.expelForm.value;
      console.log('Form submitted:', formData);
      await this.uniobjectService.invokeMethodForEntity(this.uniobjectService.idMethodForInvoking, formData)
    } else {
      console.warn('Form is invalid');
      this.expelForm.markAllAsTouched();
    }
  }

  onClose() {
  }

}
