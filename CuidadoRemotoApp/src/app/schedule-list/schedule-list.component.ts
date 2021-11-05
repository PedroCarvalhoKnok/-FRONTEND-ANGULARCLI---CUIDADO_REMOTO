import { Component, OnInit } from '@angular/core';

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

  DaysOfWeek: DaysOfWeek[] = [{value: '0', viewValue: 'Domingo'},{value: '1', viewValue: 'Segunda'},{value: '2', viewValue: 'Terça'},{value: '3', viewValue: 'Quarta'},{value: '4', viewValue: 'Quinta'},{value: '5', viewValue: 'Sexta'},{value: '6', viewValue: 'Sábado'}];

  constructor() { }

  ngOnInit(): void {
  }

}
