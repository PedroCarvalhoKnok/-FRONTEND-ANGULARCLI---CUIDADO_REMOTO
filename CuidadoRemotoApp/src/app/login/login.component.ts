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

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router) { }

  ngOnInit(): void {
  }

  async authenticateUser(){

    let user = new User();

    user.email = this.email;
    user.password = this.password;

    let userAuth = await this.userApiService.authenticate(user);

    if(userAuth.token != "" || userAuth.token != undefined){

      localStorage.setItem('hashToken', userAuth.token);

      this.router.navigate(['/home']);

    }

  }

}
