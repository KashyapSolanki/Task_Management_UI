import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password';
  private authService = inject(AuthService);
  private router = inject(Router);

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        const userType = response.userType;
        const userId = response.userId;
        const fullName = response.fullName;
        localStorage.setItem('userType', userType);
        localStorage.setItem('userId', userId);
        localStorage.setItem('fullName', fullName);
        if (userType === 3) {
          this.router.navigate(['/report']);
        } else {
          this.router.navigate(['/tasks']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
