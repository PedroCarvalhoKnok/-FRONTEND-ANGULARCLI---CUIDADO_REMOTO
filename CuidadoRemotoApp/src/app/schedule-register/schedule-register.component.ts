import { Component, OnInit } from '@angular/core';


interface DaysOfWeek {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-register',
  templateUrl: './schedule-register.component.html',
  styleUrls: ['./schedule-register.component.scss']
})

export class ScheduleRegisterComponent{
  
  showMondayCard: boolean = false;
  showTuesdayCard: boolean = false;
  showWednesdayCard: boolean = false;
  showThursdayCard: boolean = false;
  showFridayCard: boolean = false;
  showSaturdayCard: boolean = false;
  showSundayCard: boolean = false;

  mondayActivities: string = '';
  tuesdayActivities: string = '';
  wednesdayActivities: string = '';
  thursdayActivities: string = '';
  fridayActivities: string = '';
  saturdayActivities: string = '';
  sundayActivities: string = '';
  
  DaysOfWeek: DaysOfWeek[] = [{value: '0', viewValue: 'Domingo'},{value: '1', viewValue: 'Segunda'},{value: '2', viewValue: 'Terça'},{value: '3', viewValue: 'Quarta'},{value: '4', viewValue: 'Quinta'},{value: '5', viewValue: 'Sexta'},{value: '6', viewValue: 'Sábado'}];

  constructor() { 
    
  }

  addPartialElements(): string{
    return `<mat-form-field appearance="fill">
    <input matInput placeholder="Categoria">
    </mat-form-field> 
    <mat-form-field appearance="fill">
    <input matInput placeholder="Detalhes">
    </mat-form-field> <label>Selecione um horário</label>
    <input mdc-datetime-picker="" date="false" time="true" placeholder="Time" minutes="true"
    min-date="minDate" type="text" id="time2" format="HH:mm" short-time="false" ng-model="timeutc"
    class="md-input">`
  }

  addActivity(value: string){

    switch(value){
      case '0':
        this.sundayActivities += this.addPartialElements();
        break;
      case '1':
        this.mondayActivities += this.addPartialElements();
        break;
      case '2':
        this.tuesdayActivities += this.addPartialElements();
        break;
      case '3':
        this.wednesdayActivities += this.addPartialElements();
        break;
      case '4':
        this.thursdayActivities += this.addPartialElements();
        break;
      case '5':
        this.fridayActivities += this.addPartialElements();
        break;
      case '6':
        this.saturdayActivities += this.addPartialElements();
        break;

    }
  }

  setVisibilityDay(value: string){

    switch(value){
      case '0':
        this.showSundayCard = true;
        break;
      case '1':
        this.showMondayCard = true;
        break;
      case '2':
        this.showTuesdayCard = true;
        break;
      case '3':
        this.showWednesdayCard = true;
        break;
      case '4':
        this.showThursdayCard = true;
        break;
      case '5':
        this.showFridayCard = true;
        break;
      case '6':
        this.showSaturdayCard = true;
        break;

    }
  }

}

