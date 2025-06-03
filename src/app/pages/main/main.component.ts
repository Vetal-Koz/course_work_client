import {Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ObjectViewComponent} from "../object-view/object-view.component";
import {UniobjectService} from "../../services/uniobject.service";
import {MainFormComponent} from "../../update-forms/main-form/main-form.component";
import {MainFormCreateComponent} from "../../create-forms/main-form-create/main-form-create.component";
import {SelectObjectViewComponent} from "../select-object-view/select-object-view.component";
import {MethodComponentRegisterService} from "../../services/method-component-register";
import {BaseFormComponent} from "../../methods/base-form/base-form.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ObjectViewComponent, MainFormComponent, MainFormCreateComponent, SelectObjectViewComponent, BaseFormComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @ViewChild("updateDialog")  updateDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("createDialog") createDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('methodDialog') methodDialog!: ElementRef<HTMLDialogElement>;

  @ViewChild('baseFormRef') baseFormComponent!: BaseFormComponent;



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
    this.baseFormComponent.methodForm = methodForm;
    this.baseFormComponent.loadMethodForm();

    this.baseFormComponent.formSubmitted.subscribe(() => {
      this.methodDialog.nativeElement.close();
    });

    this.baseFormComponent.dialogClosed.subscribe(() => {
      this.methodDialog.nativeElement.close();
    });

    this.methodDialog.nativeElement.showModal();
  }

}
