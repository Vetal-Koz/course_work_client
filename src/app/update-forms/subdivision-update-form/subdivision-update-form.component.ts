import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectUpdateFormComponent} from "../uniobject-update-form/uniobject-update-form.component";
import {UniobjectService} from "../../services/uniobject.service";
import {SelectObjectViewComponent} from "../../pages/select-object-view/select-object-view.component";
import {RegisterUpdateComponent} from "../../decorators/register-update-component-decorator";


@RegisterUpdateComponent('SubdivisionForm')
@Component({
  selector: 'app-subdivision-update-form',
  standalone: true,
  imports: [
    UniobjectUpdateFormComponent,
    ReactiveFormsModule,
    SelectObjectViewComponent
  ],
  templateUrl: './subdivision-update-form.component.html',
  styleUrl: './subdivision-update-form.component.css'
})
export class SubdivisionUpdateFormComponent implements OnInit {
  @ViewChild("selectChefDialog")  selectChefDialog!: ElementRef<HTMLDialogElement>;
  @Input() parentForm!: FormGroup;
  isUpdating = false;
  subdivisionForm: FormGroup;

  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
    this.subdivisionForm = this.fb.group({
      chef: [null, Validators.required],
      chefId: [null]
    });

  }

  ngOnInit(): void {
    this.parentForm.addControl('chef', this.subdivisionForm.get('chef'));
    this.parentForm.addControl('chefId', this.subdivisionForm.get('chefId'));
    this.uniobjectService.isUpdatingEntity$.subscribe((value) => {
      this.isUpdating  = value;
      this.disableInputs(this.isUpdating);
    })
  }

  disableInputs(isUpdating: boolean) {
    if (isUpdating) {
      this.subdivisionForm.enable();
    }else {
      this.subdivisionForm.disable();
    }
  }

  updateChef(chef: any) {
    this.parentForm.get('chef')?.setValue(chef.name);
    this.parentForm.get('chefId')?.setValue(chef.id);

    console.log(this.subdivisionForm);
    console.log(this.parentForm.value);

    this.selectChefDialog.nativeElement.close()
  }

  onChangeClick() {
    this.selectChefDialog.nativeElement.showModal();
  }

  onClose() {
    this.selectChefDialog.nativeElement.close();
  }
}
