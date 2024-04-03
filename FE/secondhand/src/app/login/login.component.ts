import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:8000/adminlogin', payload, { observe: 'response' })
      .subscribe(response => {
    
        if (response.status === 200) {
          
          this.router.navigate(['/dashboard/adreview']);

          // Save the received cookie in the browser
          const cookieHeader = response.headers.get('Set-Cookie');
          if (cookieHeader) {
            document.cookie = cookieHeader;
          }
        } else {
         
          this.error = 'Invalid credentials. Please try again.';
        }
      }, error => {
        console.error('Error logging in:', error);
        this.error = 'An error occurred while logging in. Please try again later.';
      });
  }
}
