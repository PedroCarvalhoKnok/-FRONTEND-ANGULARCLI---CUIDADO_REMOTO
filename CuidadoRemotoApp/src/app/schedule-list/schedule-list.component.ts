import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { Schedule } from '../models/Schedule';
import { ScheduleApiService } from '../services/schedule-api-service';

interface DaysOfWeek {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  DaysOfWeek: DaysOfWeek[] = [{ value: '0', viewValue: 'Domingo' }, { value: '1', viewValue: 'Segunda' }, { value: '2', viewValue: 'Terça' }, { value: '3', viewValue: 'Quarta' }, { value: '4', viewValue: 'Quinta' }, { value: '5', viewValue: 'Sexta' }, { value: '6', viewValue: 'Sábado' }];

  dataSource: any[] = [/*{dayOfWeek : 'Segunda-Feira', category: 'exercicio', details: '3x15', time: '17:09'},
{dayOfWeek : 'Terça-Feira', category: 'medicamentos', details: '40mg', time: '17:00'}*/];

  displayedColumns: string[] = ['diaSemana','scheduleName', 'detalhes', 'agendamento', 'acoes'];

  constructor(private scheduleApiService: ScheduleApiService,private matDialogue: MatDialog) { }

  async ngOnInit() {
    //this.appComponent.profileVisible = true;

     let userId = localStorage.getItem('idUser');

     let token = localStorage.getItem('hashToken');

     console.log(token);
     console.log(userId);

     userId = '618ef4890e2b2925e056154f';

     if (userId != null && token != null) {
       //this.dataSource = await this.scheduleApiService.getById(userId, token);
       let listSchedule = await this.scheduleApiService.getById(userId, token);
       this.dataSource = [listSchedule];
     }


  }

  async delete(id: string) {

    try {

      let userId = localStorage.getItem('userId');

      let token = localStorage.getItem('hashToken');

      if (token != null && userId != null) {

        await this.scheduleApiService.delete(id, token);
        this.dataSource = await this.scheduleApiService.getById(userId, token);
      }


    } catch {

    };


  }

  async DeleteSchedule(schedule: any){

    let token = localStorage.getItem('hashToken');

    token != null || token != undefined ? token = token: token = '';

    await this.scheduleApiService.delete(schedule._id, token);

    this.matDialogue.open(DialogSucessDeleteSchedule);

  }

  open(schedule: any): void{

    console.log(schedule);

    this.matDialogue.open(DialogEditSchedule, {
      data: {
        'scheduleName': schedule.scheduleName,
        'detalhes': schedule.detalhes,
        'agendamento': schedule.agendamento,
        'diaSemana': schedule.diaSemana,
        '_id': schedule._id
      },
    });

  }

}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/successEditSchedule.html',
})
export class DialogSucessEditSchedule { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/sucessDeleteSchedule.html',
})
export class DialogSucessDeleteSchedule { }

@Component({
  selector: 'edit-Schedule-dialog',
  templateUrl: '../dialogs/editSchedule.html',
})
export class DialogEditSchedule { 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public scheduleApiService: ScheduleApiService, public sucessEditDialog: MatDialog) {}

  Validator(schedule: any): boolean{

    if(schedule.diaSemana == undefined ||schedule.scheduleName == undefined || schedule.detalhes == undefined || schedule.agendamento == undefined){

      return false;
    }

    return true;


  }

  async EditSchedule(schedule: any){
    
   // schedule.diaSemana = (<HTMLInputElement>document.getElementById(`dia-semana`)).value;
    schedule.scheduleName = (<HTMLInputElement>document.getElementById(`schedule-name`)).value;
    schedule.detalhes = (<HTMLInputElement>document.getElementById(`detalhes`)).value;
    schedule.agendamento = (<HTMLInputElement>document.getElementById(`horario`)).value;
    schedule.diaSemana = (<HTMLInputElement>document.getElementById(`dia`)).value;

    console.log(schedule);

    let token = localStorage.getItem('hashToken');

    if(!this.Validator(schedule)){
      return;
    }

    token != null || token != undefined ? token = token: token = '';

    let resp = await this.scheduleApiService.put(schedule, token);

    this.sucessEditDialog.open(DialogSucessEditSchedule)


  }
}
