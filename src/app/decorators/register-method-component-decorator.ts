import {Type} from "@angular/core";

const pendingRegistrations: { key: string; component: Type<any> }[] = [];

export function RegisterMethodComponent(key: string) {
  return function (target: Type<any>) {
    pendingRegistrations.push({ key, component: target });
    return target;
  };
}

export function getPendingMethodRegistrations() {
  return pendingRegistrations;
}
