import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel {
  user: LoginFormData;
  forgotPasswordData: ForgetFormData;
  title: string;
  message: string;
  isLogin: boolean = true;
  constructor(dialogService: DialogService, private router:Router) {
    super(dialogService);
    this.user  = {
      userName: '',
      password: ''
    }
    this.forgotPasswordData = {
      email:''
    }
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }

  forgotPassword(){
    this.isLogin = false;
  }

  login(){
    console.log(this.user);
  }

  reset(){
    console.log(this.forgotPasswordData);
  }

  navigateToRegister(){
    this.close();
    this.router.navigate(['register']);
  }

  ngOnInit(){
    
  }
}

export interface ConfirmModel {
  title:string;
  message:string;
}
export interface LoginFormData {
   userName : String;
   password: String;
}
export interface ForgetFormData {
  email: String;
}


