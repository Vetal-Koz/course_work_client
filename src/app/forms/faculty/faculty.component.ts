import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Faculty} from "../../models/faculty.data";
import {UniobjectService} from "../../services/uniobject.service";
import {UniobjectComponent} from "../uniobject/uniobject.component";
import {SubdivisionComponent} from "../subdivision/subdivision.component";

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [
    UniobjectComponent,
    SubdivisionComponent
  ],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent implements OnInit {
  @Input() entityId?: number;
  @Input() name?: string;
  @Input() chef?: string;
  @Input() curricula?: string | null | undefined;
  @Input() location?: string;
  faculty?: Faculty;

  ngOnInit(): void {
    if (this.entityId) {
      this.uniobjectService.findById(this.entityId).subscribe(res => {
          this.faculty = res as Faculty;
          this.name = this.faculty.name;
          this.chef = this.faculty.chef;
          this.curricula = this.faculty.curricula;
          this.location = this.faculty.facultyLocation;
        }
      )
    }
  }

  constructor(private uniobjectService: UniobjectService) {
  }

}
