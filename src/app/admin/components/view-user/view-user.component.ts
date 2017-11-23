import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';

import { AdminService } from '../../../shared/services/admin.service';
import { UserService } from '../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userId: String;
  userData: any = "";
  subscription: Subscription;
  userType: String;
  currentUser: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private  adminService : AdminService,
    private userService: UserService,
  ) { 
    this.subscription = userService.currentUser.subscribe(user => {
      this.userType = user.userType;
      this.currentUser = user;
    })
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId = params['id']
      if(this.userId){
        this.adminService.getAllUserDetails(this.userId).subscribe(
          res => {
            this.userData = res.data;
            console.log(res)
          },err => {
            console.log(err)
          }
        )
      }
    });
  }

}
