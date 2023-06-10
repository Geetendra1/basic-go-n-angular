import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './type';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
    ) { }

    
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      console.log('message',message);
    } 
    

    setToken(token: string): void {
      this.cookieService.set('go-token',  token ? token : '');
    }
  
    getToken(): string | null {
      console.log('this.cookieService',this.cookieService.get('go-token'));
      return  this.cookieService.get('go-token')
    }
  
    isLoggedIn() {
      console.log('this.getToken()',this.getToken());
      if (this.getToken() && this.getToken() !== null) {
          return true
      } else {
          return false
      }   
    
    }
  
    logout() {
      this.cookieService.delete('go-token')
      this.router.navigate(['login']);
    }

    registerUser(user: User) : Observable<User> {
      console.log('register service hits', user);
      
      return this.http.post<User>('http://localhost:8000/signup', user, this.httpOptions).pipe(
        tap((newUser: User) => this.log(`added hero w/ id=${newUser}`)),
        catchError(error => {
          throw error
        })
      );
    }

    loginUser(user:User) : Observable<User> {
      console.log('login service hits', user);
      return this.http.post<User>('http://localhost:8000/signin', user, this.httpOptions).pipe(
        tap((user) => this.log(`added hero w/ id=${user.email}`)),
        catchError(error => {
          throw error
        })
      );
    }
    
}
