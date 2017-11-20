import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-accept-jobseeker',
  templateUrl: './accept-jobseeker.component.html',
  styleUrls: ['./accept-jobseeker.component.css']
})
export class AcceptJobseekerComponent implements OnInit {

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
     this.userService.acceptJobseeker(this.id).subscribe(res => {
      this.success = res.message;
     },
     err => {
      this.error = err;
     }); 
  }

  ngOnInit() {
  }

}
