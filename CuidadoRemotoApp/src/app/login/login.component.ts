import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/user-api-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { StoreService } from '../services/store.service';
import { MatDialog } from '@angular/material/dialog';
import data from "../apiconfig.json";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  //formGroup! : FormGroup
  emailValid: Boolean = false;
  passwordValid: Boolean = false;

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router, private storeService: StoreService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.storeService.profileVisible = false;

    //console.log(sessionStorage);

    sessionStorage.clear();

    //console.log(`${(<any>data).token}`);
    

    document.addEventListener('keypress', function (e) {
      if (e.which == 13) {
        document.getElementById('loginBtn')?.click();
      }
    }, false);
  }


  async authenticateUser() {

    let user = new User();

    user.email = this.email;
    user.password = this.password;

    let token = `${(<any>data).token}`;

    this.setForm(user.email, user.password);

    try {

      let userAuth: any = await this.userApiService.authenticate(user, token);


      sessionStorage.setItem('idCustomer', userAuth[1]._id);

      sessionStorage.setItem('userName', userAuth[1].client);

      console.log(sessionStorage);

      this.router.navigate(['/inicio']);

    } catch (error) {

      this.matDialog.open(DialogErrorLogin);
      return;
    }

  }

  private setForm(name: string, password: string): void {

    if (name == '')
      this.emailValid = true;

    if (password == '')
      this.passwordValid = true;


  }

  goRegisterPage() {

    this.router.navigate(['/registrar']);

  }


}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialogs/loginError.html',
})
export class DialogErrorLogin { }
