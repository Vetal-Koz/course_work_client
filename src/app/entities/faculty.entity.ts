import {SubdivisionEntity} from "./subdivision.entity";

export class FacultyEntity extends SubdivisionEntity {
  constructor(
    id: number,
    name: string,
    major: number,
    classEntityName: string,
    chef: string,
    public curricula: string,
    public facultyLocation: string
  ) {
    super(id, name, major, classEntityName, chef);
  }

  static fromJson(json: any): FacultyEntity {
    return new FacultyEntity(
      json.id,
      json.name,
      json.major,
      json.classEntityName,
      json.chef,
      json.curricula,
      json.facultyLocation
    );
  }
}
