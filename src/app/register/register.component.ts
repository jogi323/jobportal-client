import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employee:employeeRegister;
  selectedUserType:boolean=false;

  userType:string = '';
  
  constructor() { 
    this.employee = {
      reference: '',
      FirstName: '',
      LastName: '',
      email: '',
      Password: '',
      check: true
    }
  }

  ngOnInit() {
  }

  selectedUser(userType){
    this.userType = userType;
    this.selectedUserType = true;
  }
  goBack(){
    this.selectedUserType = false;
  }

}
export interface employeeRegister {
  reference: String;
  FirstName: String;
  LastName: String;
  email: String;
  Password: String;
  check: boolean;
}