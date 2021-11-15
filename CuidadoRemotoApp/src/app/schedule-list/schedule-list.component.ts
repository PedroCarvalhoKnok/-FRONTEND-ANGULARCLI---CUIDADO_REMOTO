import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleApiService } from '../services/schedule-api-service';
import data from "../apiconfig.json";

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

  displayedColumns: string[] = ['diaSemana', 'scheduleName', 'detalhes', 'agendamento', 'acoes'];

  constructor(private scheduleApiService: ScheduleApiService, private matDialogue: MatDialog) { }

  async ngOnInit() {

    let customerId = sessionStorage.getItem('idCustomer');

    let token = `${(<any>data).token}`;

    console.log(token);
    console.log(customerId);

    if (customerId != null || customerId != undefined && token != undefined) {
      //this.dataSource = await this.scheduleApiService.getById(userId, token);
      let listSchedule = await this.scheduleApiService.getById(customerId, token);
      this.dataSource = listSchedule;
    }


  }

  openDelete(schedule: any) {

    console.log(schedule);

    this.matDialogue.open(DialogRemoveSchedule, {
      data: {
        '_id': schedule._id
      },
    });



  }


  async DeleteSchedule(schedule: any) {

    let token = `${(<any>data).token}`;

    token != null || token != undefined ? token = token : token = '';

    await this.scheduleApiService.delete(schedule._id, token);

    this.matDialogue.open(DialogSucessDeleteSchedule);

  }

  open(schedule: any): void {

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
  selector: 'remove-Schedule-dialog',
  templateUrl: '../dialogs/removeSchedule.html',
})
export class DialogRemoveSchedule {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public scheduleApiService: ScheduleApiService, public sucessRemoveDialog: MatDialog) { }

  Validator(schedule: any): boolean {

    if (schedule.diaSemana == undefined || schedule.scheduleName == undefined || schedule.detalhes == undefined || schedule.agendamento == undefined) {

      return false;
    }

    return true;


  }

  async EditSchedule(schedule: any) {

    // schedule.diaSemana = (<HTMLInputElement>document.getElementById(`dia-semana`)).value;
    schedule.scheduleName = (<HTMLInputElement>document.getElementById(`schedule-name`)).value;
    schedule.detalhes = (<HTMLInputElement>document.getElementById(`detalhes`)).value;
    schedule.agendamento = (<HTMLInputElement>document.getElementById(`horario`)).value;
    schedule.diaSemana = (<HTMLInputElement>document.getElementById(`dia`)).value;


    let token = `${(<any>data).token}`;

    if (!this.Validator(schedule)) {
      return;
    }

    token != null || token != undefined ? token = token : token = '';

    let resp = await this.scheduleApiService.put(schedule, token);

    this.sucessRemoveDialog.open(DialogSucessEditSchedule)


  }

  async DeleteSchedule(schedule: any) {

    let token = `${(<any>data).token}`;

    token != null || token != undefined ? token = token : token = '';

    await this.scheduleApiService.delete(schedule._id, token);

    this.sucessRemoveDialog.open(DialogSucessDeleteSchedule);

  }


}

@Component({
  selector: 'edit-Schedule-dialog',
  templateUrl: '../dialogs/editSchedule.html',
})
export class DialogEditSchedule {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public scheduleApiService: ScheduleApiService, public sucessEditDialog: MatDialog) { }

  Validator(schedule: any): boolean {

    if (schedule.diaSemana == undefined || schedule.scheduleName == undefined || schedule.detalhes == undefined || schedule.agendamento == undefined) {

      return false;
    }

    return true;


  }

  async EditSchedule(schedule: any) {

    // schedule.diaSemana = (<HTMLInputElement>document.getElementById(`dia-semana`)).value;
    schedule.scheduleName = (<HTMLInputElement>document.getElementById(`schedule-name`)).value;
    schedule.detalhes = (<HTMLInputElement>document.getElementById(`detalhes`)).value;
    schedule.agendamento = (<HTMLInputElement>document.getElementById(`horario`)).value;
    schedule.diaSemana = (<HTMLInputElement>document.getElementById(`dia`)).value;

    console.log(schedule);

    let token = `${(<any>data).token}`;

    if (!this.Validator(schedule)) {
      return;
    }

    token != null || token != undefined ? token = token : token = '';

    let resp = await this.scheduleApiService.put(schedule, token);

    this.sucessEditDialog.open(DialogSucessEditSchedule)


  }
}
