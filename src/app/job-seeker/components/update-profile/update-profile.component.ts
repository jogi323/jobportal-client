import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

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
