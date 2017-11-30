import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class JobseekerService {
  events:any;
  constructor(public apiservice : ApiService) { 

  }

  getJobSchedules(){
    const url = 'availability/all';
    return this.apiservice.get(url).map( res =>{
       return res;
    })
  }

  postJobSchedules(data){
    const url = 'availability/save';
    return this.apiservice.post(url, data).map( res => {
      return res;
    })
  }

  deleteScheduledJob(id){
    const url = 'availability/delete/'+id;
    return this.apiservice.delete(url).map( res => {
      return res;
    })
  }
  sendOtp(email,data) {
    const url = 'user/sendotp/'+email;
    return this.apiservice.post(url,data).map(res => {
      return res;
    })
  }

  verifyOtp(param,payload) {
    const url = 'user/verifyOtp/'+param;
    return this.apiservice.post(url,payload).map(res => {
      return res;
    });
  }

   //get offer method
  getOffers(){
    const route = 'offers/jobseeker';
    return this.apiservice.get(route).map( res =>{
      return res;
    })
  }

}
