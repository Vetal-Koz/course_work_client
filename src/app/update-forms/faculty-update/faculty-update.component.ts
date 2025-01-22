import {Component, Inject, Input, OnInit} from '@angular/core';
import {Faculty} from "../../models/faculty.data";
import {SubdivisionUpdateComponent} from "../subdivision-update/subdivision-update.component";
import {UniobjectService} from "../../services/uniobject.service";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-faculty-update',
  standalone: true,
  imports: [
    SubdivisionUpdateComponent,
    NgIf
  ],
  templateUrl: './faculty-update.component.html',
  styleUrl: './faculty-update.component.css'
})
export class FacultyUpdateComponent extends SubdivisionUpdateComponent{
  @Input() faculty?: Faculty;
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
            this.faculty = result;
            console.log(this.faculty)
          })
        }
    }
}
