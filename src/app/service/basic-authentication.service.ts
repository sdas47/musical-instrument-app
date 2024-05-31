import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private router : Router,
              private http : HttpClient) { }

  executeAuthenticationService(username: string, password: string) {
    let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':' + password)
    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    })
    return this.http.get<BasicAuthenticationBean>(`http://localhost:8080/basicauth`, 
                                {headers}).pipe(
                                  map(
                                    data => {
                                      sessionStorage.setItem('authenticatedUser',username);
                                      sessionStorage.setItem('authToken',basicAuthHeaderString);
                                      return data;
                                    }
                                  )
                                )
  }



  executeJWTAuthenticationService(username: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/authenticate` ,{
      username,
      password
    }).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticatedUser',username);
          sessionStorage.setItem('authToken',`Bearer ${data.token}`);
          return data;
        }
      )
    )
                                
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return user!=null;
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatedUser')
  }
  getAuthenticatedToken():string {
    if(this.getAuthenticatedUser()) {
      let token : string = sessionStorage.getItem('authToken') || '{}';
      return token;
    }
    return ""
  }

  
}

export class BasicAuthenticationBean {
  constructor(public message : string ){}
}
