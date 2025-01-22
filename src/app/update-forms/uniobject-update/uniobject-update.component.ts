import {Component, Inject, Input} from '@angular/core';
import {Uniobject} from "../../models/uniobject.data";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {UniobjectService} from "../../services/uniobject.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-uniobject-update',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './uniobject-update.component.html',
  styleUrl: './uniobject-update.component.css'
})
export class UniobjectUpdateComponent {
  @Input() entityId?: number;
  @Input() uniobject?: Uniobject;
  @Input() isNested = false;

  constructor(
    protected dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public data: { entityId: number },
    protected uniobjectService: UniobjectService) {
    this.entityId = data.entityId;
  }

  ngOnInit(): void {
    if (this.entityId && this.uniobject === null) {
      this.uploadDataAboutEntity(this.entityId);
    }
  }

  uploadDataAboutEntity(id: number): void {
    if (id) {
      this.uniobjectService.findById(id).subscribe(result => {
        this.uniobject = result;
      })
    }
  }
}
