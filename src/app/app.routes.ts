import { Routes } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';
import { PrincipalComponent } from './principal/principal.component';
import { SchoolComponent } from './school/school.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';

export const routes: Routes = [
    {
        path: '',redirectTo: 'empty', pathMatch:'full'
    },
    {
        path: 'empty', component: EmptyComponent
    },
    {
        path:'principal', component: PrincipalComponent
    },
    {
        path:'school', component:SchoolComponent
    },
    {
      path:'students', component: StudentsComponent
    },
    {
        path:'teachers', component: TeachersComponent
    }
];
