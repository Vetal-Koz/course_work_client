import {Directive} from "@angular/core";
import {Uniobject} from "../../models/uniobject.data";

@Directive()
export abstract class BaseObjectViewComponent {
  uniobjects: Uniobject[] = [];
  uniobjectsForTree: Uniobject[] = [];
  mainObject?: Uniobject;
}
