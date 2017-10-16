import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  data:ContactusModel;
  constructor() { 
    this.data = {
      FirstName:'',
      LastName:'',
      email:'',
      comments:'',
    }
  }

  ngOnInit() {
  }
  submit(){
    console.log(this.data);
  }
}
export interface ContactusModel {
  FirstName: String;
  LastName: String;
  email: String;
  comments: String;
}
