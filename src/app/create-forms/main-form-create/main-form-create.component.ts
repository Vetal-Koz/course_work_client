import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UniobjectService} from "../../services/uniobject.service";
import {SubdivisionCreateFormComponent} from "../subdivision-create-form/subdivision-create-form.component";
import {UniobjectCreateFormComponent} from "../uniobject-create-form/uniobject-create-form.component";
import {FacultyCreateFormComponent} from "../faculty-create-form/faculty-create-form.component";
import {NgIf} from "@angular/common";
import {DepartmentCreateFormComponent} from "../department-create-form/department-create-form.component";
import {Uniobject} from "../../models/uniobject.data";
import {CreateComponentRegisterService} from "../../services/create-component-register";

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
  styleUrl: './main-form-create.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MainFormCreateComponent implements OnInit {
  mainForm: FormGroup;
  selectedEntityType: string = '';
  @Input({required: true}) parentId!: number;
  relatedTypes: string[] = [];
  @Output() createdNew = new EventEmitter();
  @ViewChild('classCreateForm', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;


  constructor(private fb: FormBuilder, private uniobjectService: UniobjectService, private registerService: CreateComponentRegisterService) {
    this.mainForm = this.fb.group({
      classEntityName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.parentId == 0) {
      this.uniobjectService.findAllClasses().subscribe({
        next: ((res) => this.relatedTypes = res)
      });
    }else {
      this.uniobjectService.findAllRelatedClasses(this.parentId).subscribe({
        next: ((res) => this.relatedTypes = res)
      })
    }

    this.mainForm.get('classEntityName')?.valueChanges.subscribe((newValue) => {
      this.selectedEntityType = newValue;
      this.loadForm(newValue);
    });
  }

  async loadForm(className: string): Promise<void> {
    console.log(this.selectedEntityType);
    const response = await fetch("http://localhost:8080/api/uniobjects/classes/" + className)
    const data = await response.json();
    const dataContainer = this.registerService.getComponent(data.form);
    console.log(dataContainer);
    if (dataContainer) {
      this.container.clear();
      const componentRef = this.container.createComponent(dataContainer);
      // @ts-ignore
      componentRef.instance.parentForm = this.mainForm;
      // @ts-ignore
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
    this.uniobjectService.setUpdatedTree(request);
  }

  onSubmit() {
    const formData = this.mainForm.value;
    console.log(formData)
    const request = {
      ...formData,
      major: this.parentId,
    }
    console.log(request);

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
