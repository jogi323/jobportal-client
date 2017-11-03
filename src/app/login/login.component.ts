import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { NotificationsService } from 'angular2-notifications';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel {
  user: LoginFormData;
  forgotPasswordData: ForgetFormData;
  title: string;
  message: string;
  isLogin: boolean = true;
  constructor(
    dialogService: DialogService,
    private router: Router,
    private userService: UserService,
    private notificationsService: NotificationsService
  ) {
    super(dialogService);
    this.user = {
      Email_Address: '',
      Password: ''
    }
    this.forgotPasswordData = {
      email: ''
    }
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }

  forgotPassword() {
    this.isLogin = false;
  }

  login() {
    this.userService.attemptAuth(this.user).subscribe(
      res => {
          this.router.navigate([res.userType+'/profile']);
          this.close();
      },
      err => {
          this.close();
        this.notificationsService.error(
            err.title,
            err.error.message,
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 50
            }
          )
      });
  }

  reset() {
  }

  navigateToRegister() {
    this.close();
    this.router.navigate(['register']);
  }

  ngOnInit() {

  }
}

export interface ConfirmModel {
  title: string;
  message: string;
}
export interface LoginFormData {
  Email_Address: String;
  Password: String;
}
export interface ForgetFormData {
  email: String;
}


