import {UniobjectComponent} from "../forms/uniobject/uniobject.component";
import {PersonComponent} from "../forms/person/person.component";
import {DepartmentComponent} from "../forms/department/department.component";
import {FacultyComponent} from "../forms/faculty/faculty.component";

export const FORM_COMPONENTS: { [key: string]: any } = {
  Uniobject: UniobjectComponent,
  Person: PersonComponent,
  Department: DepartmentComponent,
  Faculty: FacultyComponent
}

