import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { CourseRegisterComponent } from './course-register/course-register.component';
import { UserListComponent } from './user-list/user-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { UrbanServicesComponent } from './vacancies-register/vacancies-register.component';

const routes: Routes = [
  { path: '', 
    pathMatch: 'full', 
    redirectTo: 'usuario/registrar' 
  },
  {
    path: 'usuario/registrar',
    component: UserRegisterComponent
  },
  {
    path: 'cursos/registrar',
    component: CourseRegisterComponent
  },
  {
    path: 'usuario/listar',
    component: UserListComponent
  },
  {
    path: 'cursos/listar',
    component: CourseListComponent
  },
  {
    path: 'vagas/registrar',
    component: UrbanServicesComponent
  },
  {
    path: 'vagas/listar',
    component: VacancyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
