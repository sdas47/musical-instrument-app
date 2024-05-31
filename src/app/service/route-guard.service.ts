import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, Router, RouterStateSnapshot } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService{

  constructor(private hardcodedAuthenticationService : HardcodedAuthenticationService,
              public router : Router) { }

    
}
export const authGuard : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if(inject(BasicAuthenticationService).isUserLoggedIn()) {
    return true;
  }
  inject(RouteGuardService).router.navigate(['/login']);
  return false;    
}
