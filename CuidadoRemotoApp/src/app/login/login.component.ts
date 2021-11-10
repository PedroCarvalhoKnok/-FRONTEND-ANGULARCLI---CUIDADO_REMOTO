import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/user-api-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';

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

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  async authenticateUser(){

    let user = new User();

    user.email = this.email;
    user.password = this.password;

    this.setForm(user.email, user.password);

    let userAuth = await this.userApiService.authenticate(user);

    if(userAuth != null || userAuth != undefined){

      localStorage.setItem('hashToken', userAuth.token);

      localStorage.setItem('userId', userAuth.id);

      this.router.navigate(['/inicio']);

    }

  }

  private setForm(name: string, password: string): void {

    if(name == '')
      this.emailValid = true;

    if(password == '')
      this.passwordValid = true;

    
  }

}
