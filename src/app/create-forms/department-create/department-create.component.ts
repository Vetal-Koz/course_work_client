import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {SubdivisionUpdateComponent} from "../../update-forms/subdivision-update/subdivision-update.component";
import {SubdivisionCreateComponent} from "../subdivision-create/subdivision-create.component";

@Component({
  selector: 'app-department-create',
  standalone: true,
  imports: [
    NgIf,
    SubdivisionUpdateComponent,
    SubdivisionCreateComponent
  ],
  templateUrl: './department-create.component.html',
  styleUrl: './department-create.component.css'
})
export class DepartmentCreateComponent extends SubdivisionCreateComponent {
  @Input() override isNested = false;
}
