import {Component, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import {UniobjectService} from "../../services/uniobject.service";
import {Uniobject} from "../../models/uniobject.data";
import {DevExtremeModule, DxButtonModule, DxTreeViewComponent, DxTreeViewModule} from 'devextreme-angular';
import {FORM_COMPONENTS} from "../../utils/form-mapping.util";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CdkConnectedOverlay, CdkOverlayOrigin, Overlay,} from "@angular/cdk/overlay"
import {NgIf, CommonModule, DOCUMENT} from "@angular/common";
import {ActionPopoverComponent} from "../../dialogs/action-popover/action-popover.component";
import {NodeComponent} from "../node/node.component";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {DxTreeViewTypes} from "devextreme-angular/ui/tree-view";
import {DxSortableTypes} from "devextreme-angular/ui/sortable";
import {FileSystemItem, Service} from "../../services/app.service";


type TreeView = ReturnType<MainComponent['getTreeView']>;
type Node = DxTreeViewTypes.Node;
type Item = DxTreeViewTypes.Item;

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DxTreeViewModule, CdkOverlayOrigin, DxButtonModule, CommonModule, ActionPopoverComponent, CdkConnectedOverlay, NodeComponent, DevExtremeModule, CdkDropList, CdkDrag],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  // @ts-ignore
  @ViewChild('university') universityComponent: DxTreeViewComponent;
  @ViewChild('dataContainer', {read: ViewContainerRef, static: true})  dataContainer!: ViewContainerRef;
  selectedEntityId?: number;
  uniobjects: Uniobject[] = [];
  uniobjectsForTree: Uniobject[] = [];
  mainObject? : Uniobject;
  protected detailsOpen = false;


  constructor(private uniobjectService: UniobjectService,
              public dialog: MatDialog,
              private overlay: Overlay,
              @Inject(DOCUMENT) private document: Document,
              @Inject(Service) private service: Service) {
    this.uniobjectService.findAllWhereMajorIsNull().subscribe(res => {
      this.uniobjects.push(...res);
      this.uniobjectsForTree.push(...res);
    });
  }

  handleRightClick(event: any) : void {
    event.event.preventDefault();
    const uniobject = event.itemData as Uniobject;
    this.selectedEntityId = uniobject.id;
    if (uniobject.classEntityName) {
      this.loadForm(uniobject.classEntityName, uniobject.id);
    }
  }

  findRelatedById(id: number | string | undefined) : void {
    this.mainObject = this.uniobjects.find(entity => entity.id === id);
    if (this.mainObject && (this.mainObject?.visited === false || this.mainObject?.visited === undefined)) {
      this.uniobjectService.findRelatedById(id as number).subscribe(res => {
        this.uniobjects.push(...res);
        this.mainObject?.items.push(...res);
        this.universityComponent.instance.option('items', this.uniobjectsForTree);
      });
      this.mainObject.visited = true;
    }
  }

  loadForm(formName: string, id: number): void {
    const dataContainer = FORM_COMPONENTS[formName];
    if (dataContainer) {
      this.dataContainer.clear();
      const componentRef = this.dataContainer.createComponent(dataContainer);
      // @ts-ignore
      componentRef.instance.entityId = id;
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

    const fromTreeView = this.getTreeView(e.fromData);
    const toTreeView = this.getTreeView(e.toData);
    const fromNode = this.findNode(fromTreeView, e.fromIndex);
    // @ts-ignore
    const toNode = this.findNode(toTreeView, this.calculateToIndex(e));

    if (e.dropInsideItem && toNode !== null && !toNode.itemData.isDirectory) {
      return;
    }

    const fromTopVisibleNode = this.getTopVisibleNode(e.fromComponent);
    const toTopVisibleNode = this.getTopVisibleNode(e.toComponent);
    const fromItems = fromTreeView.option('items');
    const toItems = toTreeView.option('items');
    // @ts-ignore
    this.moveNode(fromNode, toNode, fromItems, toItems, e.dropInsideItem);

    fromTreeView.option('items', fromItems);
    toTreeView.option('items', toItems);
    fromTreeView.scrollToItem(fromTopVisibleNode);
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
    fromNodeContainingArray.splice(fromIndex, 1);

    if (isDropInsideItem) {

      // @ts-ignore
      toNode.itemData.items.splice(toNode.itemData.items.length, 0, fromNode.itemData);
    } else {
      const toNodeContainingArray = this.getNodeContainingArray(toNode, toItems);

      // @ts-ignore
      const toIndex = toNode === null ? toNodeContainingArray.length : toNodeContainingArray.findIndex((item) => item.id == toNode.itemData.id);toNodeContainingArray.splice(toIndex, 0, fromNode.itemData);
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


}
