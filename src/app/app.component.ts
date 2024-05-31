import { Component } from '@angular/core';
import { HardcodedAuthenticationService } from './service/hardcoded-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amazing-animal-paintings';
  constructor(protected hardcodedAuthenticationService : HardcodedAuthenticationService){}
}
