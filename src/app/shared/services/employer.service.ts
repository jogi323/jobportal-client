import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class EmployerService {
  itemsToHire: any;
  constructor(
    private apiService: ApiService,
  ) {
    this.itemsToHire = [];
  }

  queryJobseekers(data) {
    let path = 'availability/query'
    return this.apiService.post(path, data)
      .map(
      data => {
        return data;
      }
      )
  }

  makePayment(data) {
    const route = 'payments/pay';
    return this.apiService.post(route, data).map(res => {
      return res
    })
  }

  getTransactions() {
    const route = 'payments/history';
    return this.apiService.get(route).map(res => {
      return res;
    })
  }

  setItemsToHire(id) {
    if(this.itemsToHire.length>0){
      let count = 0;
      for (let i = 0; i < this.itemsToHire.length; i++) {
        if (this.itemsToHire[i]._id == id._id) {
          count++;
        }
      }
      if(count==0){
        this.itemsToHire.push(id);      
      }
    }
    else{
      this.itemsToHire.push(id);
    }
  }

  removeItemToHire(id) {
    if(this.itemsToHire.length>0){
      for (let i = 0; i < this.itemsToHire.length; i++) {
        if (this.itemsToHire[i]._id == id._id) {
          this.itemsToHire.splice(id,1);
        }
      }
    }
    else{
      this.itemsToHire.splice(id,1);
    }
  }

  //post offer method
  postOffer(paymentId){
    const route = 'offers/save';
    var data = {
      paymentId : paymentId,
      availabilities: this.itemsToHire
    }
    return this.apiService.post(route, data).map( res => {
      return res;
    })
  }

  //get offer method
  getOffers(){
    const route = 'offers/employer';
    return this.apiService.get(route).map( res =>{
      return res;
    })
  }

  // get profile information
  getProfile(email){
    const route = 'user/getProfile/'+email;
    return this.apiService.get(route).map( res =>{
      return res;
    })
  }

}
