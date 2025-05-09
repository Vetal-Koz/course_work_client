import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {UniobjectService} from "../../services/uniobject.service";
import {MethodComponentRegisterService} from "../../services/method-component-register";


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
  @Output() onMethodClick = new EventEmitter();
  methods: { id: number ,methodName: string, form: string } [] = []
  @ViewChild('classUpdateForm', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;


  constructor(private uniobjectService: UniobjectService,
              private methodRegisterService: MethodComponentRegisterService) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.isFromRoot) {
      this.methods = await this.uniobjectService.getClassMethods(this.entity.className);
    }
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

  onDelete() {
    this.uniobjectService.uniobjects =
      this.uniobjectService.uniobjects.filter((obj) => obj.id != this.entity.id)
    this.uniobjectService.setDeletedItemId(this.entity.id);
    // this.uniobjectService.delete(this.entity.id).subscribe();
  }

  onMethod(methodName: string) {
    this.uniobjectService.idObjectForMethodInvoking = this.entity.id;
    let form = this.methods
      .find((meth) => meth.methodName === methodName)!;

    this.uniobjectService.idMethodForInvoking = form.id;
    this.onMethodClick.emit(form.form);
  }

}
