import { Component, OnInit } from '@angular/core';

import { User } from '../../../shared/models/user.model';
import { JsonLoaderService } from '../../../shared/services/json-loader.service';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  isUserDataEdit:Boolean= false;
  isWorkDataEdit:Boolean= false;
  user:User;

  statesList:any[];
  languagesList:any[];
  yearsList:any[];

  public uploader:FileUploader = new FileUploader({url: URL});

  positionList = [
    {"name":"Dental Assistant"},
    {"name":"Registered Dental Assistant"},
    {"name":"Registered Dental Assistant EF"},
    {"name":"Registered Dental Hygienist"},
    {"name":"Registered Dental Hygienist EF"},
    {"name":"Receptionist"},
    {"name":"Front Office Assistant"},
  ]

  constructor(
    private jsonLoaderService:JsonLoaderService
  ) { 

  }

  editUserData(){
    this.isUserDataEdit = !this.isUserDataEdit;
  }

  cancelUpdate(){
    this.isUserDataEdit = !this.isUserDataEdit;   
  }

  updateUserData(user){
    console.log(this.uploader);
    this.isUserDataEdit = !this.isUserDataEdit;    
  }

  editWorkData(){
    this.isWorkDataEdit = !this.isWorkDataEdit;
  }

  cancelWorkUpdate(){
    this.isWorkDataEdit = !this.isWorkDataEdit;   
  }

  updateWorkData(user){
    console.log(user)
    this.isWorkDataEdit = !this.isWorkDataEdit;    
  }


  ngOnInit() {
  
    this.jsonLoaderService.getStates()
                            .subscribe(data => {
                              this.statesList = data;
                              console.log(data);
                            }, error => {
                              console.log(error);
                            });
    this.jsonLoaderService.getLanguages()
                            .subscribe(data => {
                              this.languagesList = data;
                              console.log(data);
                            }, error => {
                              console.log(error);
                            });
    this.jsonLoaderService.getYears()
                            .subscribe(data => {
                              this.yearsList = data;
                              console.log(data);
                            }, error => {
                              console.log(error);
                            });

      this.user = {
        "_id":"1",
        "Firstname" : "tyler",
        "Lastname" : "durden",
        "Email_Address":"slvrsmiles@gmail.com",
        "Address_street" : "103, burgers road",
        "Address_Unit": "New park Road",
        "City" : "hydarebad",
        "State" : "Andhra Pradesh",
        "Zip_Code":500016,
        "Phone1":2347973246,
        "Phone2":3410400120,
        "Position":"Dental Assistant",
        "Experience":5,
        "Hourly_Pay":250,
        "Practice_Name":"Surgeon",
        "Speciality":"General Dentistry",
        "Practice_Phone":253773,
        "Nr_of_Operations":25,
        "Nr_of_Staff":12,
        "Languages":"English",
        "Dental_School":"NRI medical College",
        "Year_Graduated":2014,
        "Travel_Distance":50,
        "License_Nr":"A8SA43VFG454",
        "Years_in_Practice":5,
        "Contact_Person":"brad pit",
        "Contact_Phone_Nr":7032672947,
        "image":""
      }
  
  }
  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.user.image = myReader.result;
      console.log(this.user.image);
    }
    myReader.readAsDataURL(file);
  }

}
