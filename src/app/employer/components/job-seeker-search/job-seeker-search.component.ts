import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { JsonLoaderService } from '../../../shared/services/json-loader.service';
import { UserService } from '../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { EmployerService } from '../../../shared/services/employer.service';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-job-seeker-search',
  templateUrl: './job-seeker-search.component.html',
  styleUrls: ['./job-seeker-search.component.css']
})
export class JobSeekerSearchComponent implements OnInit {
  value: Date = new Date();
  minDate: any;
  currentUser: any;
  userType: string;
  subscription: Subscription;
  employerLocation: Location;
  itemsToHire: any;

  filterJobseekers: FilterJobseekers
  positionList: any[];
  jobseekers: any[];

  constructor(
    private jsonLoaderService: JsonLoaderService,
    private router: Router,
    private userService: UserService,
    private employerService: EmployerService,
    private _haversineService: HaversineService,
    private notificationsService: NotificationsService,
    private loaderService: LoaderService

  ) {
    let newDate = new Date()
    newDate.setUTCHours(0);
    newDate.setUTCMinutes(0);
    newDate.setUTCSeconds(0);
    newDate.setUTCMilliseconds(0);
    this.initializeFilterJobseeker();
    this.employerLocation = {
      lat: undefined,
      lng: undefined
    }
    this.subscription = userService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.initUserData(user);
    })
    this.itemsToHire = this.employerService.itemsToHire;
    this.jobseekers = [];
  }
  // Initialize Filter getJobseekers
  initializeFilterJobseeker() {
    let date = new Date();
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    this.filterJobseekers = {
      Date: date,
      Hours_Guaranteed: null,
      Position: '',
      pay_request: null,
      distance: null
    }
    this.getJobseekers(this.filterJobseekers);
  }
  // initialise employer data to use location lattitude and longitude
  initUserData(user) {
    this.loaderService.display(true);
    if (user.userType !== undefined) {
      this.userService.getData(user.Email_Address).subscribe(
        res => {
          this.employerLocation.lat = res.data.locationLat;
          this.employerLocation.lng = res.data.locationLng;
          this.loaderService.display(false);
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
  }

  selectToHire(id, event) {
    if (event.target.checked) {
      this.itemsToHire.push(id);
      this.employerService.setItemsToHire(id);
      //window.localStorage.setItem('itemsToHire',this.itemsToHire);
    }
    else if (!event.target.checked) {
      this.itemsToHire.splice(id);
      this.employerService.removeItemToHire(id)
      //window.localStorage.setItem('itemsToHire',this.itemsToHire);      
    }
  }

  //sets checkbox value for selected candidates
  getCheckboxValue(id) {
    let count = 0;
    for (let i = 0; i < this.itemsToHire.length; i++) {
      if (this.itemsToHire[i]._id == id) {
        count++;
      }
    }
    if (count > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit() {
    // this.tryHaversine(this.employerLocation);
    this.minDate = new Date();
    this.getJobseekers(this.filterJobseekers);
    this.userService.getPositions().subscribe(
      res => {
        this.positionList = res.data;
      }
    )
    
  }
  onDateChange(event) {
    event.setUTCHours(0);
    event.setUTCMinutes(0);
    event.setUTCSeconds(0);
    event.setUTCMilliseconds(0);
    this.filterJobseekers.Date = new Date(event.setDate(event.getDate() + 1));
    this.getJobseekers(this.filterJobseekers);
  }
  onHoursChange() {
    this.getJobseekers(this.filterJobseekers);
  }
  filterData() {
    if (this.filterJobseekers.Date || this.filterJobseekers.Hours_Guaranteed) {
      this.getJobseekers(this.filterJobseekers);
    } else {

    }
  }

  // get the initial list of job seekers with todays date as input
  getJobseekers(data) {
    this.loaderService.display(true);
    this.employerService.queryJobseekers(data).subscribe(
      res => {
        // this.jobseekers = res.data;
        this.jobseekers = [];
        this.calculateDistance(res.data);
        this.loaderService.display(false);
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

  // calculating Distance based on the lat and lng of employer and job seeker
  calculateDistance(jobseekers) {
    jobseekers.forEach(jobseeker => {
      if (jobseeker.JS_id.locationLat && jobseeker.JS_id.locationLng) {
        let jobseekerLocation = {
          lat: jobseeker.JS_id.locationLat,
          lng: jobseeker.JS_id.locationLng
        }
        jobseeker.Distance = this.tryHaversine(this.employerLocation, jobseekerLocation);
        if (jobseeker.Distance <= jobseeker.JS_id.Travel_Distance) {
          if(this.jobseekers.length>0){
            let count = 0;
            for (let i = 0; i < this.jobseekers.length; i++) {
              if (this.jobseekers[i]._id == jobseeker._id) {
                count++;
              }
            }
            if (count == 0) {
              this.jobseekers.push(jobseeker);
            }
          }
          else{
            this.jobseekers.push(jobseeker);       
          }
        }
      } else {
        jobseeker.Distance = 'undefined'
      }
    });
    // this.jobseekers = jobseekers
  }

  //api for distance calculation
  tryHaversine(employerLocation, jobseekerLocation) {
    let empLocation: GeoCoord = {
      latitude: employerLocation.lat,
      longitude: employerLocation.lng
    };
    let jsLocation: GeoCoord = {
      latitude: jobseekerLocation.lat,
      longitude: jobseekerLocation.lat
    };
    let miles = this._haversineService.getDistanceInMiles(empLocation, jsLocation);
    return miles
  }


}

interface FilterJobseekers {
  Date: Date;
  Hours_Guaranteed: number,
  Position: string,
  pay_request: any,
  distance: any
}

interface Location {
  lat: Number;
  lng: Number;
}
