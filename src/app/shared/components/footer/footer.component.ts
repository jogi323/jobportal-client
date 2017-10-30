import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  userType: String;
  showJobseekerFooter: boolean;
  showEmployerFooter: boolean;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(res => {
      if (res.user && res.user.userType === 'jobseeker') {
        this.showJobseekerFooter = true;
      } else if (res.user && res.user.userType === 'employer') {
        this.showEmployerFooter = true;
      }
    })
  }

}
