import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {FORM_COMPONENTS} from "../../utils/form-mapping.util";
import {ObjectViewComponent} from "../object-view/object-view.component";
import {UniobjectService} from "../../services/uniobject.service";
import {MainFormComponent} from "../../update-forms/main-form/main-form.component";
import {MainFormCreateComponent} from "../../create-forms/main-form-create/main-form-create.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ObjectViewComponent, MainFormComponent, MainFormCreateComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @ViewChild('dataContainer', {read: ViewContainerRef, static: true})  dataContainer!: ViewContainerRef;

  constructor(protected uniobjectService: UniobjectService) {}

  loadForm(data: {entityId: number, className: string}): void {
    const dataContainer = FORM_COMPONENTS[data.className];
    if (dataContainer) {
      this.dataContainer.clear();
      const componentRef = this.dataContainer.createComponent(dataContainer);
      // @ts-ignore
      componentRef.instance.entityId = data.entityId;
    }
  }

  onCreatedNew() {
    this.uniobjectService.uniobjects = this.uniobjectService.uniobjects;
  }
}
