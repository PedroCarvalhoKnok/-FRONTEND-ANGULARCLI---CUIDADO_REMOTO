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

  dataSource!: Schedule[];

  constructor(private scheduleApiService: ScheduleApiService,private matDialogue: MatDialog) { }

  async ngOnInit() {
    //this.appComponent.profileVisible = true;

    let userId = localStorage.getItem('userId');

    let token = localStorage.getItem('hashToken');

    if (userId != null && token != null) {
      this.dataSource = await this.scheduleApiService.getById(userId, token);
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

  open(schedule: Schedule): void{

    this.matDialogue.open(DialogEditSchedule, {
      data: {
        'category': schedule.category,
        'details': schedule.details,
        'time': schedule.time,
        'dayOfWeek': schedule.dayOfWeek
      },
    });

  }

}

@Component({
  selector: 'edit-Schedule-dialog',
  templateUrl: '../dialogs/editSchedule.html',
})
export class DialogEditSchedule { 
  constructor(@Inject(MAT_DIALOG_DATA) public data: Schedule) {}
}
