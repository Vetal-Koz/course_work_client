import {Injectable, Type} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateComponentRegisterService {
  public registry: { [key: string]: Type<any> } = {};

  register(key: string, component: Type<any>) {
    this.registry[key] = component;
  }

  getComponent(key: string): Type<any> | undefined {
    return this.registry[key];
  }
}
