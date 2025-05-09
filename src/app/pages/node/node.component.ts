import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActionPopoverComponent} from "../../dialogs/action-popover/action-popover.component";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";

@Component({
  selector: 'app-node',
  standalone: true,
    imports: [
        ActionPopoverComponent,
        CdkConnectedOverlay,
        CdkOverlayOrigin
    ],
  templateUrl: './node.component.html',
  styleUrl: './node.component.css'
})
export class NodeComponent {
  actionMenuIsOpen = false;
  @Input() entity!: {id: number, name: string, className: string};
  @Input() isSelecting?: boolean;
  @Output() onUpdateClick = new EventEmitter();
  @Output() onCreateClick = new EventEmitter();
  @Output() onMethodClick = new EventEmitter();



  onUpdate() {
    this.onUpdateClick.emit();
  }

  onCreate() {
    this.onCreateClick.emit();
  }

  handleMethodClick(methodForm: string) {
    console.log(methodForm);
    this.onMethodClick.emit(methodForm);
  }
}
