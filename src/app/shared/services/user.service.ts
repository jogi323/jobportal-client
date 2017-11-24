import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

import { User } from '../models/user.model';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('user/auth')
        .subscribe(
        data => {
          this.setAuth(data)
        },
        err => {
          this.purgeAuth()
        }
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(data) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(data.token);
    // Set current user data into observable
    this.currentUserSubject.next(data.user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials): Observable<any> {
    const route = 'user/auth'
    return this.apiService.post(route, credentials)
      .map(
      data => {
          if(data.user){
            this.setAuth(data);
            return data.user;
          }else{
            return data;
          }
      },
      err => {
        return err;
      }
      )
  }

  registerUser(details): Observable<any> {
    const route = 'user/save'
    return this.apiService.post(route, details)
      .map(
      data => {
        return data;
      }
      )
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  updatePersonal(data) {
    let path = 'user/update/personal'
    return this.apiService.put(path, data)
      .map(
      data => {
        return data;
      }
      )
  }

  updateWork(data) {
    let path = 'user/update/work'
    return this.apiService.put(path, data)
      .map(
      data => {
        return data;
      }
      )
  }

  getData(id) {
    let path = 'user/getProfile/' + id
    return this.apiService.get(path)
      .map(
      data => {
        return data;
      }
      )
  }

  forgotPassword(data) {
    let path = 'user/resetpasswordlink';
    return this.apiService.post(path, data).
      map(
      data => {
        return data;
      }
      )
  }
  changePassword(data) {
    let path = 'user/resetpassword';
    return this.apiService.post(path, data).
      map(
      data => {
        return data;
      },
      err => {
        return err;
      }
      )
  }

  activateUser(id) {
    let path = 'user/confirmation/' + id;
    return this.apiService.get(path).
      map(
      data => {
        return data;
      },
      err => {
        return err;
      }
      )
  }

  contactus(data) {
    let url = 'user/contactus';
    return this.apiService.post(url, data).map(res => {
      return res;
    });
  }
  resetPassword(data) {
    let url = "user/changepassword";
    return this.apiService.put(url, data).map(res => {
      return res;
    },err => {
      return err;
    });
  }

  acceptOffer(id) {
    let url = 'offers/accept/' + id;
    return this.apiService.get(url).map(res => {
      return res;
    });
  }

  rejectOffer(id) {
    let url = 'offers/reject/' + id;
    return this.apiService.get(url).map(res => {
      return res;
    });
  }
  acceptJobseeker(id) {
    let url = 'offers/acceptjs/' + id;
    return this.apiService.get(url).map(res => {
      return res;
    });
  }
  rejectJobseeker(id) {
    let url = 'offers/rejectjs/' + id;
    return this.apiService.get(url).map(res => {
      return res;
    });
  }

  readyToWork(id) {
    let url = 'offers/rtw/' + id;
    return this.apiService.get(url).map(res => {
      return res;
    });
  }
  notReadyToWork(id) {
    let url = 'offers/nrtw/' + id;
    return this.apiService.get(url).map(res => {
      return res;
    });
  }

  getPositions() {
    let path = 'positions/all'
    return this.apiService.get(path)
      .map(data => {
          return data;
        })
  }
}
