import { Component, OnInit } from '@angular/core';

import { JsonLoaderService } from '../../../shared/services/json-loader.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  statesList:any[];

  constructor(
    private jsonLoaderService:JsonLoaderService
  ) { }

  ngOnInit() {
    this.jsonLoaderService.getStates()
                          .subscribe(data => {
                            this.statesList = data;
                          }, error => {
                            console.log(error);
                          });
  }



}
