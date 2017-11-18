import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { environment } from '../../environments/environment';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {
  id: String;

  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
      });
      
      if(this.id) {
        this.userService.activateUser(this.id).subscribe(
          res=> {
            this.notificationsService.success(
                'Success',
                 res.message,
                 environment.options
            );
            this.router.navigate(['']);
          },
          err => {
            this.notificationsService.error(
            err.title,
            err.error.message,
            environment.options
          )
            this.router.navigate(['']);
          }
        )
      }
  }

}
