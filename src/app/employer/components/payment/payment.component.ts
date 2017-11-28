import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JsonLoaderService } from '../../../shared/services/json-loader.service';
import { EmployerService } from '../../../shared/services/employer.service';
import { UserService } from '../../../shared/services/user.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  statesList: any[];
  cardNumber: number;
  cardType: string;
  payment: any;
  constructor(
    private jsonLoaderService: JsonLoaderService,
    public employerservice: EmployerService,
    public userService: UserService,
    private loaderService: LoaderService,
    private notificationsService: NotificationsService,
    private route: Router
  ) {
    this.cardNumber = null;
    this.cardType = '';
    this.initializePayment();
    // this.getDefaultAddress();
    this.loaderService.display(true);
    this.jsonLoaderService.getStates()
      .subscribe(data => {
        this.statesList = data;
        this.loaderService.display(false);
      }, error => {
        this.loaderService.display(false);

      });
  }
  initializePayment() {
    this.payment = {
      Card_Nr: null,
      Billing_Name: '',
      Expiration_Month: null,
      Expiration_Year: null,
      street: '',
      City: '',
      State: '',
      Zip_Code: null,
      Amount: 10,
      Position_id: '',
      cvv: ''
    }
  }
  ngOnInit() {
    // this.loaderService.display(true);              
    // this.jsonLoaderService.getStates()
    //   .subscribe(data => {
    //     this.statesList = data;
    // this.loaderService.display(false);                  
    //   }, error => {
    // this.loaderService.display(false);          

    //   });
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

    if (!this.cardType) {
      this.cardType = "wrong number";
    }
  }

  //payment method
  makePayment() {
    this.loaderService.display(true);
    this.employerservice.makePayment(this.payment).subscribe(res => {
      if (res.message == 'Payment Sucessfull') {
        this.initializePayment();
        this.releaseOffer(res.data._id);
      }
    },
      err => {
        this.loaderService.display(false);
        this.notificationsService.error(
          err.tittle,
          err.error.message,
          environment.options
        )
      })
  }
  releaseOffer(paymentId) {
    this.employerservice.postOffer(paymentId).subscribe(res => {
      this.loaderService.display(false);
      this.notificationsService.success(
        'Sucess',
        res.message,
        environment.options
      )
      this.route.navigate(['/employer/search']);
      this.employerservice.itemsToHire = [];      
    },err=>{
      this.loaderService.display(false);
        this.notificationsService.error(
          err.tittle,
          err.error.message,
          environment.options
        )
    })
  }
  //default address function
  useMyAddress(event) {
    if (event.target.checked) {
      let user = this.userService.getCurrentUser();
      this.userService.getData(user.Email_Address).subscribe(res => {
        if (res) {
          this.payment.street = res["data"].Address_street;
          this.payment.City = res["data"].City;
          this.payment.State = res["data"].State;
          this.payment.Zip_Code = res["data"].Zip_Code;
        }
      })
    }
    else if (!event.target.checked) {
      this.payment.street = '';
      this.payment.City = '';
      this.payment.State = '';
      this.payment.Zip_Code = '';
    }
  }
}
