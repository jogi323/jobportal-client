import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-accept-offer',
  templateUrl: './accept-offer.component.html',
  styleUrls: ['./accept-offer.component.css'],
})
export class AcceptOfferComponent implements OnInit {
    id: String;
    success: String;
    error: Object;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
      });
     this.userService.acceptOffer(this.id).subscribe(res => {
      this.success = res.message;
     },
     err => {
      this.error = err;
     }); 
  }

  ngOnInit() {

  }

}