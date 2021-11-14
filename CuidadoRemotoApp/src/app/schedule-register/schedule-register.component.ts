import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from '../models/Schedule';
import { ScheduleApiService } from '../services/schedule-api-service';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { StoreService } from '../services/store.service';


interface DaysOfWeek {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-register',
  templateUrl: './schedule-register.component.html',
  styleUrls: ['./schedule-register.component.scss']
})

export class ScheduleRegisterComponent implements OnInit {

  dayOfWeek: string = "";
  incrementListMonday: number[] = [];
  incrementListTuesday: number[] = [];
  incrementListWednesday: number[] = [];
  incrementListThursday: number[] = [];
  incrementListFriday: number[] = [];
  incrementListSaturday: number[] = [];
  incrementListSunday: number[] = [];
  schedule = new Schedule();

  idInputMonday: number = 0;
  idInputTuesday: number = 0;
  idInputWednesday: number = 0;
  idInputThursday: number = 0;
  idInputFriday: number = 0;
  idInputSaturday: number = 0;
  idInputSunday: number = 0;


  showMondayCard: boolean = false;
  showTuesdayCard: boolean = false;
  showWednesdayCard: boolean = false;
  showThursdayCard: boolean = false;
  showFridayCard: boolean = false;
  showSaturdayCard: boolean = false;
  showSundayCard: boolean = false;
  showButton: boolean = false;
  errorCategory: boolean = false;
  errorDetail: boolean = false;
  errorTime: boolean = false;


  DaysOfWeek: DaysOfWeek[] = [{ value: '0', viewValue: 'Domingo' }, { value: '1', viewValue: 'Segunda-Feira' }, { value: '2', viewValue: 'Terça-Feira' }, { value: '3', viewValue: 'Quarta-Feira' }, { value: '4', viewValue: 'Quinta-Feira' }, { value: '5', viewValue: 'Sexta-Feira' }, { value: '6', viewValue: 'Sábado' }];

  constructor(private formBuilder: FormBuilder, private scheduleApiService: ScheduleApiService, public dialog: MatDialog, private appComponent: AppComponent, private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.storeService.profileVisible = true;
    //this.setForm();
  }

  addActivity(value: string) {


    switch (value) {
      case '1':
        this.idInputMonday++;
        let idIncrement = this.idInputMonday
        this.incrementListMonday.push(idIncrement);
        break;
      case '2':
        this.idInputTuesday++;
        let idIncrement1 = this.idInputTuesday
        this.incrementListTuesday.push(idIncrement1);
        break;
      case '3':
        this.idInputWednesday++;
        let idIncrement2 = this.idInputWednesday
        this.incrementListWednesday.push(idIncrement2);
        break;
      case '4':
        this.idInputThursday++;
        let idIncrement3 = this.idInputThursday
        this.incrementListThursday.push(idIncrement3);
        break;
      case '5':
        this.idInputFriday++;
        let idIncrement4 = this.idInputFriday
        this.incrementListFriday.push(idIncrement4);
        break;
      case '6':
        this.idInputSaturday++;
        let idIncrement5 = this.idInputSaturday
        this.incrementListSaturday.push(idIncrement5);
        break;
      case '0':
        this.idInputMonday++;
        let idIncrement6 = this.idInputMonday
        this.incrementListSunday.push(idIncrement6);
        break;

    }
  }

  clearFields(){
    this.schedule.category = '';
    this.schedule.dayOfWeek = '';
    this.schedule.details = '';
    this.schedule.time = '';
  }

