import {UniobjectCreateComponent} from "../create-forms/uniobject-create/uniobject-create.component";
import {PersonCreateComponent} from "../create-forms/person-create/person-create.component";
import {DepartmentCreateComponent} from "../create-forms/department-create/department-create.component";
import {FacultyCreateComponent} from "../create-forms/faculty-create/faculty-create.component";

export const CREATE_COMPONENTS: { [key: string]: any } = {
  Uniobject: UniobjectCreateComponent,
  Person: PersonCreateComponent,
  Department: DepartmentCreateComponent,
  Faculty: FacultyCreateComponent
}
