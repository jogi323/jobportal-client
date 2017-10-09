import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedUserType:boolean=false;

  userType:string = '';
  
  constructor() { }

  ngOnInit() {
  }

  selectedUser(userType){
    this.userType = userType;
    this.selectedUserType = true;
  }

}
