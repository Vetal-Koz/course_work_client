import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-uniobject-create',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './uniobject-create.component.html',
  styleUrl: './uniobject-create.component.css'
})
export class UniobjectCreateComponent {
  @Input() isNested = false;

  constructor() {
    console.log(this.constructor.name.replace(/_(.*?)CreateComponent/g, '$1'))
  }
}
