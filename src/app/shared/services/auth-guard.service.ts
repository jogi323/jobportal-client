import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private userService: UserService
  ) { }


    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //return this.userService.isAuthenticated.take(1);
    return this.userService.isAuthenticated.take(1).map(bool => {
      if (bool) {
        let role = this.userService.getCurrentUser().userType.toLocaleLowerCase();
        let currentUrl = state.url.toLowerCase().split('/')[1];
        
        if(role === currentUrl){
            return bool
        }else{
          this.router.navigate(['/']);
        }
        
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }
}
