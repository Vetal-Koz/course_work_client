import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import {UPDATE_COMPONENTS} from "../../utils/update-form-mapping.util";
import {UniobjectService} from "../../services/uniobject.service";
import {RelatedEntitiesComponent} from "../related-entities/related-entities.component";

@Component({
  selector: 'app-action-popover',
  standalone: true,
  imports: [],
  templateUrl: './action-popover.component.html',
  styleUrl: './action-popover.component.css'
})
export class ActionPopoverComponent implements OnInit{
  @Input() entityId!: number;
  entityClassName!: string;

  openUpdateForm() : void {
    const componentToOpen = UPDATE_COMPONENTS[this.entityClassName];
    const dialogRef = this.dialog.open<string>(componentToOpen, {
      width: '400px',
      data: {entityId: this.entityId}
    });
  }

  openCreateForm() : void {
    const componentToOpen = RelatedEntitiesComponent;
    const dialogRef = this.dialog.open<string>(componentToOpen, {
      width: '400px',
      data: {entityId: this.entityId}
    })
  }

  constructor(private dialog: Dialog, private uniobjectService: UniobjectService) {}

  ngOnInit(): void {
      this.uniobjectService.findById(this.entityId).subscribe(result => {
        this.entityClassName = result.classEntityName;
      })
  }
}