  setVisibilityDay() {

    this.showButton = true;

    switch (this.dayOfWeek) {
      case '0':
        this.showSundayCard = true;
        if(this.showMondayCard || this.showTuesdayCard || this.showWednesdayCard || this.showThursdayCard || this.showFridayCard || this.showSaturdayCard){
        this.schedule.category = '';
        this.schedule.details = '';
        this.schedule.time = '';
        }
        break;
      case '1':
        this.showMondayCard = true;
        if(this.showSundayCard || this.showTuesdayCard || this.showWednesdayCard || this.showThursdayCard || this.showFridayCard || this.showSaturdayCard){
        this.schedule.category = '';
        this.schedule.details = '';
        this.schedule.time = '';
        }
        break;
      case '2':
        this.showTuesdayCard = true;
        if(this.showSundayCard || this.showMondayCard || this.showWednesdayCard || this.showThursdayCard || this.showFridayCard || this.showSaturdayCard){
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
          }
        break;
      case '3':
        this.showWednesdayCard = true;
        if(this.showSundayCard || this.showTuesdayCard || this.showMondayCard || this.showThursdayCard || this.showFridayCard || this.showSaturdayCard){
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;
      case '4':
        this.showThursdayCard = true;
        if(this.showSundayCard || this.showTuesdayCard || this.showWednesdayCard || this.showMondayCard || this.showFridayCard || this.showSaturdayCard){
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;
      case '5':
        this.showFridayCard = true;
        if(this.showSundayCard || this.showTuesdayCard || this.showWednesdayCard || this.showMondayCard || this.showThursdayCard || this.showSaturdayCard){
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;
      case '6':
        this.showSaturdayCard = true;
        if(this.showSundayCard || this.showTuesdayCard || this.showWednesdayCard || this.showMondayCard || this.showThursdayCard || this.showFridayCard){
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;

    }
  }
  async executeActivityDay(listActivities: number[], day: string): Promise<any> {

    let scheduleApi = this.scheduleApiService;

    let schedule = this.schedule;

    let listActivitiesIncluded: number[] = listActivities;
    
    if (!listActivitiesIncluded.includes(0))
      listActivitiesIncluded.push(0);

    listActivitiesIncluded.forEach(async  (incrementMonday: number) => {

      let category = (<HTMLInputElement>document.getElementById(`input-cat-${incrementMonday}${day}`)).value;

      let details = (<HTMLInputElement>document.getElementById(`input-det-${incrementMonday}${day}`)).value;

      let time = (<HTMLInputElement>document.getElementById(`input-time-${incrementMonday}${day}`)).value;

      category != null ? schedule.category = `${category}` : '';

      details != null ? schedule.details = `${details}` : '';

      time != null ? schedule.time = `${time}` : '';

      let userId = localStorage.getItem('idCustomer');

      userId != undefined ? schedule.userId = userId: schedule.userId = '';

      switch (day) {
        case '0':
          schedule.dayOfWeek = 'Domingo'
          break;
        case '1':
          schedule.dayOfWeek = 'Segunda-Feira'
          break;
        case '2':
          schedule.dayOfWeek = 'Terça-Feira'
          break;
        case '3':
          schedule.dayOfWeek = 'Quarta-Feira'
          break;
        case '4':
          schedule.dayOfWeek = 'Quinta-Feira'
          break;
        case '5':
          schedule.dayOfWeek = 'Sexta-Feira'
          break;
        case '6':
          schedule.dayOfWeek = 'Sábado'
          break;
      }

      if(!this.setForm(schedule))
          return;

      let tokenAuth = localStorage.getItem('hashToken');

      if (tokenAuth != null) {

        let resp = await scheduleApi.post(schedule, tokenAuth);

        console.log(resp);

      }

    })

    this.incrementListMonday = [];
    this.incrementListTuesday = [];
    this.incrementListWednesday = [];
    this.incrementListThursday = [];
    this.incrementListFriday = [];
    this.incrementListSaturday = [];
    this.incrementListSunday = [];

    this.openDialog();

  }

  async registerSchedule() {

    let responseGeneral = false;

    console.log(this.incrementListMonday);

    if (this.incrementListMonday.length >= 0) {
      let response = await this.executeActivityDay(this.incrementListMonday, '1')

      response == true ? responseGeneral = true : responseGeneral = false;
    }
    else if (this.incrementListTuesday.length >= 0) {
      let response = await this.executeActivityDay(this.incrementListTuesday, '2')
      response == true ? responseGeneral = true : responseGeneral = false;
    }
    else if (this.incrementListWednesday.length >= 0) {
      let response = await this.executeActivityDay(this.incrementListWednesday, '3')
      response == true ? responseGeneral = true : responseGeneral = false;
    }
    else if (this.incrementListThursday.length >= 0) {
      let response = await this.executeActivityDay(this.incrementListThursday, '4')
      response == true ? responseGeneral = true : responseGeneral = false;
    }
    else if (this.incrementListFriday.length >= 0) {
      let response = await this.executeActivityDay(this.incrementListFriday, '5')
      response == true ? responseGeneral = true : responseGeneral = false;
    }
    else if (this.incrementListSaturday.length >= 0) {
      let response = await this.executeActivityDay(this.incrementListSaturday, '6')
      response == true ? responseGeneral = true : responseGeneral = false;
    }
    else if (this.incrementListSunday.length >= 0) {
      let response = await this.executeActivityDay(this.incrementListSunday, '0')
      response == true ? responseGeneral = true : responseGeneral = false;

    }



  }

  setForm(schedule: Schedule): boolean {

    if (schedule.category == null || schedule.category == undefined){
      this.errorCategory = true;
      return false;
    }

    if (schedule.details == null || schedule.details == undefined){
      this.errorDetail = true;
      return false;
    }

    if (schedule.time == null || schedule.time == undefined){
      this.errorTime = true;
      return false;

    }

    return true;


  }

  openDialog() {
    this.dialog.open(DialogSucessRegisterSchedule);
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/sucessScheduleRegister.html',
})
export class DialogSucessRegisterSchedule { }

