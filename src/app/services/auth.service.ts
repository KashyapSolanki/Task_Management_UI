import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44376/api/';

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}login`;
    return new Observable<any>((observer) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          observer.next(data);
          observer.complete();
        } else {
          observer.error('Failed to login');
        }
      })
      .catch(error => observer.error('Error fetching tasks: ' + error));
    });
  }
}