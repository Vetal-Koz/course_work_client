import {SubdivisionEntity} from "./subdivision.entity";

export class DepartmentEntity extends SubdivisionEntity {
  constructor(
    id: number,
    name: string,
    major: number,
    classEntityName: string,
    chef: string,
    public teachingFocus: string,
    public budget: number,
  ) {
    super(id, name, major, classEntityName, chef);
  }

  static fromJson(json: any): DepartmentEntity {
    return new DepartmentEntity(
      json.id,
      json.name,
      json.major,
      json.classEntityName,
      json.chef,
      json.teachingFocus,
      json.budget,
    );
  }
}
