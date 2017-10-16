import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // employee:employeeRegister;
  selectedUserType:boolean=false;

  userType:string = '';
  
  constructor() { 
    // this.employee = {
    //   reference: '',
    //   FirstName: '',
    //   LastName: '',
    //   email: '',
    //   Password: '',
    //   check: true
    // }
  }

  ngOnInit() {
  }

  selectedUser(userType){
    this.userType = userType;
    this.selectedUserType = true;
  }

}
// export interface employeeRegister {
//   reference: String;
//   FirstName: String;
//   LastName: String;
//   email: String;
//   Password: String;
//   check: boolean;
// }