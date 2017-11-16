import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { JsonLoaderService } from '../../../shared/services/json-loader.service';
import { UserService } from '../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataEdit: Boolean = false;
  isWorkDataEdit: Boolean = false;
  user: User;
  geoLocation: any;
  currentUser: any;
  userType: string;
  subscription: Subscription;

  statesList: any[];
  languagesList: any[];
  yearsList: any[];
  positionList: any[];
  public options = { types: ['address'], componentRestrictions: { country: 'US' } }
  
  licenseRequired: Boolean = false;
  newImageUploaded: Boolean = false;
  specialityList = [
    { "name": "General Dentistry" },
    { "name": "Endodontist" },
    { "name": "Orthodontist" },
    { "name": "Oral Surgeon" },
    { "name": "Pedodontist" },
    { "name": "Periodontist" },
  ]

  getAddress(event) {
    this.geoLocation = this.shuffleGoogleMapsAddress(event);
    let streetNumber = (this.geoLocation.addr_num) ? this.geoLocation.addr_num : '';
    let streetName = (this.geoLocation.addr) ? this.geoLocation.addr : '';
    let location = (this.geoLocation.location) ? this.geoLocation.location : '';
    let neighborhood = (this.geoLocation.neighborhood) ? this.geoLocation.neighborhood : '';
    let city = (this.geoLocation.city) ? this.geoLocation.city : '';
    let state = (this.geoLocation.state) ? this.geoLocation.state : '';
    let zip = (this.geoLocation.zip) ? this.geoLocation.zip : '';
    this.ngzone.run(() => {
      this.user.Address_street = streetNumber + ', ' + streetName;
      this.user.Address_Unit = location + ', ' + neighborhood
      this.user.City = this.geoLocation.city;
      this.user.State = this.geoLocation.state;
      this.user.Zip_Code = this.geoLocation.zip;
      this.user.locationLat = this.geoLocation.lat;
      this.user.locationLng = this.geoLocation.lng;
    })
  }

  constructor(
    private jsonLoaderService: JsonLoaderService,
    private router: Router,
    private userService: UserService,
    private notificationsService: NotificationsService,
    private ngzone: NgZone,
    private loaderService: LoaderService

  ) {
    this.user = {
      Firstname: "",
      Lastname: "",
      Email_Address: "",
      Address_street: "",
      Address_Unit: "",
      City: "",
      Phone1: undefined,
      Phone2: undefined,
      State: "",
      Zip_Code: undefined,
      Hourly_Pay: undefined,
      Travel_Distance: undefined,
      Experience: undefined,
      Position: "",
      Practice_Name: "",
      Speciality: "",
      Practice_Phone: undefined,
      Nr_of_Operations: undefined,
      Nr_of_Staff: undefined,
      Languages: "",
      Dental_School: "",
      Year_Graduated: undefined,
      License_Nr: "",
      Years_in_Practice: 5,
      Contact_Person: "",
      Contact_Phone_Nr: undefined,
      image: ""
    }

    this.subscription = userService.currentUser.subscribe(user => {
      this.isUserDataEdit = user.personalInfo;
      this.isWorkDataEdit = user.workInfo;
      this.currentUser = user;
      this.initUserData(user);
    });
  }

  initUserData(user){
    if(user.userType !== undefined) {
      this.userService.getData(user.Email_Address).subscribe(
        res =>{
          this.user = res.data;
          this.loaderService.display(false);          

        },
        err =>{
          this.loaderService.display(false);          
          this.notificationsService.error(
            err.title,
            err.error.message,
            environment.options
          )
        }
      )
    }
  }

  editUserData() {
    this.isUserDataEdit = !this.isUserDataEdit;
  }

  cancelUpdate() {
    this.isUserDataEdit = !this.isUserDataEdit;
  }

  onChange($event) {
    if ($event === 'Registered Dental Assistant' || $event === 'Registered Dental Assistant EF' || $event === 'Registered Dental Hygienist' || $event === 'Registered Dental Hygienist EF' || $event === 'General Dentist' || $event === 'Orthodontist' || $event === 'Endodontist' || $event === 'Periodontist' || $event === 'Pedodontist' || $event === 'Oral Surgeon') {
      this.licenseRequired = true;
    } else {
      this.licenseRequired = false;
    }
  }
  updateUserData(user) {
    this.loaderService.display(true);              
    this.userService.updatePersonal(this.user).subscribe(
      res => {
        this.loaderService.display(false);              
        this.notificationsService.success(
          'Success',
          res.message,
          environment.options
        )
        this.isUserDataEdit = !this.isUserDataEdit;
      },
      err => {
        this.loaderService.display(false);
        this.notificationsService.error(
          err.title,
          err.error.message,
          environment.options          
        )
      }
    )
  }

  editWorkData() {
    this.isWorkDataEdit = !this.isWorkDataEdit;
  }

  cancelWorkUpdate() {
    this.isWorkDataEdit = !this.isWorkDataEdit;
  }

  updateWorkData(user) {  
    this.loaderService.display(true); 
    this.userService.updateWork(this.user).subscribe(
      res => {
        this.loaderService.display(false); 
        this.notificationsService.success(
          'Success',
          res.message,
          environment.options          
        )
        this.isWorkDataEdit = !this.isWorkDataEdit;
      },
      err => {
        this.loaderService.display(false); 
        this.notificationsService.error(
          err.title,
          err.error.message,
          environment.options          
        )
      }
    )
  }


  ngOnInit() {

    this.jsonLoaderService.getStates()
      .subscribe(data => {
        this.statesList = data;
        // console.log(data);
      }, error => {
        console.log(error);
      });
    this.jsonLoaderService.getLanguages()
      .subscribe(data => {
        this.languagesList = data;
        // console.log(data);
      }, error => {
        console.log(error);
      });
    this.jsonLoaderService.getYears()
      .subscribe(data => {
        this.yearsList = data;
        // console.log(data); 
      }, error => {
        console.log(error);
      });
    this.jsonLoaderService.getPositions()
      .subscribe(data => {
        this.positionList = data;
      }, error => {
        console.log(error);
      });



  }
  changeListener($event): void {
    this.newImageUploaded = true;
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.user.image = myReader.result;
    }
    myReader.readAsDataURL(file);
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

}
