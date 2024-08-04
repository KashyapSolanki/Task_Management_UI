import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskReport, ReportRequest } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'https://localhost:44376/api/';

  getTeamTaskReport(request: ReportRequest): Observable<TaskReport[]> {
    return new Observable<TaskReport[]>((observer) => {
      fetch(`${this.apiUrl}GetTeamTaskReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
        .then(response => response.json())
        .then((data: TaskReport[]) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error('Error fetching team task report: ' + error));
    });
  }
}
