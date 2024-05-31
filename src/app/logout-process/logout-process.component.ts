import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-process',
  templateUrl: './logout-process.component.html',
  styleUrl: './logout-process.component.css'
})
export class LogoutProcessComponent implements OnInit{

  constructor(private hardcodedAuthenticationService : HardcodedAuthenticationService,
              private router : Router) {}

  ngOnInit(): void {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

}
