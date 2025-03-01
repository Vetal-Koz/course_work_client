import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectUpdateFormComponent} from "../uniobject-update-form/uniobject-update-form.component";
import {UniobjectService} from "../../services/uniobject.service";
import {SelectObjectViewComponent} from "../../pages/select-object-view/select-object-view.component";

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
    });

  }

  ngOnInit(): void {
    this.parentForm.addControl('chef', this.subdivisionForm.get('chef'));
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
    console.log(chef);
    this.subdivisionForm.setValue({
      chef: chef.name
    });
    this.parentForm.addControl('chefId', new FormControl(chef.id));
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
