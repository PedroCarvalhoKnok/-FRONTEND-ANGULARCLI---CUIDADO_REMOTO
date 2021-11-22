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
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  user = new User();
  formGroup!: FormGroup
  formSubbimited: Boolean = false
  editForm: Boolean = false

  nameValid: Boolean = false;
  passwordValid: Boolean = false;
  emailValid: Boolean = false;
  emailFormat: Boolean = false;
  phoneValid: Boolean = false;
  birthValid: Boolean = false;
  roleValid: Boolean = false;

  UserRole: UserRole[] = [{ value: 'Responsável', viewValue: 'Responsável' }, { value: 'Idoso(a)', viewValue: 'Idoso(a)' }, { value: 'Prof. Saúde', viewValue: 'Prof. Saúde' }];

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router, public dialog: MatDialog) { }

  async ngOnInit() {

    let edit = sessionStorage.getItem('Edicao');

    console.log(edit);

    if (edit == 'E') {

      let customerId = sessionStorage.getItem('idCustomer');

      let token = `${(<any>data).token}`;

      //customerId = '619051e24f915c8dd0b855f5';

      if (customerId != null || customerId != undefined) {

        this.editForm = true;

        let userSearched = await this.userApiService.getById(customerId, token);

        this.user.name = userSearched.client;

        this.user.email = userSearched.email;

        this.user.phone = userSearched.phone;

        this.user.password = userSearched.password;

        this.user.role = userSearched.role;

        this.user._id = customerId;

        (<HTMLInputElement>document.getElementById(`perfil-input`)).value = this.user.role;

      }
    }

    document.addEventListener('keypress', function (e) {
      if (e.which == 13) {
        document.getElementById('registerBtn')?.click();
      }
    }, false);

  }

  openDialog() {
    let sucessDialog = this.dialog.open(DialogSucessRegisterUser);

    sucessDialog.afterClosed().subscribe(result => {

      this.router.navigate(['/login']);

    });
  }

  openDialogEdit() {
    this.dialog.open(DialogSucessEditUser);
  }

  async registerUser() {

    if (!this.setForm())
      return;

    let token = `${(<any>data).token}`;

    try {

      await this.userApiService.post(this.user, token);
      
      this.openDialog();

    } catch (error) {
      this.dialog.open(DialogErrorRegisterUser);
      return;
    }


  }

  async editUser() {

    if (!this.setForm())
      return;

    let token = `${(<any>data).token}`;

    //this.user._id = '619051e24f915c8dd0b855f5';

    try {

      await this.userApiService.put(this.user, token);

      this.openDialogEdit();

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

    if (this.user.birthDate == undefined) {
      this.birthValid = true;
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
  templateUrl: '../dialogs/sucessEditUser.html',
})
export class DialogSucessEditUser { }
