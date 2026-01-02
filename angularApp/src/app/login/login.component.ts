import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';
  isSubmitting = false;
  isSignupMode = false;
  private apiUrl = 'http://localhost:3000';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleMode() {
    this.isSignupMode = !this.isSignupMode;
    this.errorMessage = '';
    this.loginForm.reset();
    
    if (this.isSignupMode) {
      this.loginForm.get('name')?.setValidators([Validators.required]);
    } else {
      this.loginForm.get('name')?.clearValidators();
    }
    this.loginForm.get('name')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { name, email, password } = this.loginForm.value;

    if (this.isSignupMode) {
      this.signup(name, email, password);
    } else {
      this.login(email, password);
    }
  }

  login(email: string, password: string) {
    this.http.post<{ token: string; user?: any }>(`${this.apiUrl}/users/login`, { email, password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  signup(name: string, email: string, password: string) {
    this.http.post<{ new_user: any }>(`${this.apiUrl}/users/register`, { name, email, password }).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.isSignupMode = false;
        this.loginForm.reset();
        this.isSubmitting = false;
        alert('Account created successfully! Please log in.');
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
