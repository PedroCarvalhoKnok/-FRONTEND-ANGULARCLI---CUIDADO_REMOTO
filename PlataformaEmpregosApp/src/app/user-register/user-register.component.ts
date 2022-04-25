import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../services/user-api-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import data from "../apiconfig.json";

interface UserRole {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  user = new User();
  formGroup!: FormGroup
  formSubbimited: Boolean = false
  editForm: Boolean = false

  nameValid: Boolean = false;
  userNameValid: Boolean = false;
  passwordValid: Boolean = false;
  emailValid: Boolean = false;
  emailFormat: Boolean = false;
  phoneValid: Boolean = false;
  roleValid: Boolean = false;

  UserRole: UserRole[] = [{ value: 'Empresa', viewValue: 'Empresa' }, { value: 'Funcionario', viewValue: 'Funcionário' }, { value: 'Administrador', viewValue: 'Administrador' }];

  constructor(private userApiService: UserApiService, private router: Router, public dialog: MatDialog) { }

  async ngOnInit() {
     
    document.addEventListener('keypress', function (e) {
      if (e.which == 13) {
        document.getElementById('registerBtn')?.click();
      }
    }, false);

  }

  openDialog() {
    let sucessDialog = this.dialog.open(DialogSucessRegisterUser);

    sucessDialog.afterClosed().subscribe(result => {

      this.router.navigate(['/usuario/listar']);

    });
  }

  openDialogEdit() {
    this.dialog.open(DialogSucessEditUser);
  }

  async registerUser() {

    if (!this.setForm())
      return;

    try {

      await this.userApiService.post(this.user);
      
      this.openDialog();

    } catch (error) {
      this.dialog.open(DialogErrorRegisterUser);
      return;
    }


  }

  private setForm(): Boolean {

    let retorno = true;

    if (this.user.name == '' || this.user.name == null || this.user.name == undefined) {
      this.nameValid = true;
      retorno = false;
    }

    if (this.user.userName == '' || this.user.userName == null || this.user.userName == undefined) {
      this.nameValid = true;
      retorno = false;
    }

    if (this.user.email == '' || this.user.email == null || this.user.email == undefined) {
      this.emailValid = true;
      retorno = false;
    }

    if (this.user.email != undefined) {
      if (!this.user.email.includes('@') || !this.user.email.includes('.com')) {
        this.emailFormat = true;
        retorno = false;
      }
    }

    if (this.user.phone == undefined || this.user.phone.length < 9) {
      this.phoneValid = true;
      retorno = false;
    }
    if (this.user.role == undefined) {
      this.roleValid = true;
      retorno = false;
    }

    if (this.user.password == undefined) {
      this.passwordValid = true;
      retorno = false;
    }

    return retorno;

  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/errorRegisterUser.html',
})
export class DialogErrorRegisterUser { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/sucessUserRegister.html',
})
export class DialogSucessRegisterUser { }

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/successEditUser.html',
})
export class DialogSucessEditUser { }
