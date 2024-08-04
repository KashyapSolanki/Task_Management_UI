import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../services/report.service';
import { TaskReport, ReportRequest } from '../models/report.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  reportRequest: ReportRequest = { startDate: '', endDate: '' };
  taskReports: TaskReport[] = [];

  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit(): void {
    const userType = localStorage.getItem('userType');
    var UserType = parseInt(userType!, 10);
    if (UserType === 3) {
      this.reportRequest.startDate = new Date().toISOString().split('T')[0]; // Current date as start date
      this.reportRequest.endDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]; // 7 days later as end date

      this.getTeamTaskReport();
    } else {
      this.router.navigate(['/tasks']);
    }
  }

  getTeamTaskReport(): void {
    this.reportService.getTeamTaskReport(this.reportRequest).subscribe({
      next: (reports) => {
        this.taskReports = reports;
      },
      error: (err) => {
        console.error('Failed to fetch reports', err);
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
