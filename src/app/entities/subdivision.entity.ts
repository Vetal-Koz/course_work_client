import {UniobjectEntity} from "./uniobject.entity";

export class SubdivisionEntity extends UniobjectEntity{
  constructor(
    id: number,
    name: string,
    major: number,
    classEntityName: string,
    public chef: string,
  ) {
    super(id, name, major, classEntityName);
  }
}
