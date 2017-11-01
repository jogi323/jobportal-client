import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from './user.service';

@Injectable()
export class NoAuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.take(1).map(bool => {
      if (bool) {
         let role = this.userService.getCurrentUser().userType.toLocaleLowerCase();
         this.router.navigate([role]);
        
        //this.router.navigate(['/dashboard']);
      }
      return !bool;
    });
  }
}
