import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService} from '../../services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  data:ContactusModel;
  captchaVerified: Boolean = false;
  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService,
    private loaderService: LoaderService,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.data = {
      FirstName:'',
      LastName:'',
      Email_Address:'',
      Comments:'',
      Date_Submitted: null
    }
    
  }
 
  ngOnInit() {
  }
   handleCorrectCaptcha(response){
    if(response) {
      this.ngZone.run(()=>{
      this.captchaVerified = true;        
      })
    }
  }
  submit(form){
    this.data.Date_Submitted = new Date();
    this.loaderService.display(true);
    this.userService.contactus(this.data).subscribe(res => {
        this.loaderService.display(false);
        form.reset();
        this.notificationsService.success(
          'Success',
          res.message,
          environment.options
        )
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
export interface ContactusModel {
  FirstName: String;
  LastName: String;
  Email_Address: String;
  Comments: String;
  Date_Submitted: Date;
}
