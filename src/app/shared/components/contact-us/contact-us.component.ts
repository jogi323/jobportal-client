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
    window['verifyCallback'] = this.verifyCallback.bind(this);
  }

  ngOnInit() {
  }
  displayRecaptcha(){
    var doc = <HTMLDivElement>document.getElementById('signup-form');
    var script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    doc.appendChild(script);
  }
  submit(){
  }
  verifyCallback(response){
    alert(response);
  }
}
export interface ContactusModel {
  FirstName: String;
  LastName: String;
  email: String;
  comments: String;
}
