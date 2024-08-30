import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    if (userType && userId) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
