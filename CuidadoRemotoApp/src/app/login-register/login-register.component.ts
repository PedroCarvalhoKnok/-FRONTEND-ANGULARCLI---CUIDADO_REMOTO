import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../services/user-api-service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

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
  formGroup! : FormGroup
  formSubbimited: Boolean = false

  UserRole: UserRole[] = [{value: 'resp', viewValue: 'Responsável'},{value: 'idoso', viewValue: 'Idoso(a)'},{value: 'saude', viewValue: 'Prof. Saúde'}];

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setForm();
  }

  openDialog() {
    this.dialog.open(DialogSucessRegisterUser);
  }

  async registerUser(){
    this.formSubbimited = true;
    if (this.formGroup.valid) {
      let userRegister: User = this.formGroup.value as User;

      let userRegistered = await this.userApiService.post(userRegister);

      if(userRegistered != undefined || userRegistered != null)
         this.openDialog();
      

    }


  }

  private setForm(): void {

    this.formGroup = this.formBuilder.group({

      name:['', [Validators.required]],
      email:['', [Validators.required]],
      phone:['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      birthDate:['', [Validators.required]],
      password:['', [Validators.required]],
      role:['', [Validators.required]],
    })
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/sucessUserRegister.html',
})
export class DialogSucessRegisterUser {}
