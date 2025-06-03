import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DxSortableModule, DxTemplateModule, DxTreeViewComponent, DxTreeViewModule} from "devextreme-angular";
import {NodeComponent} from "../node/node.component";
import {Uniobject} from "../../models/uniobject.data";
import {UniobjectService} from "../../services/uniobject.service";
import {DxSortableTypes} from "devextreme-angular/ui/sortable";
import {DxTreeViewTypes} from "devextreme-angular/ui/tree-view";
import {Subscription} from "rxjs";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {ActionPopoverComponent} from "../../dialogs/action-popover/action-popover.component";
import {BaseObjectViewComponent} from "../base-object-view/base-object-view-component";


type TreeView = ReturnType<ObjectViewComponent['getTreeView']>;
type Node = DxTreeViewTypes.Node;
type Item = DxTreeViewTypes.Item;

@Component({
  selector: 'app-object-view',
  standalone: true,
  imports: [
    DxSortableModule,
    DxTemplateModule,
    DxTreeViewModule,
    NodeComponent,
    CdkOverlayOrigin,
    ActionPopoverComponent,
    CdkConnectedOverlay
  ],
  templateUrl: './object-view.component.html',
  styleUrl: './object-view.component.css'
})
export class ObjectViewComponent extends BaseObjectViewComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('university') universityComponent: DxTreeViewComponent;
  @ViewChild("wrapper") wrapperComponent!: ElementRef;
  @Output() rightClickEvent =
    new EventEmitter<
      {
        entityId: number,
        className: string
      }>();
  @Output() onUpdateClick = new EventEmitter();
  @Output() onCreateClick = new EventEmitter();
  @Output() onMethodClickEmitter = new EventEmitter();
  actionMenuIsOpen = false;
  selectedEntityId?: number;
  private createItemSub!: Subscription;
  private deleteItemSub!: Subscription;
  private resizeObserver!: ResizeObserver;


  constructor(private uniobjectService: UniobjectService) {
    super();
  }


  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        this.universityComponent.height = height;
        this.universityComponent.width = width;
      }
    });

    this.resizeObserver.observe(this.wrapperComponent.nativeElement);
  }

  ngOnInit(): void {
    this.uniobjects = this.uniobjectService.uniobjects;

    this.uniobjectService.findAllWhereMajorIsNull().subscribe(res => {
      this.uniobjects.push(...res);
      this.uniobjectsForTree.push(...res);
    });
    this.createItemSub = this.uniobjectService.isUpdatedTree$.subscribe((value) => {
      if (value != null) {
        if (value.major == 0) {
          this.uniobjectsForTree.push(value);
        }
        this.universityComponent.instance.option('dataSource', this.uniobjectsForTree);
      }
    })

    this.deleteItemSub = this.uniobjectService.isDeletedItem$.subscribe((id) => {
      if (id != null) {
        this.deleteUniobjectById(id, this.uniobjectsForTree);
        console.log(this.uniobjectsForTree)
        this.universityComponent.instance.option('dataSource', this.uniobjectsForTree);
      }
    })
    this.universityComponent.instance.option('dataSource', this.uniobjectsForTree);
    // this.uniobjectService.setUpdatedTree(!this.uniobjectService.getUpdatedTree());
  }

  onHandleRightClick(event: any) : void {
    event.event.preventDefault();
    event.event.stopPropagation();
    const uniobject = event.itemData as Uniobject;
    this.uniobjectService.isUpdated = true;
    this.uniobjectService.updatedEntityClass = uniobject.classEntityName;
    this.uniobjectService.entityId = uniobject.id;
    this.selectedEntityId = uniobject.id;
    this.rightClickEvent.emit({entityId: uniobject.id, className: uniobject.classEntityName});
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

  onDragChange(e: DxSortableTypes.DragChangeEvent) {
    if (e.fromComponent === e.toComponent) {
      // @ts-ignore
      const fromNode = this.findNode(this.getTreeView(e.fromData), e.fromIndex);
      // @ts-ignore
      const toNode = this.findNode(this.getTreeView(e.toData), this.calculateToIndex(e));
      if (toNode !== null && this.isChildNode(fromNode, toNode)) {
        e.cancel = true;
      }
    }
  }

  onDragEnd(e: DxSortableTypes.DragEndEvent) {
    if (e.fromComponent === e.toComponent && e.fromIndex === e.toIndex) {
      return;
    }


    const treeView = this.getTreeView(e.fromData);
    const toTreeView = this.getTreeView(e.toData);
    const fromNode = this.findNode(treeView, e.fromIndex);


    // @ts-ignore
    const toNode = this.findNode(toTreeView, this.calculateToIndex(e));

    if (e.dropInsideItem && toNode !== null && !toNode.itemData.isDirectory) {
      return;
    }

    const fromTopVisibleNode = this.getTopVisibleNode(e.fromComponent);
    const toTopVisibleNode = this.getTopVisibleNode(e.toComponent);
    const fromItems = treeView.option('items');
    const toItems = toTreeView.option('items');

    // @ts-ignore
    this.moveNode(fromNode, toNode, fromItems, toItems, e.dropInsideItem);

    treeView.option('items', fromItems);
    toTreeView.option('items', toItems);
    treeView.scrollToItem(fromTopVisibleNode);
    toTreeView.scrollToItem(toTopVisibleNode);
  }

  getTreeView(driveName: string) {
    return this.universityComponent.instance
  }

  calculateToIndex(e: DxSortableTypes.DragEndEvent | DxSortableTypes.DragChangeEvent) {
    if (e.fromComponent != e.toComponent || e.dropInsideItem) {
      return e.toIndex;
    }
    // @ts-ignore
    return e.fromIndex >= e.toIndex ? e.toIndex : e.toIndex + 1;
  }

  findNode(treeView: TreeView, index: number) {
    const nodeElement = treeView.element().querySelectorAll('.dx-treeview-node')[index];
    if (nodeElement) {
      // @ts-ignore
      return this.findNodeById(treeView.getNodes(), nodeElement.getAttribute('data-item-id'));
    }
    return null;
  }

  // @ts-ignore
  findNodeById(nodes: Node[], id: string) {
    for (let i = 0; i < nodes.length; i++) {
      // @ts-ignore
      if (nodes[i].itemData.id == id) {
        return nodes[i];
      }
      if (nodes[i].children) {
        // @ts-ignore
        const node = this.findNodeById(nodes[i].children, id);
        if (node != null) {
          return node;
        }
      }
    }
    return null;
  }

  moveNode(fromNode: Node, toNode: Node, fromItems: Item[], toItems: Item[], isDropInsideItem: boolean) {
    const fromNodeContainingArray = this.getNodeContainingArray(fromNode, fromItems);
    // @ts-ignore
    const fromIndex = fromNodeContainingArray.findIndex((item) => item.id == fromNode.itemData.id);
    // @ts-ignore
    const fromObjIndex = fromNodeContainingArray.splice(fromIndex, 1);

    if (isDropInsideItem) {
      if(fromNode.itemData !== undefined) {
        const itemId: number = Number(fromNode.itemData.id);
        const parentId: number | null = Number(fromNode.itemData['major']);
        if (parentId === null || parentId === 0) {
          this.uniobjectsForTree = this.uniobjectsForTree.filter(entity => entity.id !== itemId);
        }else {
          const parentObj = this.uniobjects.find((obj) => obj.id === parentId);
          if (parentObj !== undefined) {
            parentObj.items = parentObj.items.filter(entity => entity.id !== itemId);
          }
        }
        const fromObj = this.uniobjects.find((obj) => obj.id == fromNode.itemData?.id)
        if (fromObj !== undefined) {
          fromObj.major = Number(toNode.itemData?.id);
          this.uniobjectService.updateMajor(fromObj.id, fromObj.major).subscribe();
        }
      }
      // @ts-ignore
      toNode.itemData.items.splice(toNode.itemData.items.length, 0, fromNode.itemData);
    } else {
      const toNodeContainingArray = this.getNodeContainingArray(toNode, toItems);
      // @ts-ignore
      const toIndex = toNode === null ? toNodeContainingArray.length : toNodeContainingArray.findIndex((item) => item.id == toNode.itemData.id);
      // @ts-ignore
      toNodeContainingArray.splice(toIndex, 0, fromNode.itemData);
      // @ts-ignore
      let uniobj = this.uniobjects.find((obj) => obj.id == fromNode.itemData.id);

      // @ts-ignore
      if (uniobj !== undefined) {
        if (toNode === null) {
          uniobj.major = 0;
          // @ts-ignore
          this.uniobjectsForTree.push(uniobj);
          // this.uniobjectService.updateMajor(uniobj.id, uniobj.major).subscribe();
        } else if (toNode !== null && uniobj !== undefined) {
          if (toNode.parent !== null && toNode.parent !== undefined) {
            const parent = toNode.parent;
            if (parent.itemData !== undefined) {
              if (parent.itemData.id !== undefined || true) {
                uniobj.major = Number(parent.itemData.id);
                const parentObj = this.uniobjects.find((obj) => obj.id == uniobj.major);
                if (parentObj) {
                  parentObj.items.push(uniobj);
                  // this.uniobjectService.updateMajor(uniobj.id, uniobj.major).subscribe();
                }
              }
            }
          } else {
            uniobj.major = 0;
            this.uniobjectsForTree.push(uniobj);
            // this.uniobjectService.updateMajor(uniobj.id, uniobj.major).subscribe();
          }
        }
      }
    }

  }

  getNodeContainingArray(node: Node, rootArray: Item[]) {

    // @ts-ignore
    return node === null || node.parent === null ? rootArray : node.parent.itemData.items;
  }

  isChildNode(parentNode: Node, childNode: Node) {
    let parent = childNode.parent;
    while (parent !== null) {
      // @ts-ignore
      if (parent.itemData.id === parentNode.itemData.id) {
        return true;
      }
      // @ts-ignore
      parent = parent.parent;
    }
    return false;
  }

  getTopVisibleNode(component: DxSortableTypes.DragEndEvent['fromComponent']) {
    const treeViewElement = component.element();
    const treeViewTopPosition = treeViewElement.getBoundingClientRect().top;
    const nodes = treeViewElement.querySelectorAll('.dx-treeview-node');
    for (let i = 0; i < nodes.length; i++) {
      const nodeTopPosition = nodes[i].getBoundingClientRect().top;
      if (nodeTopPosition >= treeViewTopPosition) {
        return nodes[i];
      }
    }

    return null;
  }

  onUpdate() {
    this.onUpdateClick.emit();
  }

  onCreate() {
    this.onCreateClick.emit();
  }

  handleMethodClick(methodForm: string) {
    console.log(methodForm);
    this.onMethodClickEmitter.emit(methodForm);
  }

  onRightButtonClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Open");
    this.actionMenuIsOpen = !this.actionMenuIsOpen
  }

  deleteUniobjectById(id: number, array: Uniobject[]): boolean {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        array.splice(i, 1);
        return true;
      }
      if (array[i].items && array[i].items.length > 0) {
        const deleted = this.deleteUniobjectById(id, array[i].items);
        if (deleted) {
          return true;
        }
      }
    }
    return false;
  }

}
