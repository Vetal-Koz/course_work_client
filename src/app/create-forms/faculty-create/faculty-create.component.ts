import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {SubdivisionUpdateComponent} from "../../update-forms/subdivision-update/subdivision-update.component";
import {SubdivisionCreateComponent} from "../subdivision-create/subdivision-create.component";

@Component({
  selector: 'app-faculty-create',
  standalone: true,
  imports: [
    NgIf,
    SubdivisionUpdateComponent,
    SubdivisionCreateComponent
  ],
  templateUrl: './faculty-create.component.html',
  styleUrl: './faculty-create.component.css'
})
export class FacultyCreateComponent extends SubdivisionCreateComponent {
  @Input() override isNested = false;
}
