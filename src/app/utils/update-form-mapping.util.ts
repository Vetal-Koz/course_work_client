import {UniobjectUpdateComponent} from "../update-forms/uniobject-update/uniobject-update.component";
import {PersonUpdateComponent} from "../update-forms/person-update/person-update.component";
import {DepartmentUpdateComponent} from "../update-forms/department-update/department-update.component";
import {FacultyUpdateComponent} from "../update-forms/faculty-update/faculty-update.component";


export const UPDATE_COMPONENTS: { [key: string]: any } = {
  Uniobject: UniobjectUpdateComponent,
  Person: PersonUpdateComponent,
  Department: DepartmentUpdateComponent,
  Faculty: FacultyUpdateComponent
}
