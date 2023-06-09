import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage : string = ''
  
  checkoutForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  
  onSubmit() : void {
    const {password, email} = this.checkoutForm.value
    const user = {
      password,
      email
    }
    this.authService.loginUser(user).subscribe(
    response => {
      console.log('response', response);
      this.cookieService.set('go-token',  response.token ? response.token : '');
      this.router.navigate(['/']);
      this.checkoutForm.reset();
    },
    error => {
      this.errorMessage = error.error.error
    }
    
    )
  }
}
