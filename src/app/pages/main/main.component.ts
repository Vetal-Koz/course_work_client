import {Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ObjectViewComponent} from "../object-view/object-view.component";
import {UniobjectService} from "../../services/uniobject.service";
import {MainFormComponent} from "../../update-forms/main-form/main-form.component";
import {MainFormCreateComponent} from "../../create-forms/main-form-create/main-form-create.component";
import {SelectObjectViewComponent} from "../select-object-view/select-object-view.component";
import {MethodComponentRegisterService} from "../../services/method-component-register";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ObjectViewComponent, MainFormComponent, MainFormCreateComponent, SelectObjectViewComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @ViewChild("updateDialog")  updateDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("createDialog") createDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('methodDialog') methodDialog!: ElementRef<HTMLDialogElement>;

  @ViewChild('formMethod', { read: ViewContainerRef }) container!: ViewContainerRef;



  constructor(protected uniobjectService: UniobjectService,
              private methodService: MethodComponentRegisterService
  ) {}

  loadForm(data: {entityId: number, className: string}): void {
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

  showMethodDialog(methodForm: string) {
    const dataContainer = this.methodService.getComponent(methodForm);
    if (dataContainer) {
      this.container.clear();
      const componentRef = this.container.createComponent(dataContainer);

      componentRef.instance.formSubmitted.subscribe(() => {
        this.methodDialog.nativeElement.close();
      });

      componentRef.instance.dialogClosed.subscribe(() => {
        this.methodDialog.nativeElement.close();
      });
    }


    this.methodDialog.nativeElement.showModal();
  }

}
