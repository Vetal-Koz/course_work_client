import {Component, Input, OnInit} from '@angular/core';
import {Uniobject} from "../../models/uniobject.data";
import {UniobjectService} from "../../services/uniobject.service";
import {FacultyComponent} from "../faculty/faculty.component";
import {UniobjectComponent} from "../uniobject/uniobject.component";
import {Subdivision} from "../../models/subdivision.data";

@Component({
  selector: 'app-subdivision',
  standalone: true,
  imports: [
    UniobjectComponent
  ],
  templateUrl: './subdivision.component.html',
  styleUrl: './subdivision.component.css'
})
export class SubdivisionComponent implements OnInit {
  @Input() entityId?: number;
  @Input() name?: string;
  @Input() chef?: string;
  subdivision?: Subdivision;

  ngOnInit(): void {
    if (this.entityId) {
      this.uniobjectService.findById(this.entityId).subscribe(res => {
          this.subdivision = res as Subdivision;
          this.name = this.subdivision.name;
          this.chef = this.subdivision.chef;
        }
      )
    }
  }

  constructor(private uniobjectService: UniobjectService) {
  }

}
