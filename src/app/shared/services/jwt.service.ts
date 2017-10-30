import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  constructor() { }

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String,userType:String) {
    window.localStorage['jwtToken'] = token;
    window.localStorage['userType'] = userType;
    
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('userType');
  }
}
