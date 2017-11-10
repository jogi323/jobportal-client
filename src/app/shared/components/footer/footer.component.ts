import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  userType: String = '';
  isLoggedIn: Boolean = false;
  subscription:Subscription;
  currentUser:any;

  constructor(
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

}
