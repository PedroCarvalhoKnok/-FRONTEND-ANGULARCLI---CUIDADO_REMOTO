import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ScheduleRegisterComponent } from './schedule-register/schedule-register.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

const routes: Routes = [
  { path: '', 
    pathMatch: 'full', 
    redirectTo: 'login' 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrar',
    component: LoginRegisterComponent
  },
  {
    path: 'schedule',
    component: ScheduleRegisterComponent
  },
  {
    path: 'schedule/list',
    component: ScheduleListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
