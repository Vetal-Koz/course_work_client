
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectUpdateFormComponent} from "../../update-forms/uniobject-update-form/uniobject-update-form.component";
import {UniobjectCreateFormComponent} from "../uniobject-create-form/uniobject-create-form.component";
import {SelectObjectViewComponent} from "../../pages/select-object-view/select-object-view.component";

@Component({
  selector: 'app-subdivision-create-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UniobjectUpdateFormComponent,
    UniobjectCreateFormComponent,
    SelectObjectViewComponent
  ],
  templateUrl: './subdivision-create-form.component.html',
  styleUrl: './subdivision-create-form.component.css'
})
export class SubdivisionCreateFormComponent implements OnInit {
  @ViewChild("selectChefDialog")  selectChefDialog!: ElementRef<HTMLDialogElement>;
  @Input() parentForm!: FormGroup;
  subdivisionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.subdivisionForm = this.fb.group({
      chef: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('chef', this.subdivisionForm.get('chef'));
  }

  onChangeClick() {
    this.selectChefDialog.nativeElement.showModal();
  }

  selectChef(chef: any) {
    this.subdivisionForm.setValue({
      chef: chef.name
    });
    this.parentForm.addControl('chefId', new FormControl(chef.id));
    this.selectChefDialog.nativeElement.close()
  }

  onClose() {
    this.selectChefDialog.nativeElement.close();
  }
}
