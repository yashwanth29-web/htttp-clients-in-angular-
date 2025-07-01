import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component'; // 👈 New root component
import { PrincipalComponent } from './app/principal/principal.component';
import { StudentsComponent } from './app/students/students.component';
import { TeachersComponent } from './app/teachers/teachers.component';
import { SchoolComponent } from './app/school/school.component';
import { EmptyComponent } from './app/empty/empty.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: 'empty', pathMatch: 'full' },
      {path:'empty', component: EmptyComponent},
      { path: 'principal', component: PrincipalComponent },
      { path: 'students', component: StudentsComponent },
      {path: 'teachers', component:TeachersComponent },
{
        path: 'school',component: SchoolComponent,
      }    ])
  ]
});
