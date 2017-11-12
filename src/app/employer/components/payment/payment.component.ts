import { Component, OnInit } from '@angular/core';

import { JsonLoaderService } from '../../../shared/services/json-loader.service';
import { EmployerService } from '../../../shared/services/employer.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  statesList: any[];
  cardNumber:number;
  cardType:string;
  payment:any;
  constructor(
    private jsonLoaderService: JsonLoaderService,
    public employerservice : EmployerService
  ) { 
    this.cardNumber = null;
    this.cardType = '';
    this.initializePayment();
    //console.log(this.employerservice.itemsToHire);
   }
   initializePayment(){
    this.payment = {
      Card_Nr : null,
      Billing_Name : '',
      Expiration_Month : null,
      Expiration_Year : null,
      City :'',
      State : '',
      Zip_Code : null,
      Amount : 2000,
      Position_id : ''
    }
   }
  ngOnInit() {
    this.jsonLoaderService.getStates()
      .subscribe(data => {
        this.statesList = data;
      }, error => {
      });
  }
  GetCardType(number) {
    // visa
    var re = new RegExp("^4");
    if (String(number).match(re) != null)
      this.cardType = "Visa";

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
      this.cardType = "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (String(number).match(re) != null)
      this.cardType = "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (String(number).match(re) != null)
      this.cardType = "Discover";

    // Diners
    // re = new RegExp("^36");
    // if (String(number).match(re) != null)
    //   this.cardType = "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (String(number).match(re) != null)
      this.cardType = "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (String(number).match(re) != null)
      this.cardType = "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (String(number).match(re) != null)
      this.cardType = "Visa Electron";

    if(!this.cardType){
      this.cardType = "wrong number";
    }
  }

  //payment method
  makePayment(){
    this.employerservice.makePayment(this.payment).subscribe( res =>{
      if(res.message == 'Payment Sucessfull'){
        this.initializePayment();
        this.releaseOffer();
      }
    })
  }
  releaseOffer(){
    this.employerservice.postOffer().subscribe( res =>{
      console.log(res);
    })
  }
}
