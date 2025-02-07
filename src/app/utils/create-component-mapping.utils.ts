import {UniobjectCreateFormComponent} from "../create-forms/uniobject-create-form/uniobject-create-form.component";
import {DepartmentCreateFormComponent} from "../create-forms/department-create-form/department-create-form.component";
import {FacultyCreateFormComponent} from "../create-forms/faculty-create-form/faculty-create-form.component";

export const CREATE_COMPONENTS: { [key: string]: any } = {
  Uniobject: UniobjectCreateFormComponent,
  Person: UniobjectCreateFormComponent,
  Department: DepartmentCreateFormComponent,
  Faculty: FacultyCreateFormComponent
}
