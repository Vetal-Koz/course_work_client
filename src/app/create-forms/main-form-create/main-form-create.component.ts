import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectService} from "../../services/uniobject.service";
import {SubdivisionCreateFormComponent} from "../subdivision-create-form/subdivision-create-form.component";
import {UniobjectCreateFormComponent} from "../uniobject-create-form/uniobject-create-form.component";
import {FacultyCreateFormComponent} from "../faculty-create-form/faculty-create-form.component";
import {NgIf} from "@angular/common";
import {DepartmentCreateFormComponent} from "../department-create-form/department-create-form.component";
import {Uniobject} from "../../models/uniobject.data";
import {CREATE_COMPONENTS} from "../../utils/create-component-mapping.utils";

@Component({
  selector: 'app-main-form-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SubdivisionCreateFormComponent,
    UniobjectCreateFormComponent,
    FacultyCreateFormComponent,
    NgIf,
    DepartmentCreateFormComponent
  ],
  templateUrl: './main-form-create.component.html',
  styleUrl: './main-form-create.component.css'
})
export class MainFormCreateComponent implements OnInit {
  mainForm: FormGroup;
  selectedEntityType: string = '';
  @Input({required: true}) parentId!: number;
  relatedTypes: string[] = [];
  @Output() createdNew = new EventEmitter();
  @ViewChild('classCreateForm', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;


  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService) {
    this.mainForm = this.fb.group({
      classEntityName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.uniobjectService.findAllRelatedClasses(this.parentId).subscribe({
      next: ((res) => this.relatedTypes = res)
    })
    this.mainForm.get('classEntityName')?.valueChanges.subscribe((newValue) => {
      this.loadForm(newValue);
      console.log(newValue);
    });
  }

  loadForm(className: string): void {
    const dataContainer = CREATE_COMPONENTS[className];
    if (dataContainer) {
      this.container.clear();
      const componentRef = this.container.createComponent(dataContainer);
      // @ts-ignore
      componentRef.instance.parentForm = this.mainForm;
    }else {
      this.container.clear();
    }
  }

  onEntityTypeChange() {
    const entityType = this.mainForm.get('classEntityName')?.value;
    console.log('Selected Value:', entityType);
    this.selectedEntityType = entityType;
  }

  addValueToUniobjects(request: Uniobject) {
    this.uniobjectService.uniobjects.push(request);
    const parentObj = this.uniobjectService.uniobjects.find((obj) => obj.id === this.parentId);
    if (parentObj) {
      parentObj.items.push(request);
    }
    this.uniobjectService.setUpdatedTree(true);
  }

  onSubmit() {
    const formData = this.mainForm.value;
    console.log(formData)
    const request = {
      ...formData,
      major: this.parentId,
    }
    console.log(request);

    let response = null;
    this.uniobjectService.create(request).subscribe({
        next: ((res) => {
          this.addValueToUniobjects(res);
        })
      });
    this.uniobjectService.isCreated = false;
    this.createdNew.emit();
  }

  onCancel() {
    this.uniobjectService.isCreated = false;
    this.createdNew.emit();
  }
}
