import {Component, Input, OnInit} from '@angular/core';
import {UniobjectService} from "../../services/uniobject.service";
import {Department} from "../../models/department.data";
import {SubdivisionComponent} from "../subdivision/subdivision.component";

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    SubdivisionComponent
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  @Input() entityId?: number;
  @Input() name?: string;
  @Input() chef?: string;
  @Input() teachingFocus?: string;
  @Input() budget?: number;
  department?: Department;

  ngOnInit(): void {
    if (this.entityId) {
      this.uniobjectService.findById(this.entityId).subscribe(res => {
        this.department = res as Department;
        this.name = this.department.name;
        this.chef = this.department.chef;
        this.teachingFocus = this.department.teachingFocus;
        this.budget = this.department.budget;
      })
    }
  }



  constructor(private uniobjectService: UniobjectService) {
  }
}
