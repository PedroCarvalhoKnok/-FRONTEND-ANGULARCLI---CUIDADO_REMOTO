import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  UserRole: any = ['Responsavel','Idoso(a)','Prof Saude'];

  constructor() { }

  ngOnInit(): void {
  }

}
