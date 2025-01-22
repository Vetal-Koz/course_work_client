import {PersonEntity} from "./person.entity";

export class StudentEntity extends PersonEntity {
  constructor(
    id: number,
    name: string,
    major: number,
    classEntityName: string,
    dateOfBirth: Date,
    sex: string,
    nationality: string,
    public averageMark: number,
    public universityGroup: string,
    public practicalExperience: number
  ) {
    super(id, name, major, classEntityName, dateOfBirth, sex, nationality);
  }
}
