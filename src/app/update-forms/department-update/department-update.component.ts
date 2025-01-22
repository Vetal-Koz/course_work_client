import {Component, Inject, Input} from '@angular/core';
import {Department} from "../../models/department.data";
import {SubdivisionUpdateComponent} from "../subdivision-update/subdivision-update.component";
import {UniobjectUpdateComponent} from "../uniobject-update/uniobject-update.component";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {UniobjectService} from "../../services/uniobject.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-department-update',
  standalone: true,
  imports: [
    SubdivisionUpdateComponent,
    NgIf
  ],
  templateUrl: './department-update.component.html',
  styleUrl: './department-update.component.css'
})
export class DepartmentUpdateComponent extends UniobjectUpdateComponent{
  department?: Department;
  @Input() override isNested = false;


  constructor(
    protected override dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public override data: { entityId: number },
    protected override uniobjectService: UniobjectService) {
    super(dialogRef, data, uniobjectService);
    this.entityId = data.entityId;
  }

  override ngOnInit(): void {
    if (this.entityId != null || this.entityId != undefined) {
      this.uploadDataAboutEntity(this.entityId);
    }
  }

  override uploadDataAboutEntity(id: number): void {
    if (id) {
      this.uniobjectService.findById(id).subscribe(result => {
        this.department = result;
      })
    }
  }
}
