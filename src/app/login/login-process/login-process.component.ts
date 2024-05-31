import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../../service/basic-authentication.service';

@Component({
  selector: 'app-login-process',
  templateUrl: './login-process.component.html',
  styleUrl: './login-process.component.css',
})
export class LoginProcessComponent implements OnInit{

  loginForm : FormGroup = new FormGroup({});
  validateCreds : boolean = true;

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private basicAuthenticationService : BasicAuthenticationService
  ) {}


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.loginForm.valid) {
      let username = this.loginForm.get('username')?.value;
      let password = this.loginForm.get('password')?.value;      
      this.basicAuthenticationService.executeJWTAuthenticationService(username,password)
                                     .subscribe({
                                      next : () => {
                                        this.router.navigate(['/instruments'])
                                     }, 
                                     error : () => {                                        
                                        this.validateCreds = false 
                                     }
                                    })
      }
    }
    
  }


