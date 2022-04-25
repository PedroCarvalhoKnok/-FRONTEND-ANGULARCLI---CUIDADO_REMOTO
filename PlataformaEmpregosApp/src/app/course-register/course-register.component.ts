import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Schedule } from '../models/Schedule';
import { ScheduleApiService } from '../services/schedule-api-service';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { StoreService } from '../services/store.service';
import data from "../apiconfig.json";
import { Router } from '@angular/router';
import { Course } from '../models/Course';
import { CourseApiService } from '../services/course-api-service';


interface DaysOfWeek {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-register',
  templateUrl: './course-register.component.html',
  styleUrls: ['./course-register.component.scss']
})

export class CourseRegisterComponent implements OnInit {

  course = new Course();

  courseNameValid: Boolean = false;
  companyOfferValid: Boolean = false;
  descriptionValid: Boolean = false;

  constructor(private formBuilder: FormBuilder, private courseApiService: CourseApiService, public dialog: MatDialog, private appComponent: AppComponent, private storeService: StoreService, private router: Router) {

  }

  ngOnInit(): void {
    
    document.addEventListener('keypress', function (e) {
      if (e.which == 13) {
        document.getElementById('registerBtn')?.click();
      }
    }, false);

  }

    
  
  async registerCourse() {

    if (!this.setForm())
        return;

    try {

      await this.courseApiService.post(this.course);
      
      this.openDialog();

    } catch (error) {
      this.dialog.open(DialogErrorRegisterCourse);
      return;
    }

  }

  setForm(): boolean {

    let retorno = true;

    if (this.course.courseName == null ||this.course.courseName == undefined || this.course.courseName == '') {
      this.courseNameValid = true;
      retorno = false;
    }

    if (this.course.companyOffer == null || this.course.companyOffer == undefined || this.course.companyOffer == '') {
      this.companyOfferValid = true;
      retorno = false;
    }

    if (this.course.description == null || this.course.description == undefined || this.course.description == '') {
      this.descriptionValid = true;
      retorno = false;

    }

    return retorno;


  }

  openDialog(){

    let scheduleSuccess = this.dialog.open(DialogSucessRegisterCourse);

    scheduleSuccess.afterClosed().subscribe(result =>{

      this.router.navigate(['/cursos/listar']);
        
    })
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/errorRegisterCourse.html',
})
export class DialogErrorRegisterCourse { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/successCourseRegister.html',
})
export class DialogSucessRegisterCourse { }

