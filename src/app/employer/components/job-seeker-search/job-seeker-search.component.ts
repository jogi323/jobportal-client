import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-seeker-search',
  templateUrl: './job-seeker-search.component.html',
  styleUrls: ['./job-seeker-search.component.css']
})
export class JobSeekerSearchComponent implements OnInit {
  jobSeekers = [
    {"Position_id":"34983","user_id":"bpit", "Zip_code":"324234","Experience":"4","Hourly_Pay":"$300","Time_start":"08.00","Time_Finish":"13:00"},
    {"Position_id":"34983","user_id":"bpit", "Zip_code":"324234","Experience":"4","Hourly_Pay":"$300","Time_start":"08.00","Time_Finish":"13:00"},
    {"Position_id":"34983","user_id":"bpit", "Zip_code":"324234","Experience":"4","Hourly_Pay":"$300","Time_start":"08.00","Time_Finish":"13:00"},
    {"Position_id":"34983","user_id":"bpit", "Zip_code":"324234","Experience":"4","Hourly_Pay":"$300","Time_start":"08.00","Time_Finish":"13:00"},
    {"Position_id":"34983","user_id":"bpit", "Zip_code":"324234","Experience":"4","Hourly_Pay":"$300","Time_start":"08.00","Time_Finish":"13:00"},
    {"Position_id":"34983","user_id":"bpit", "Zip_code":"324234","Experience":"4","Hourly_Pay":"$300","Time_start":"08.00","Time_Finish":"13:00"},
    {"Position_id":"34983","user_id":"bpit", "Zip_code":"324234","Experience":"4","Hourly_Pay":"$300","Time_start":"08.00","Time_Finish":"13:00"},
    {"Position_id":"34983","user_id":"bpit", "Zip_code":"324234","Experience":"4","Hourly_Pay":"$300","Time_start":"08.00","Time_Finish":"13:00"},
    {"Position_id":"34983","user_id":"bpit", "Zip_code":"324234","Experience":"4","Hourly_Pay":"$300","Time_start":"08.00","Time_Finish":"13:00"}
  ]

  Positions = [
    {"Position_Id":"Dental Assistant"},
    {"Position_Id":"Registered Dental Assistant"},
    {"Position_Id":"Registered Dental Assistant EF"},
    {"Position_Id":"Registered Dental Hygienist"},
    {"Position_Id":"Registered Dental Hygienist EF"},
    {"Position_Id":"Receptionist"},
    {"Position_Id":"Office Manager"},
    {"Position_Id":"Oral Surgeon"},
    {"Position_Id":"Lab Technician"},
  ]

  constructor() { }

  ngOnInit() {
  }

}
