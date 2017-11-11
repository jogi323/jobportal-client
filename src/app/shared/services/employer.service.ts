import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class EmployerService {
  itemsToHire : any;
  constructor(
    private apiService: ApiService,
  ) { 
    this.itemsToHire = [];
  }

  queryJobseekers(data){
    let path = 'availability/query'
    return this.apiService.post(path,data)
    .map(
      data => {
        return data;
      }
    )
  }

  makePayment(data){
    const route = 'payments/pay';
    return this.apiService.post(route,data).map( res =>{
      return res
    })
  }

  getTransactions(){
    const route = 'payments/';
    return this.apiService.get(route).map( res => {
      return res;
    })
  }

  setItemsToHire(id){
    this.itemsToHire.push(id);
  }

  removeItemToHire(id){
    this.itemsToHire.splice(id);
  }

}
