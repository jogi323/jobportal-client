import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DialogService } from 'ng2-bootstrap-modal';
import { LoginComponent } from '../../../login/login.component';
import { UserService } from '../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  userType: String = '';
  isLoggedIn: Boolean = false;
  subscription:Subscription;
  currentUser:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private userService: UserService
  ) {
    this.subscription = userService.currentUser.subscribe(user =>{
        this.isLoggedIn = true;
        this.userType = user.userType;
        this.currentUser = user;
    })

  }

  ngOnInit() {


  }
  userProfile(){
    this.router.navigate([this.userType+'/profile'])
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
    this.router.navigate(['']);
    this.isLoggedIn = false;
  }
}
