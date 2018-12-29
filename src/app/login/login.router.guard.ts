import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class LoginRouteGuard implements CanActivate {
  constructor(private service: SharedService, private router: Router) {}
  canActivate() {
    if(this.service.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);    // redirect to login page for example
      return false;
    }
  }
}