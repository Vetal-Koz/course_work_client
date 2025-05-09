import { Routes } from '@angular/router';
import {ExpelFormComponent} from "./methods/expel-form/expel-form.component";
import {DepartmentCreateFormComponent} from "./create-forms/department-create-form/department-create-form.component";
import {FacultyCreateFormComponent} from "./create-forms/faculty-create-form/faculty-create-form.component";
import {PersonCreateFormComponent} from "./create-forms/person-create-form/person-create-form.component";
import {StudentCreateFormComponent} from "./create-forms/student-create-form/student-create-form.component";
import {SubdivisionCreateFormComponent} from "./create-forms/subdivision-create-form/subdivision-create-form.component";
import {UniobjectCreateFormComponent} from "./create-forms/uniobject-create-form/uniobject-create-form.component";
import {DepartmentUpdateFormComponent} from "./update-forms/department-update-form/department-update-form.component";
import {FacultyUpdateFormComponent} from "./update-forms/faculty-update-form/faculty-update-form.component";
import {PersonUpdateFormComponent} from "./update-forms/person-update-form/person-update-form.component";
import {StudentUpdateFormComponent} from "./update-forms/student-update-form/student-update-form.component";
import {SubdivisionUpdateFormComponent} from "./update-forms/subdivision-update-form/subdivision-update-form.component";
import {UniobjectUpdateFormComponent} from "./update-forms/uniobject-update-form/uniobject-update-form.component";

export const routes: Routes = [
  {
    path: 'expel',
    component: ExpelFormComponent
  },
  {
    path: 'department-create',
    component: DepartmentCreateFormComponent
  },
  {
    path: 'faculty-create',
    component: FacultyCreateFormComponent
  },
  {
    path: 'person-create',
    component: PersonCreateFormComponent
  },
  {
    path: 'student-create',
    component: StudentCreateFormComponent
  },
  {
    path: 'subdivision-create',
    component: SubdivisionCreateFormComponent
  },
  {
    path: 'uniobject-create',
    component: UniobjectCreateFormComponent
  },
  {
    path: 'department-update',
    component: DepartmentUpdateFormComponent
  },
  {
    path: 'faculty-update',
    component: FacultyUpdateFormComponent
  },
  {
    path: 'person-update',
    component: PersonUpdateFormComponent
  },
  {
    path: 'student-update',
    component: StudentUpdateFormComponent
  },
  {
    path: 'subdivision-update',
    component: SubdivisionUpdateFormComponent
  },
  {
    path: 'uniobject-update',
    component: UniobjectUpdateFormComponent
  },
];
