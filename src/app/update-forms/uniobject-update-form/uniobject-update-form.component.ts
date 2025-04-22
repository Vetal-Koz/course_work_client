import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IsUpdating} from "../../models/is-updating.data";
import {UniobjectService} from "../../services/uniobject.service";
import {NgClass} from "@angular/common";
import {RegisterUpdateComponent} from "../../decorators/register-update-component-decorator";


@RegisterUpdateComponent('UniobjectForm')
@Component({
  selector: 'app-uniobject-update-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './uniobject-update-form.component.html',
  styleUrl: './uniobject-update-form.component.css'
})
export class UniobjectUpdateFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() parentClass = "";
  uniobjectForm: FormGroup;
  isUpdating = false;

  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
    this.uniobjectForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('name', this.uniobjectForm.get('name'));
    this.uniobjectService.isUpdatingEntity$.subscribe((value) => {
      this.isUpdating  = value;
      this.disableInputs(this.isUpdating);
    })
  }

  disableInputs(isUpdating: boolean) {
    if (isUpdating) {
      this.uniobjectForm.enable();
    }else {
      this.uniobjectForm.disable();
    }
  }

}
