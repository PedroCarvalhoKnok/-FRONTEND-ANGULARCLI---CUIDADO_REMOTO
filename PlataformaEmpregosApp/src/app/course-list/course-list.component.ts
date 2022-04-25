import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseApiService } from '../services/course-api-service';
import data from "../apiconfig.json";

@Component({
  selector: 'app-games',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  dataSource: any[] = [];

  displayedColumns: string[] = ['Curso', 'Descricao', 'Empresa', 'Acoes'];

  constructor(private matDialogue: MatDialog, private courseApiService: CourseApiService) { }

  async ngOnInit() {

    let listVacancy = await this.courseApiService.get();
    this.dataSource = listVacancy;

  }

  open(courseEdit: any): void {

    console.log(courseEdit);

    this.matDialogue.open(DialogEditCourse, {
      data: {
        'courseName': courseEdit.courseName,
        'description': courseEdit.description,
        'companyOffer': courseEdit.companyOffer,
        '_id': courseEdit._id
      },
    });

  }

  openDelete(course: any) {

    console.log(course);

    this.matDialogue.open(DialogRemoveVacancy, {
      data: {
        '_id': course._id
      },
    });



  }

}

@Component({
  selector: 'remove-Schedule-dialog',
  templateUrl: '../dialogs/removeCourse.html',
})
export class DialogRemoveVacancy {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public courseApiService: CourseApiService, public sucessRemoveDialog: MatDialog) { }


  async DeleteCourse(course: any) {


    await this.courseApiService.delete(course._id);

    this.sucessRemoveDialog.open(DialogSucessDeleteCourse);

  }


}
@Component({
  selector: 'edit-Schedule-dialog',
  templateUrl: '../dialogs/editCourse.html',
})
export class DialogEditCourse {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public courseApiService: CourseApiService, public sucessEditDialog: MatDialog) { }

  Validator(course: any): boolean {

    if (course.courseName == undefined || course.description == undefined || course.companyOffer == undefined) {

      return false;
    }

    return true;


  }

  async EditCourse(course: any) {

    course.vacancyName = (<HTMLInputElement>document.getElementById(`course-name`)).value;
    course.description = (<HTMLInputElement>document.getElementById(`description`)).value;
    course.companyOffer = (<HTMLInputElement>document.getElementById(`companyOffer`)).value;

    console.log(course);

    if (!this.Validator(course)) {
      return;
    }

    try{

      await this.courseApiService.put(course);

      this.sucessEditDialog.open(DialogSucessEditCourse)

    }
    catch(error){
      this.sucessEditDialog.open(DialogErrorRegisterCourse);
      return;
    }


  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/successEditCourse.html',
})
export class DialogSucessEditCourse { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/successDeleteCourse.html',
})
export class DialogSucessDeleteCourse { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/errorRegisterCourse.html',
})
export class DialogErrorRegisterCourse { }
