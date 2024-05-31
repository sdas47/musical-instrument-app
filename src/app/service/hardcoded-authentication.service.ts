import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor(private router : Router) { }

  authenticate(username: string,password: string): boolean {
    if(username === 'Saikat' && password === '1234') {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return user!=null;
  }
}
