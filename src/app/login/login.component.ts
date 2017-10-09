import { Component, OnInit } from '@angular/core';

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  extends DialogComponent<ConfirmModel, boolean> implements OnInit, ConfirmModel {
  
  title: string;
  message: string;
  isLogin: boolean = true;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }

  forgotPassword(){
    this.isLogin = false;
  }

  ngOnInit(){
    
  }
}

export interface ConfirmModel {
  title:string;
  message:string;
}

