import {Component, Input, OnInit} from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
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
  @Input() entity!: {id: number, className: string}

  constructor(private dialog: Dialog, private uniobjectService: UniobjectService) {}

  ngOnInit(): void {
  }

  openCreateForm() : void {

  }

  onUpdate() {
    this.uniobjectService.isUpdated = true;
    this.uniobjectService.updatedEntityClass = this.entity.className;
    this.uniobjectService.entityId = this.entity.id;
  }

}
