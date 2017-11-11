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
  currentUrl:String;
  showProfileStatus: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private userService: UserService
  ) {
    this.subscription = userService.currentUser.subscribe(user =>{
        if(user.userType !== undefined){
          this.isLoggedIn = true;
        }else {
          this.isLoggedIn = false;
        }
        this.userType = user.userType;
        this.currentUser = user;
    })

  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    if(this.currentUrl === '/') {
      this.showProfileStatus = false;
    }else{
      this.showProfileStatus = true;
    }
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

  closeProfileStatus() {
    console.log('clicked')
  }
}
