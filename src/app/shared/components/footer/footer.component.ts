import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  userType:String;
  showJobseekerFooter: boolean;
  showEmployerFooter: boolean;
  constructor() { }

  ngOnInit() {
    this.userType = localStorage.getItem('url');
    if(this.userType && this.userType === 'jobseeker'){
      this.showJobseekerFooter = true;
    }
    if(localStorage.getItem('url') && localStorage.getItem('url') === 'employer'){
      this.showEmployerFooter = true;
    }
  }

}
