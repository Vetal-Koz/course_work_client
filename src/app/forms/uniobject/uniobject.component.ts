import {Component, Input, OnInit} from '@angular/core';
import {Faculty} from "../../models/faculty.data";
import {UniobjectService} from "../../services/uniobject.service";
import {Uniobject} from "../../models/uniobject.data";

@Component({
  selector: 'app-uniobject',
  standalone: true,
  imports: [],
  templateUrl: './uniobject.component.html',
  styleUrl: './uniobject.component.css'
})
export class UniobjectComponent implements OnInit {
  @Input() entityId?: number;
  @Input() name?: string;
  uniobject?: Uniobject;

  ngOnInit(): void {
   if (this.entityId) {
     this.uniobjectService.findById(this.entityId).subscribe(res => {
         this.uniobject = res as Uniobject;
         this.name = this.uniobject.name;
       }
     )
   }
  }

  constructor(private uniobjectService: UniobjectService) {
  }
}
