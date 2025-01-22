import {UniobjectEntity} from "./uniobject.entity";

export class PersonEntity extends UniobjectEntity {
  constructor(
    id: number,
    name: string,
    major: number,
    classEntityName: string,
    public dateOfBirth: Date,
    public sex: string,
    public nationality: string,
  ) {
    super(id, name, major, classEntityName);
  }
}
