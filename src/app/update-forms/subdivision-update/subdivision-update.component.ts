import {Component, Inject, Input} from '@angular/core';
import {UniobjectComponent} from "../../forms/uniobject/uniobject.component";
import {Subdivision} from "../../models/subdivision.data";
import {UniobjectUpdateComponent} from "../uniobject-update/uniobject-update.component";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {UniobjectService} from "../../services/uniobject.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-subdivision-update',
  standalone: true,
  imports: [
    UniobjectComponent,
    UniobjectUpdateComponent,
    NgIf
  ],
  templateUrl: './subdivision-update.component.html',
  styleUrl: './subdivision-update.component.css'
})
export class SubdivisionUpdateComponent extends UniobjectUpdateComponent {
  @Input() subdivision?: Subdivision;
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
        this.subdivision = result;
      })
    }
  }
}
