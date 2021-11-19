import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ScheduleRegisterComponent } from './schedule-register/schedule-register.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { HomeComponent } from './home/home.component';
import { HeartMonitorComponent } from './heart-monitor/heart-monitor.component';
import { GamesComponent } from './games/games.component';
import { UrbanServicesComponent } from './urban-services/urban-services.component';

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
    path: 'agendamento',
    component: ScheduleRegisterComponent
  },
  {
    path: 'agendamento/listar',
    component: ScheduleListComponent
  },
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'batimentos',
    component: HeartMonitorComponent
  },
  {
    path: 'jogos',
    component: GamesComponent
  },
  {
    path: 'servicos',
    component: UrbanServicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
