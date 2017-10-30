import { Component,OnInit } from '@angular/core';

import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   public options = {
      position: ["top", "right"],
      timeOut: 5000,
      lastOnBottom: true,
  };
  constructor(private userService: UserService){
  }

  ngOnInit(){
    this.userService.populate();
  }

}
