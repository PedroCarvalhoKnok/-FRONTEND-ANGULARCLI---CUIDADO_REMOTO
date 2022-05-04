import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacancyApiService } from '../services/vacancy-api-service';
import data from "../apiconfig.json";

@Component({
  selector: 'app-games',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.scss']
})
export class VacancyListComponent implements OnInit {

  dataSource: any[] = [];

  displayedColumns: string[] = ['Empresa', 'Vaga', 'Descricao', 'Requisitos', 'Beneficios' ,'Acoes'];

  constructor(private matDialogue: MatDialog, private vacancyApiService: VacancyApiService) { }

  async ngOnInit() {
   
    let listVacancy: any = await this.vacancyApiService.get();
    listVacancy = JSON.parse(listVacancy)
    this.dataSource = listVacancy;
  }

  open(vacancyEdit: any): void {

    console.log(vacancyEdit);

    this.matDialogue.open(DialogEditVacancy, {
      data: {
        'vacancyName': vacancyEdit.Nome,
        'companyName': vacancyEdit.Empresa,
        'description': vacancyEdit.Descricao,
        'require': vacancyEdit.Requisitos,
        'benefits': vacancyEdit.Beneficios,
        '_id': vacancyEdit.CodigoVaga
      },
    });

  }

  openDelete(vacancy: any) {

    console.log(vacancy);

    this.matDialogue.open(DialogRemoveVacancy, {
      data: {
        '_id': vacancy.CodigoVaga
      },
    });

  }

}

@Component({
  selector: 'remove-Schedule-dialog',
  templateUrl: '../dialogs/removeVacancy.html',
})
export class DialogRemoveVacancy {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public vacancyApiService: VacancyApiService, public sucessRemoveDialog: MatDialog) { }


  async DeleteVacancy(vacancy: any) {

    await this.vacancyApiService.delete(vacancy._id);

    this.sucessRemoveDialog.open(DialogSucessDeleteVacancy);

  }


}
@Component({
  selector: 'edit-Schedule-dialog',
  templateUrl: '../dialogs/editVacancy.html',
})
export class DialogEditVacancy {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public vacancyApiService: VacancyApiService, public sucessEditDialog: MatDialog) { }

  Validator(vacancy: any): boolean {

    if (vacancy.companyName == undefined || vacancy.vacancyName == undefined || vacancy.description == undefined || vacancy.require == undefined || vacancy.benefits == undefined) {

      return false;
    }

    return true;


  }

  async EditVacancy(vacancy: any) {

    vacancy.vacancyName = (<HTMLInputElement>document.getElementById(`vacancy-name`)).value;
    vacancy.companyName = (<HTMLInputElement>document.getElementById(`company-name`)).value;
    vacancy.description = (<HTMLInputElement>document.getElementById(`description`)).value;
    vacancy.require = (<HTMLInputElement>document.getElementById(`require`)).value;
    vacancy.benefits = (<HTMLInputElement>document.getElementById(`benefits`)).value;

    console.log(vacancy);

    if (!this.Validator(vacancy)) {
      return;
    }

    try{

      await this.vacancyApiService.put(vacancy);

      this.sucessEditDialog.open(DialogSucessEditVacancy)
    }
    catch(error){
      this.sucessEditDialog.open(DialogErrorEditVacancy);
      return;
    }


  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/successEditVacancy.html',
})
export class DialogSucessEditVacancy { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/successDeleteVacancy.html',
})
export class DialogSucessDeleteVacancy { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/errorRegisterVacancy.html',
})
export class DialogErrorEditVacancy { }
