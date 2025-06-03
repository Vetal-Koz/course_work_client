import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {DxSortableModule, DxTreeViewComponent, DxTreeViewModule} from "devextreme-angular";
import {ActionPopoverComponent} from "../../dialogs/action-popover/action-popover.component";
import {NodeComponent} from "../node/node.component";
import {UniobjectService} from "../../services/uniobject.service";
import {FormsModule} from "@angular/forms";
import {BaseObjectViewComponent} from "../base-object-view/base-object-view-component";

@Component({
  selector: 'app-select-object-view',
  standalone: true,
  imports: [
    CdkConnectedOverlay,
    DxSortableModule,
    ActionPopoverComponent,
    DxTreeViewModule,
    NodeComponent,
    CdkOverlayOrigin,
    FormsModule
  ],
  templateUrl: './select-object-view.component.html',
  styleUrl: './select-object-view.component.css'
})
export class SelectObjectViewComponent extends BaseObjectViewComponent implements OnInit {
  @ViewChild('university') universityComponent!: DxTreeViewComponent;
  @Input({required: true}) selectedClass!: string;
  @Input() selectedObjectId? : any;
  @Output() selectedItem = new EventEmitter<any>();


  constructor(private uniobjectService: UniobjectService) {
    super();
  }


  ngOnInit(): void {
    this.selectedObjectId?.valueChanges?.subscribe((value: any) => {
      this.selectedObjectId = value;
    });
      this.uniobjectService.findAllWhereMajorIsNull().subscribe(res => {
      this.uniobjects.push(...res);
      this.uniobjectsForTree.push(...res);
    });
  }

  onSelectItem(chef: any) : void {
    this.selectedItem.emit({
      id: chef.id,
      name: chef.name,
    });
  }

  onItemClick(event: any) : void {
    if (event.itemData !== null && event.itemData !== undefined) {
      const id = event.itemData.id;
      this.mainObject = this.uniobjects.find(entity => entity.id === id);
      if (this.mainObject && (this.mainObject?.visited === false || this.mainObject?.visited === undefined)) {
        this.uniobjectService.findRelatedById(id as number).subscribe(res => {
          this.uniobjects.push(...res);
          this.mainObject?.items.push(...res);
          console.log(this.uniobjectService.uniobjects);
          this.universityComponent.instance.option('dataSource', this.uniobjectsForTree);
        });
        this.mainObject.visited = true;
      }
    }
  }

  protected readonly event = event;
}
