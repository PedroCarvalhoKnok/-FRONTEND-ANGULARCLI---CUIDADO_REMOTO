import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Vacancy } from '../models/Vacancy';
import { VacancyApiService } from '../services/vacancy-api-service';

@Component({
  selector: 'app-urban-services',
  templateUrl: './vacancies-register.component.html',
  styleUrls: ['./vacancies-register.component.scss']
})
export class UrbanServicesComponent implements OnInit {

  vacancy = new Vacancy();

  companyValid: Boolean = false;
  vacancyNameValid: Boolean = false;
  descriptionValid: Boolean = false;
  requireValid: Boolean = false;
  benefitsValid: Boolean = false;

  constructor(public dialog: MatDialog, private router: Router, private vacancyApiService: VacancyApiService) { }

  ngOnInit(): void {

    document.addEventListener('keypress', function (e) {
      if (e.which == 13) {
        document.getElementById('registerBtn')?.click();
      }
    }, false);
  }

  openDialog() {
    let sucessDialog = this.dialog.open(DialogSucessRegisterVacancy);

    sucessDialog.afterClosed().subscribe(result => {

      this.router.navigate(['/vagas/listar']);

    });
  }

  async registerVacancie(){

    if (!this.setForm())
      return;

    try {

        await this.vacancyApiService.post(this.vacancy);
        
        this.openDialog();
  
    } catch (error) {
      this.dialog.open(DialogErrorRegisterVacancy);
      return;
    }

    

  }

  private setForm(): Boolean {

    let retorno = true;

    if (this.vacancy.companyName == '' || this.vacancy.companyName == null || this.vacancy.companyName == undefined) {
      this.vacancyNameValid = true;
      retorno = false;
    }

    if (this.vacancy.vacancyName == '' || this.vacancy.vacancyName == null || this.vacancy.vacancyName == undefined) {
      this.vacancyNameValid = true;
      retorno = false;
    }

    if (this.vacancy.description == '' || this.vacancy.description == null || this.vacancy.description == undefined) {
      this.descriptionValid = true;
      retorno = false;
    }

    if (this.vacancy.require  == '' || this.vacancy.require == null || this.vacancy.require == undefined) {
        this.requireValid = true;
        retorno = false;
    }

    if (this.vacancy.benefits  == '' || this.vacancy.benefits == null || this.vacancy.benefits == undefined) {
      this.benefitsValid = true;
      retorno = false;
    }
    
    return retorno;

  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/sucessUserRegister.html',
})
export class DialogSucessRegisterVacancy { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/errorRegisterVacancy.html',
})
export class DialogErrorRegisterVacancy { }
