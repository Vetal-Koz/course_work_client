import { Injector, Type} from "@angular/core";
import {UpdateComponentRegisterService} from "../services/update-component-register.service";

const pendingRegistrations: { key: string; component: Type<any> }[] = [];

export function RegisterUpdateComponent(key: string) {
  return function (target: Type<any>) {
    pendingRegistrations.push({ key, component: target });
    return target;
  };
}

export function getPendingRegistrations() {
  return pendingRegistrations;
}
