import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UniobjectUpdateFormComponent} from "../uniobject-update-form/uniobject-update-form.component";
import {SubdivisionUpdateFormComponent} from "../subdivision-update-form/subdivision-update-form.component";
import {FacultyUpdateFormComponent} from "../faculty-update-form/faculty-update-form.component";
import {NgIf, NgComponentOutlet} from "@angular/common";
import {UniobjectService} from "../../services/uniobject.service";
import {DepartmentUpdateFormComponent} from "../department-update-form/department-update-form.component";
import {UPDATE_COMPONENTS} from "../../utils/update-component-mapping.util";
import {UpdateComponentRegisterService} from "../../services/update-component-register.service";

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UniobjectUpdateFormComponent,
    SubdivisionUpdateFormComponent,
    FacultyUpdateFormComponent,
    NgIf,
    NgComponentOutlet,
    DepartmentUpdateFormComponent
  ],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.css'
})
export class MainFormComponent implements OnInit {
  @ViewChild('classUpdateForm', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  @Output() closeDialog = new EventEmitter();
  mainForm: FormGroup;
  major!: number;
  @Input({required: true}) selectedEntityType!: string;
  @Input({required: true}) entityId!: number;

  constructor(public fb: FormBuilder,
              protected uniobjectService: UniobjectService,
              private registerService: UpdateComponentRegisterService,) {
    this.mainForm = this.fb.group({
    });
  }

  ngOnInit(): void {
    this.uniobjectService.findById(this.entityId).subscribe({
      next: (res => {
        this.mainForm.patchValue(res);
        console.log(res);
        this.major = res.major;
      })
    })
    this.loadForm();

    this.mainForm.enable();
  }

  onCancelClick() {
    this.uniobjectService.isUpdated = false;
    this.closeDialog.emit();
    this.uniobjectService.setUpdatingEntity(false);
  }

  onSubmit() {
    const formData = this.mainForm.value;
    console.log('Form Data:', formData);
    const request = {
      ...formData,
      major: this.major,
      classEntityName: this.selectedEntityType,
    }
    console.log(request);
    const uniobj = this.uniobjectService.uniobjects.find((obj) => obj.id === this.entityId);
    if (uniobj) {
      Object.assign(uniobj, request);
    }
    this.uniobjectService.update(this.entityId, request).subscribe();
    this.uniobjectService.isUpdated = false;
    this.closeDialog.emit();
    this.uniobjectService.setUpdatingEntity(false);
  }

  async loadForm(): Promise<void> {
    const response = await fetch("http://localhost:8080/api/uniobjects/classes/" + this.selectedEntityType)
    const data = await response.json();
    const dataContainer = this.registerService.getComponent(data.form);
    console.log(this.registerService.registry);
    if (dataContainer) {
      this.container.clear();
      const componentRef = this.container.createComponent(dataContainer);
      // @ts-ignore
      componentRef.instance.parentForm = this.mainForm;
      // @ts-ignore
    }
  }

  onUpdate() {
    this.uniobjectService.setUpdatingEntity(!this.uniobjectService.getUpdatingEntity());
  }

  protected readonly UPDATE_COMPONENTS = UPDATE_COMPONENTS;
}
