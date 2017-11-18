import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../shared/services/loader.service';
import { JobseekerService } from '../../../shared/services/jobseeker.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {
  offers: any[];
  constructor(
    private notificationsService: NotificationsService,
    private loaderService: LoaderService,
    private jobseekerService: JobseekerService
  ) { 
    this.loaderService.display(true);
    this.jobseekerService.getOffers().subscribe(res => {
      this.offers = res.data;
      this.loaderService.display(false);
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

  ngOnInit() {
    
  }

}
