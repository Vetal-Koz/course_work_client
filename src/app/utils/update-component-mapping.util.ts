import {UniobjectUpdateFormComponent} from "../update-forms/uniobject-update-form/uniobject-update-form.component";
import {DepartmentUpdateFormComponent} from "../update-forms/department-update-form/department-update-form.component";
import {FacultyUpdateFormComponent} from "../update-forms/faculty-update-form/faculty-update-form.component";
import {PersonUpdateFormComponent} from "../update-forms/person-update-form/person-update-form.component";
import {StudentUpdateFormComponent} from "../update-forms/student-update-form/student-update-form.component";

export const UPDATE_COMPONENTS: { [key: string]: any } = {
  Uniobject: UniobjectUpdateFormComponent,
  Department: DepartmentUpdateFormComponent,
  Faculty: FacultyUpdateFormComponent,
  Person: PersonUpdateFormComponent,
  Student: StudentUpdateFormComponent
}
