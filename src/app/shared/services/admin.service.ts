import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class AdminService {
  constructor(
    private apiService: ApiService,
    private http: Http
  ) { }

  getPositions() {
    let path = 'positions/all'
    return this.apiService.get(path)
      .map(
      data => {
        return data;
      })
  }

  savePosition(data) {
    let path = 'positions/save'
    return this.apiService.post(path,data)
      .map(
      data => {
        return data;
      })
  }

  updatePosition(data) {
    let path = 'positions/update'
    return this.apiService.put(path,data)
      .map(
      data => {
        return data;
      })
  }

  deletePosition(id) {
    let path = 'positions/delete/'+id
    return this.apiService.delete(path)
      .map(
      data => {
        return data;
      })
  }

  getAllUsers() {
    let path = 'user/getall'
    return this.apiService.get(path)
      .map(
      data => {
        return data;
      })
  }

  getAllUserDetails(id) {
    let path = 'user/getalldetails/'+id
    return this.apiService.get(path)
      .map(
      data => {
        return data;
      })
  }

  changeUserStatus(id) {
    let path = 'user/changestatus/'+id
    return this.apiService.put(path)
      .map(
      data => {
        return data;
      })
  }

}
