import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DialogService } from 'ng2-bootstrap-modal';
import { LoginComponent } from '../../../login/login.component';
import { UserService } from '../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../services/loader.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  userType: String = '';
  isLoggedIn: Boolean = false;
  subscription: Subscription;
  currentUser: any;
  currentUrl: String;
  showProfileStatus: Boolean = true;
  public optionsBottom = {
    position: ["bottom", "left"],
    timeOut: 0,
    lastOnBottom: true,
    showProgressBar: false,
    clickToClose: false
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private userService: UserService,
    private loaderService: LoaderService,
    private notificationsService: NotificationsService,
  ) {
    this.subscription = userService.currentUser.subscribe(user => {
      if (user.userType !== undefined) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      this.userType = user.userType;
      this.currentUser = user;
      this.showNotification(user)
    })

  }
  showNotification(user) {
    if ((!user.personalInfo && !user.workInfo) && this.isLoggedIn && user.userType != 'admin') {
      this.notificationsService.info(
        '',
        'Your personal and/or work profiles are not updated',
        this.optionsBottom
        // environment.options
      )
    }
  }
  ngOnInit() {
  }
  userProfile() {
    this.router.navigate([this.userType + '/profile'])
  }
  showConfirm() {
    let disposable = this.dialogService.addDialog(LoginComponent, {

      title: 'Confirm title',
      message: 'Confirm message'
    }, { closeByClickingOutside: true, backdropColor: 'rgba(000, 0, 0, 0.5)' })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
        }
        else {
        }
      });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

  logoutUser() {
    this.userService.purgeAuth();
    this.loaderService.display(false);
    this.router.navigate(['']);
    this.isLoggedIn = false;
    this.removeNotification();
  }
  removeNotification() {
    this.notificationsService.remove();
  }

  closeProfileStatus() {
    this.showProfileStatus = false;
  }
}
