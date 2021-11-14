import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../services/user-api-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
  phoneValid: Boolean = false;
  birthValid: Boolean = false;
  roleValid: Boolean = false;

  UserRole: UserRole[] = [{ value: 'resp', viewValue: 'Responsável' }, { value: 'idoso', viewValue: 'Idoso(a)' }, { value: 'saude', viewValue: 'Prof. Saúde' }];

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router, public dialog: MatDialog) { }

  async ngOnInit() {

    let edit = localStorage.getItem('Edicao');

    console.log(edit);
    
    if (edit == 'E') {

      let customerId = localStorage.getItem('idCustomer');

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTg5YTk0MjUwODcyZDY1OThjMTllNmMiLCJpYXQiOjE2MzY4NDY2NDl9.MyNE-fm-Z8IdBgliaulu0eO1nmgrSh8QnXk99BfC1VE';

      customerId = '619051e24f915c8dd0b855f5';

      if (customerId != null || customerId != undefined) {

        this.editForm = true;

        let userSearched = await this.userApiService.getById(customerId, token);

        this.user.name = userSearched.client;

        this.user.email = userSearched.email;

        this.user.phone = userSearched.phone;

        this.user.password = userSearched.password;

        this.user.role = userSearched.role;

      }
    }

  }

  openDialog() {
    this.dialog.open(DialogSucessRegisterUser);
  }

  openDialogEdit() {
    this.dialog.open(DialogSucessEditUser);
  }

  async registerUser() {

    if (!this.setForm())
      return;

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTg5YTk0MjUwODcyZDY1OThjMTllNmMiLCJpYXQiOjE2MzY4NDY2NDl9.MyNE-fm-Z8IdBgliaulu0eO1nmgrSh8QnXk99BfC1VE';

    let userRegistered = await this.userApiService.post(this.user, token);

    if (userRegistered != undefined || userRegistered != null)
      this.openDialog();


  }

  async editUser() {

    if (!this.setForm())
      return;

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTg5YTk0MjUwODcyZDY1OThjMTllNmMiLCJpYXQiOjE2MzY4NDY2NDl9.MyNE-fm-Z8IdBgliaulu0eO1nmgrSh8QnXk99BfC1VE';

    this.user._id = '619051e24f915c8dd0b855f5';

    let userRegistered = await this.userApiService.put(this.user, token);

    if (userRegistered != undefined || userRegistered != null)
      this.openDialogEdit();


  }

  private setForm(): Boolean {

    if (this.user.name == '' || this.user.name == null || this.user.name == undefined) {
      this.nameValid = true;
      return false;
    }

    if (this.user.email == '' || this.user.email == null || this.user.email == undefined) {
      this.emailValid = true;
      return false;
    }

    if (this.user.phone == '' && this.user.phone.length == 10 || this.user.phone.length == 11) {
      this.phoneValid = true;
      return false;
    }
    if (this.user.role == '' || this.user.role == null || this.user.role == undefined) {
      this.roleValid = true;
      return false;
    }

    if (this.user.password == '' || this.user.password == null || this.user.password == undefined) {
      this.passwordValid = true;
      return false;
    }

    if (this.user.birthDate == '' || this.user.birthDate == null || this.user.birthDate == undefined) {
      this.birthValid = true;
      return false;
    }

    return true;

  }

}

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
