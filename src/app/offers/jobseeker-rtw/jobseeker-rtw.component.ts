import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-jobseeker-rtw',
  templateUrl: './jobseeker-rtw.component.html',
  styleUrls: ['./jobseeker-rtw.component.css']
})
export class JobseekerRtwComponent implements OnInit {

  id: String;
  success: String;
  error: Object;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: LoaderService

  ) {
    this.loader.display(true);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.userService.readyToWork(this.id).subscribe(res => {
      this.loader.display(false);
      this.success = res.message;
    },
      err => {
        this.loader.display(false);
        this.error = err;
      });
  }

  ngOnInit() {
  }

}
