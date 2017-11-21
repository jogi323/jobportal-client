import { Component,OnInit } from '@angular/core';

import { UserService } from './shared/services/user.service';
import { LoaderService } from './shared/services/loader.service';

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
  showLoader: boolean;
  constructor(private userService: UserService,private loaderService: LoaderService){
    this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
    });
  }
  public optionsBottom = {
    position: ["bottom", "left"],
    timeOut: 0,
    lastOnBottom: true,
    showProgressBar:false,
    clickToClose:false
}
  ngOnInit(){
    this.userService.populate();
  }


}
