import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DialogService } from 'ng2-bootstrap-modal';
import { LoginComponent } from '../../../login/login.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  userType: String;
  isLoggedIn: Boolean = false;
  showJobseekerNav: boolean;
  showEmployerNav: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(res => {
      if (res === true) {
        this.isLoggedIn = true;
      }
    })
    this.userService.currentUser.subscribe(res => {
      if (res.user && res.user.userType === 'jobseeker') {
        this.showJobseekerNav = true;
      } else if (res.user && res.user.userType === 'employer') {
        this.showEmployerNav = true;
      }
    })
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
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    // setTimeout(()=>{
    //     disposable.unsubscribe();
    // },10000);
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

  logoutUser() {
    this.userService.purgeAuth();
    this.router.navigate(['']);
    this.showJobseekerNav = false;
    this.showEmployerNav = false;
    this.isLoggedIn = false;
  }
}
