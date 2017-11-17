import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employee: employeeRegister;
  selectedUserType: boolean = false;

  userType: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationsService: NotificationsService,
    private loaderService: LoaderService
  ) {
    this.employee = {
      Referred_By: '',
      Firstname: '',
      Lastname: '',
      Email_Address: '',
      Password: '',
      checkbox: false,
      userType: '',
      Date_Submitted: new Date()
    }
  }

  ngOnInit() {
  }

  selectedUser(userType) {
    this.userType = userType;
    this.selectedUserType = true;
  }
  goBack() {
    this.selectedUserType = false;
  }

  registerUser() {
    this.employee.userType = this.userType;
    this.loaderService.display(true);
    this.userService.registerUser(this.employee).subscribe(
      res => {
          this.router.navigate(['']);
          this.loaderService.display(false);
          this.notificationsService.success('Success',
            res.message,
            environment.options
          )
      },
      err => {
        this.loaderService.display(false);        
        this.notificationsService.error(
          err.title,
          err.error.message,
          environment.options
        )
      });
  }

}
export interface employeeRegister {
  Referred_By: String;
  Firstname: String;
  Lastname: String;
  Password: String;
  Email_Address: String;
  checkbox: boolean;
  userType: String;
  Date_Submitted: Date;
}