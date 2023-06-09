import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMessage : string = ''
  
  checkoutForm = this.formBuilder.group({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  
 

  
  onSubmit() : void {
    const {password, confirmPassword, email} = this.checkoutForm.value
    console.log({password, confirmPassword, email});
    if(password === confirmPassword) {
      const user = {
        password,
        email
      }
      this.authService.registerUser(user).subscribe(user => {
        this.router.navigate(['/login']);
      })
      this.checkoutForm.reset();
    } else {
      this.errorMessage = 'Passwords does not match'
    }
  }
}
