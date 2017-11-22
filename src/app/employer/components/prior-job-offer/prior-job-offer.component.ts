import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../../shared/services/employer.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-prior-job-offer',
  templateUrl: './prior-job-offer.component.html',
  styleUrls: ['./prior-job-offer.component.css']
})
export class PriorJobOfferComponent implements OnInit {
  offers:any[];
  constructor(private employerService : EmployerService,private notificationsService: NotificationsService,    private loaderService: LoaderService) {
      this.loaderService.display(true);
    this.employerService.getOffers().subscribe( res =>{
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
