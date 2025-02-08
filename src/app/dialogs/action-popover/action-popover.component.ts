import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UniobjectService} from "../../services/uniobject.service";

@Component({
  selector: 'app-action-popover',
  standalone: true,
  imports: [],
  templateUrl: './action-popover.component.html',
  styleUrl: './action-popover.component.css'
})
export class ActionPopoverComponent implements OnInit{
  @Input() entity!: {id: number, className: string}
  @Input() isFromRoot: boolean = false;
  @Output() onUpdateClick = new EventEmitter();
  @Output() onCreateClick = new EventEmitter();

  constructor(private uniobjectService: UniobjectService) {}

  ngOnInit(): void {
  }

  onCreate() {
    this.onCreateClick.emit();
    this.uniobjectService.isCreated = true;
    this.uniobjectService.parentId = this.entity.id;
  }

  onUpdate() {
    this.onUpdateClick.emit();
    this.uniobjectService.isUpdated = true;
    this.uniobjectService.updatedEntityClass = this.entity.className;
    this.uniobjectService.entityId = this.entity.id;
  }

}
