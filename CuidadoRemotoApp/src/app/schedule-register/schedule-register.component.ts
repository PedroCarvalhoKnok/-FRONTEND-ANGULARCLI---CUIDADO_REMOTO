import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from '../models/Schedule';
import { ScheduleApiService } from '../services/schedule-api-service';
import {MatDialog} from '@angular/material/dialog';
import { AppComponent } from '../app.component';


interface DaysOfWeek {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-register',
  templateUrl: './schedule-register.component.html',
  styleUrls: ['./schedule-register.component.scss']
})

export class ScheduleRegisterComponent implements OnInit{

  dayOfWeek: string = "";
  increment: number = 0;
  incrementList!: string[];
  formGroup! : FormGroup;
  formSubbimited: Boolean = false;
  schedule = new Schedule();

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

  constructor(private formBuilder: FormBuilder, private scheduleApiService: ScheduleApiService, public dialog: MatDialog, private appComponent: AppComponent) { 
    
  }

  ngOnInit(): void {
    this.appComponent.profileVisible = true;
    this.setForm();
  }

  addPartialElements(increment: number, dayWeek: string): string{
    return `
    <mat-form-field>
    <input id="input-cat${increment}${dayWeek}" matInput placeholder="Categoria">
    </mat-form-field> 
    <mat-form-field>
    <input id="input-det${increment}${dayWeek}" matInput placeholder="Detalhes">
    </mat-form-field>
    <input id="input-time${increment}${dayWeek}" mdc-datetime-picker="" date="false" time="true" placeholder="Time" minutes="true"
    min-date="minDate" type="text" format="HH:mm" short-time="false" ng-model="timeutc"
    class="md-input">`
  }

  addActivity(value: string){

    let idInput = this.increment;

    idInput++;

    switch(value){
      case '0':
        this.sundayActivities += this.addPartialElements(idInput,'0');
        this.incrementList.push(`${idInput}-0`);
        break;
      case '1':
        this.mondayActivities += this.addPartialElements(idInput, '1');
        this.incrementList.push(`${idInput}-1`);
        break;
      case '2':
        this.tuesdayActivities += this.addPartialElements(idInput,'2');
        this.incrementList.push(`${idInput}-2`);
        break;
      case '3':
        this.wednesdayActivities += this.addPartialElements(idInput,'3');
        this.incrementList.push(`${idInput}-3`);
        break;
      case '4':
        this.thursdayActivities += this.addPartialElements(idInput,'4');
        this.incrementList.push(`${idInput}-4`);
        break;
      case '5':
        this.fridayActivities += this.addPartialElements(idInput,'5');
        this.incrementList.push(`${idInput}-5`);
        break;
      case '6':
        this.saturdayActivities += this.addPartialElements(idInput,'6');
        this.incrementList.push(`${idInput}-6`);
        break;

    }
  }

  setVisibilityDay(){

    switch(this.dayOfWeek){
      case '0':
        this.showSundayCard = true;
        this.incrementList.push('0-0');
        break;
      case '1':
        this.showMondayCard = true;
        this.incrementList.push('0-1');
        break;
      case '2':
        this.showTuesdayCard = true;
        this.incrementList.push('0-2');
        break;
      case '3':
        this.showWednesdayCard = true;
        this.incrementList.push('0-3');
        break;
      case '4':
        this.showThursdayCard = true;
        this.incrementList.push('0-4');
        break;
      case '5':
        this.showFridayCard = true;
        this.incrementList.push('0-5');
        break;
      case '6':
        this.showSaturdayCard = true;
        this.incrementList.push('0-6');
        break;

    }
  }

  async registerSchedule(){
    this.formSubbimited = true;
    let weeklyActivities = this.incrementList;
    let scheduleApi = this.scheduleApiService;
    let openDialog = this.openDialog();
    if(this.formGroup.valid){

      let schedule = new Schedule();

      weeklyActivities.forEach(async function(activity){
        let array = activity.split('-');
        let item = array[0];
        let dayWeek: string = '';
        switch(array[1]){
          case '0':
            dayWeek = 'Domingo'
            break;
          case '1':
            dayWeek = 'Segunda-Feira'
            break;
          case '2':
            dayWeek = 'Terça-Feira'
            break;
          case '3':
            dayWeek = 'Quarta-Feira'
            break;
          case '4':
            dayWeek = 'Quinta-Feira'
            break;
          case '5':
            dayWeek = 'Sexta-Feira'
            break;
          case '6':
            dayWeek = 'Sábado'
            break;
        }

        schedule.dayOfWeek = dayWeek;
        
        schedule.category != null ? document.getElementById(`input-cat-${item}${array[1]}`): '';
        schedule.details != null ? document.getElementById(`input-det-${item}${array[1]}`): '';
        schedule.time != null ? document.getElementById(`input-time-${item}${array[1]}`): '';

        schedule.userId != null ? localStorage.getItem('userId'): '';

        let scheduleInserted = await scheduleApi.post(schedule);

        if(scheduleInserted != null || scheduleInserted != undefined){
          openDialog;
        }
        
        
      })
    

    }
  }

  private setForm(): void {

    this.formGroup = this.formBuilder.group({

      category:['', [Validators.required]],
      details:['', [Validators.required]],
      time:['', [Validators.required]],
      
    })
  }

  openDialog() {
    this.dialog.open(DialogSucessRegisterSchedule);
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/sucessScheduleRegister.html',
})
export class DialogSucessRegisterSchedule {}

