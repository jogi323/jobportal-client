import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-decline-offer',
  templateUrl: './decline-offer.component.html',
  styleUrls: ['./decline-offer.component.css']
})
export class DeclineOfferComponent implements OnInit {

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
     this.userService.rejectOffer(this.id).subscribe(res => {
      this.success = res.message;
     },
     err => {
      this.error = err;
     }); 
  }

  ngOnInit() {
  }

}
