import { Component, OnInit  } from '@angular/core';

import { User } from '../../../shared/models/user.model';
import { JsonLoaderService } from '../../../shared/services/json-loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isUserDataEdit:Boolean= false;
  isWorkDataEdit:Boolean= false;
  user:User;
  scriptsLoaded: Boolean = false;

  statesList:any[];
  languagesList:any[];
  yearsList:any[];
  public options = {types: ['address'],componentRestrictions: { country: 'US' }}
  
  getAddress(event){
    console.log(event);
    console.log(this.shuffleGoogleMapsAddress(event))
  }
  public shuffleGoogleMapsAddress(selectedData: any) {
    let geo_lat = selectedData.geometry.location.lat();
    let geo_lng = selectedData.geometry.location.lng();
    if (selectedData.name) {
      for (var i = 0; i < selectedData.address_components.length; i++) {
        if (selectedData.address_components[i].types[0] == "country") {
          var geo_country = selectedData.address_components[i].long_name;
        }
        if (selectedData.address_components[i].types[0] == "street_number") {
          var geo_addr_num = selectedData.address_components[i].long_name;
        }
        if (selectedData.address_components[i].types[0] == "route") {
          var geo_addr = selectedData.address_components[i].long_name;
        }
        if (selectedData.address_components[i].types[0] == "administrative_area_level_1") {
          var geo_state = selectedData.address_components[i].short_name;
        }
        if (selectedData.address_components[i].types[0] == "neighborhood") {
          var geo_neigh = selectedData.address_components[i].short_name;
        }
        if (selectedData.address_components[i].types[0] == "sublocality_level_2") {
          var geo_loc2 = selectedData.address_components[i].short_name;
        }
        if (selectedData.address_components[i].types[0] == "sublocality_level_1") {
          var geo_loc1 = selectedData.address_components[i].short_name;
        }
        if (selectedData.address_components[i].types[0] == "locality") {
          var geo_city = selectedData.address_components[i].long_name;
        }
        if (selectedData.address_components[i].types[0] == "administrative_area_level_2") {
          var geo_city_2 = selectedData.address_components[i].long_name;
        }
        if (selectedData.address_components[i].types[0] == "postal_code") {
          var geo_zip = selectedData.address_components[i].long_name;
        }
      }
      return {
        lat: geo_lat,
        lng: geo_lng,
        neighborhood: geo_neigh,
        location: geo_loc2,
        country: geo_country,
        addr_num: geo_addr_num,
        addr: geo_addr,
        state: geo_state,
        city: geo_city,
        city2: geo_city_2,
        zip: geo_zip
      }
    }
  }

  specialityList = [
    {"name":"General Dentistry"},
    {"name":"Endodontist"},
    {"name":"Orthodontist"},
    {"name":"Oral Surgeon"},
    {"name":"Pedodontist"},
    {"name":"Periodontist"},
  ]

  constructor(
    private jsonLoaderService:JsonLoaderService
  ) { 
    this.user = {
      "_id":"1",
      "Firstname" : "tyler",
      "Lastname" : "durden",
      "Email_Address":"slvrsmiles@gmail.com",
      "Address_street" : "103, burgers road",
      "Address_Unit": "New park Road",
      "City" : "Alaska",
      "State" : "Alaska",
      "Zip_Code":100016,
      "Practice_Name":"Surgeon",
      "Speciality":"General Dentistry",
      "Practice_Phone":253773,
      "Nr_of_Operations":25,
      "Nr_of_Staff":12,
      "Languages":"English",
      "Dental_School":"NRI medical College",
      "Year_Graduated":2014,
      "License_Nr":"A8SA43VFG454",
      "Years_in_Practice":5,
      "Contact_Person":"brad pit",
      "Contact_Phone_Nr":7032672947,
      "image":""
    }



  }

  editUserData(){
    this.isUserDataEdit = !this.isUserDataEdit;
  }

  cancelUpdate(){
    this.isUserDataEdit = !this.isUserDataEdit;   
  }
  updateUserData(){
    this.isUserDataEdit = !this.isUserDataEdit;
    console.log(this.user);    
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