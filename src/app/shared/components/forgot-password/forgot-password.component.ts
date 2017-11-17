import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPassword: ForgotPasswordData;
  mismatched : boolean = false;
  
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private router: Router
  ) { 
    this.resetPassword = {
      newPassword: '',
      confirmPassword: '',
      id:''
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.resetPassword.id = params['id'];
      });
  }
  onChange($event) {
    if(this.resetPassword.confirmPassword !== this.resetPassword.newPassword) {
      this.mismatched = true;
    }else{
      this.mismatched = false;
    }
  }
  submit() {
    this.userService.changePassword(this.resetPassword).subscribe(res => {
      this.notificationsService.success(
          'Success',
            res.message,
            environment.options
      );
      this.router.navigate(['']);
    },
    err => {
      this.notificationsService.error(
            err.title,
            err.error.message,
            environment.options
          )
    });
  }
}

export class ForgotPasswordData {
  newPassword: String;
  confirmPassword: String;
  id: String;
}