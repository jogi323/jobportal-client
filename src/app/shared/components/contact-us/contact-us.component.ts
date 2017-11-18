import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  data:ContactusModel;
  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService,
    private loaderService: LoaderService
  ) { 
    this.data = {
      FirstName:'',
      LastName:'',
      Email_Address:'',
      Comments:'',
      Date_Submitted: null
    }
    window['verifyCallback'] = this.verifyCallback.bind(this);
  }

  ngOnInit() {
  }
  displayRecaptcha(){
    var doc = <HTMLDivElement>document.getElementById('signup-form');
    var script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    doc.appendChild(script);
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
  verifyCallback(response){
    alert(response);
  }
}
export interface ContactusModel {
  FirstName: String;
  LastName: String;
  Email_Address: String;
  Comments: String;
  Date_Submitted: Date;
}
