import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {UniobjectCreateComponent} from "../uniobject-create/uniobject-create.component";

@Component({
  selector: 'app-subdivision-create',
  standalone: true,
  imports: [
    NgIf,
    UniobjectCreateComponent
  ],
  templateUrl: './subdivision-create.component.html',
  styleUrl: './subdivision-create.component.css'
})
export class SubdivisionCreateComponent extends UniobjectCreateComponent {
  @Input() override isNested = false;
}
