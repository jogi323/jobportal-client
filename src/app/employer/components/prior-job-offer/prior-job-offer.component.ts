import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../../shared/services/employer.service';

@Component({
  selector: 'app-prior-job-offer',
  templateUrl: './prior-job-offer.component.html',
  styleUrls: ['./prior-job-offer.component.css']
})
export class PriorJobOfferComponent implements OnInit {

  constructor(private employerService : EmployerService) { }

  ngOnInit() {
    this.employerService.getOffers().subscribe( res =>{
      console.log(res);
    })
  }

}
