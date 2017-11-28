import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { NotificationsService } from 'angular2-notifications';

import { UserService } from '../shared/services/user.service';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/services/loader.service';

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
    private notificationsService: NotificationsService,
    private loaderService: LoaderService
  ) {
    super(dialogService);
    this.user = {
      Email_Address: '',
      Password: ''
    }
    this.forgotPasswordData = {
      Email_Address: ''
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
    this.loaderService.display(true);
    this.userService.attemptAuth(this.user).subscribe(
      res => {
        if(res.userType){
          this.close();   
          this.router.navigate([res.userType+'']);
        }else{
          this.close();               
          this.notificationsService.success(
            'messahe',
            res.message,
            environment.options
          )
        }
          
      },
      err => {
        this.close();
        this.notificationsService.error(
            err.title,
            err.error.message,
            environment.options
          );
         this.loaderService.display(false);          
      });
  }

  reset() {
    this.loaderService.display(true); 
    this.close();       
    this.userService.forgotPassword(this.forgotPasswordData).subscribe(
      res => {
         this.loaderService.display(false);                  
        this.notificationsService.success(
          'Success',
          res.message,
          environment.options
        )
      },
      err => {
        this.notificationsService.error(
          err.title,
          err.message,
          environment.options
        )
         this.loaderService.display(false);                  
      }
    )
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
  Email_Address: String;
}


