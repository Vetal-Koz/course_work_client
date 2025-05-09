import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterMethodComponent} from "../../decorators/register-method-component-decorator";
import {UniobjectService} from "../../services/uniobject.service";

@RegisterMethodComponent("ExpelForm")

@Component({
  selector: 'app-expel-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './expel-form.component.html',
  styleUrl: './expel-form.component.css'
})

export class ExpelFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter();
  @Output() dialogClosed = new EventEmitter();
  expelForm!: FormGroup;
  entityId = 0;

  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
    this.entityId = uniobjectService.idObjectForMethodInvoking;
  }

  ngOnInit(): void {
    this.expelForm = this.fb.group({
      entityId: [this.entityId, Validators.required],
      recordBook: ['', [Validators.required]],
      expelDate: ['', Validators.required]
    });
  }



  async onSubmit(): Promise<any> {
    if (this.expelForm.valid) {
      const formData = this.expelForm.value;
      console.log('Form submitted:', formData);
      await this.uniobjectService.invokeMethodForEntity(this.uniobjectService.idMethodForInvoking, formData)
      this.formSubmitted.emit();
    } else {
      console.warn('Form is invalid');
      this.expelForm.markAllAsTouched();
    }
  }

  onClose() {
    this.dialogClosed.emit();
  }

}
