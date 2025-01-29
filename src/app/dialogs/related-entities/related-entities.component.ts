import {Component, Inject, Input, OnInit} from '@angular/core';
import {Dialog, DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {UniobjectService} from "../../services/uniobject.service";
import DevExpress from "devextreme";
import data = DevExpress.data;
import {NgForOf} from "@angular/common";
import {CREATE_COMPONENTS} from "../../utils/create-form-mapping.util";

@Component({
  selector: 'app-related-entities',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './related-entities.component.html',
  styleUrl: './related-entities.component.css'
})
export class RelatedEntitiesComponent implements OnInit {
  @Input() entityId: number;
  relatedEntitiesClasses: string[] = [];

  constructor(protected dialogRef: DialogRef<any>,
              @Inject(DIALOG_DATA) public data: { entityId: number },
              protected uniobjectService: UniobjectService,
              private dialog: Dialog
              ) {
    this.entityId = data.entityId;
  }

  ngOnInit(): void {
    this.uniobjectService.findAllRelatedClasses(this.entityId)
      .subscribe(res => {
        this.relatedEntitiesClasses = res
      });
  }

  dblClickOnItem(item: string): void {
    console.log(item);
    this.openCreateForm((item));
    this.dialogRef.close();
  }

  openCreateForm(entityClassName: string) : void {
    const componentToOpen = CREATE_COMPONENTS[entityClassName];
    const dialogRef = this.dialog.open(componentToOpen, {
      width: "400px",
      data: {entityClassName: entityClassName}
    });
  }

}
