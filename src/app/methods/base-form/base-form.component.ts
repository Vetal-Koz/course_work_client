import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MethodComponentRegisterService} from "../../services/method-component-register";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectService} from "../../services/uniobject.service";

@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.css'
})
export class BaseFormComponent implements OnInit {
  mainForm: FormGroup;
  entityId: number = 0;
  @Input() methodForm?: string;
  @Output() formSubmitted = new EventEmitter();
  @Output() dialogClosed = new EventEmitter();

  @ViewChild('formMethod', {read: ViewContainerRef}) container!: ViewContainerRef;

  constructor(private fb: FormBuilder ,private methodService: MethodComponentRegisterService, private uniobjService: UniobjectService) {
    this.mainForm = this.fb.group({
      entityId: [this.entityId, Validators.required],
    })
  }

  loadMethodForm() {
    if (this.methodForm) {
      const dataContainer = this.methodService.getComponent(this.methodForm);
      if (dataContainer) {
        this.container.clear();
        const componentRef= this.container.createComponent(dataContainer);
        componentRef.instance.parentForm = this.mainForm;
      }
    }
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.mainForm.patchValue({ entityId: this.uniobjService.idObjectForMethodInvoking });
    const formData = this.mainForm.value;
    console.log(formData)
    const request = {
      ...formData,
    }
    console.log(request);
    this.formSubmitted.emit();
  }

  onClose() {
    this.dialogClosed.emit();
  }

}
