import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentUrl: String;
  changePassword: changePasswordInterface;
  mismatched : boolean = false;
  
  constructor(
    private router: Router,
    private userServie: UserService,
    private notificationsService: NotificationsService,
    private loaderService: LoaderService
  ) {
    this.currentUrl = this.router.url;
    this.changePassword = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }

  ngOnInit() {

  }
  onChange($event) {
    if(this.changePassword.confirmPassword !== this.changePassword.newPassword) {
      this.mismatched = true;
    }else{
      this.mismatched = false;
    }
  }
  submit() {
    this.loaderService.display(true);
    var payload = {
      oldPassword: this.changePassword.oldPassword,
      newPassword: this.changePassword.newPassword
    };
    this.userServie.resetPassword(payload).subscribe(res => {
      this.loaderService.display(false);
      this.notificationsService.success(
        'Success',
        res.message,
        environment.options
      );
      this.router.navigate(['']);
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
export class changePasswordInterface {
  oldPassword: String;
  newPassword: String;
  confirmPassword: String
}
