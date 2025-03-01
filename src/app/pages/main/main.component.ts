import {Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FORM_COMPONENTS} from "../../utils/form-mapping.util";
import {ObjectViewComponent} from "../object-view/object-view.component";
import {UniobjectService} from "../../services/uniobject.service";
import {MainFormComponent} from "../../update-forms/main-form/main-form.component";
import {MainFormCreateComponent} from "../../create-forms/main-form-create/main-form-create.component";
import {SelectObjectViewComponent} from "../select-object-view/select-object-view.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ObjectViewComponent, MainFormComponent, MainFormCreateComponent, SelectObjectViewComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @ViewChild('dataContainer', {read: ViewContainerRef, static: true})  dataContainer!: ViewContainerRef;
  @ViewChild("updateDialog")  updateDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("createDialog") createDialog!: ElementRef<HTMLDialogElement>;

  constructor(protected uniobjectService: UniobjectService) {}

  loadForm(data: {entityId: number, className: string}): void {
    // const dataContainer = FORM_COMPONENTS[data.className];
    // if (dataContainer) {
    //   this.dataContainer.clear();
    //   const componentRef = this.dataContainer.createComponent(dataContainer);
    //   // @ts-ignore
    //   componentRef.instance.entityId = data.entityId;
    // }

    this.showUpdateDialog();
  }

  showUpdateDialog(): void {
    this.updateDialog.nativeElement.showModal();
  }

  closeUpdateDialog() {
    this.updateDialog.nativeElement.close();
  }

  showCreateDialog(): void {
    this.createDialog.nativeElement.showModal();
  }

  closeCreateDialog() {
    this.createDialog.nativeElement.close();
  }

}
