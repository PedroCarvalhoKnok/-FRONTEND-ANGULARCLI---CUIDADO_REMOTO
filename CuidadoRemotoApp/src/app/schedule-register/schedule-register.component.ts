import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from '../models/Schedule';
import { ScheduleApiService } from '../services/schedule-api-service';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { StoreService } from '../services/store.service';
import data from "../apiconfig.json";


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

  clearFields() {
    this.schedule.category = '';
    this.schedule.dayOfWeek = '';
    this.schedule.details = '';
    this.schedule.time = '';
  }

  deleteDay() {

    switch (this.dayOfWeek) {
      case '0':
        this.showSundayCard = false;
        break;
      case '1':
        this.showMondayCard = false;
        break;
      case '2':
        this.showTuesdayCard = false;
        break;
      case '3':
        this.showWednesdayCard = false;
        break;
      case '4':
        this.showThursdayCard = false;
        break;
      case '5':
        this.showFridayCard = false;
        break;
      case '6':
        this.showSaturdayCard = false;
        break;

    }

  }

  setVisibilityDay() {

    this.showButton = true;

    switch (this.dayOfWeek) {
      case '0':
        this.showSundayCard = true;
        if (this.showMondayCard || this.showTuesdayCard || this.showWednesdayCard || this.showThursdayCard || this.showFridayCard || this.showSaturdayCard) {
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;
      case '1':
        this.showMondayCard = true;
        if (this.showSundayCard || this.showTuesdayCard || this.showWednesdayCard || this.showThursdayCard || this.showFridayCard || this.showSaturdayCard) {
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;
      case '2':
        this.showTuesdayCard = true;
        if (this.showSundayCard || this.showMondayCard || this.showWednesdayCard || this.showThursdayCard || this.showFridayCard || this.showSaturdayCard) {
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;
      case '3':
        this.showWednesdayCard = true;
        if (this.showSundayCard || this.showTuesdayCard || this.showMondayCard || this.showThursdayCard || this.showFridayCard || this.showSaturdayCard) {
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;
      case '4':
        this.showThursdayCard = true;
        if (this.showSundayCard || this.showTuesdayCard || this.showWednesdayCard || this.showMondayCard || this.showFridayCard || this.showSaturdayCard) {
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;
      case '5':
        this.showFridayCard = true;
        if (this.showSundayCard || this.showTuesdayCard || this.showWednesdayCard || this.showMondayCard || this.showThursdayCard || this.showSaturdayCard) {
          this.schedule.category = '';
          this.schedule.details = '';
          this.schedule.time = '';
        }
        break;
      case '6':
        this.showSaturdayCard = true;
        if (this.showSundayCard || this.showTuesdayCard || this.showWednesdayCard || this.showMondayCard || this.showThursdayCard || this.showFridayCard) {
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

    listActivitiesIncluded.forEach(async (incrementMonday: number) => {

      let category = (<HTMLInputElement>document.getElementById(`input-cat-${incrementMonday}${day}`)).value;

      let details = (<HTMLInputElement>document.getElementById(`input-det-${incrementMonday}${day}`)).value;

      let time = (<HTMLInputElement>document.getElementById(`input-time-${incrementMonday}${day}`)).value;

      category != null ? schedule.category = `${category}` : '';

      details != null ? schedule.details = `${details}` : '';

      time != null ? schedule.time = `${time}` : '';

      let userId = sessionStorage.getItem('idCustomer');

      userId != undefined ? schedule.userId = userId : schedule.userId = '';

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

      if (!this.setForm(schedule))
        return;

      let tokenAuth = `${(<any>data).token}`;

      if (tokenAuth != null || tokenAuth != undefined) {

        let resp = await scheduleApi.post(schedule, tokenAuth);

      }

    })

    this.incrementListMonday = [];
    this.incrementListTuesday = [];
    this.incrementListWednesday = [];
    this.incrementListThursday = [];
    this.incrementListFriday = [];
    this.incrementListSaturday = [];
    this.incrementListSunday = [];

    if (this.setForm(schedule))
      this.openDialog();

  }

  async registerSchedule() {
    

    if (this.showMondayCard) {

      try {
        let response = await this.executeActivityDay(this.incrementListMonday, '1')
      }
      catch (e) {
  
        this.dialog.open(DialogErrorRegisterSchedule);
        return;
  
      }
  

    }
    if (this.showTuesdayCard) {

      try {
        let response = await this.executeActivityDay(this.incrementListTuesday, '2')
      }
      catch (e) {
  
        this.dialog.open(DialogErrorRegisterSchedule);
        return;
  
      }

    }
    if (this.showWednesdayCard) {

      try {
        let response = await this.executeActivityDay(this.incrementListWednesday, '3')
      }
      catch (e) {
  
        this.dialog.open(DialogErrorRegisterSchedule);
        return;
  
      }

    }
    if (this.showThursdayCard) {

      try {
        let response = await this.executeActivityDay(this.incrementListThursday, '4')
      }
      catch (e) {
  
        this.dialog.open(DialogErrorRegisterSchedule);
        return;
  
      }

    }
    if (this.showFridayCard) {

      try {
        let response = await this.executeActivityDay(this.incrementListFriday, '5')
      }
      catch (e) {
  
        this.dialog.open(DialogErrorRegisterSchedule);
        return;
  
      }
      

    }
    if (this.showSaturdayCard) {

      try {
        let response = await this.executeActivityDay(this.incrementListSaturday, '6')
      }
      catch (e) {
  
        this.dialog.open(DialogErrorRegisterSchedule);
        return;
  
      }

    }
    else if (this.showSundayCard) {

      try {
        let response = await this.executeActivityDay(this.incrementListSunday, '0')
      }
      catch (e) {
  
        this.dialog.open(DialogErrorRegisterSchedule);
        return;
  
      }

    }


  }

  setForm(schedule: Schedule): boolean {

    let retorno = true;

    if (schedule.category == null || schedule.category == undefined || schedule.category == '') {
      this.errorCategory = true;
      retorno = false;
    }

    if (schedule.details == null || schedule.details == undefined || schedule.details == '') {
      this.errorDetail = true;
      retorno = false;
    }

    if (schedule.time == null || schedule.time == undefined || schedule.time == '') {
      this.errorTime = true;
      retorno = false;

    }

    return retorno;


  }

  openDialog() {
    this.dialog.open(DialogSucessRegisterSchedule);
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/errorRegisterSchedule.html',
})
export class DialogErrorRegisterSchedule { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/sucessScheduleRegister.html',
})
export class DialogSucessRegisterSchedule { }

