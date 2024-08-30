import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  successMessage: string = '';
  userType: number = 0;
  fullName: string | null = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userType = parseInt(localStorage.getItem('userType') || '0', 10);
    this.fullName = localStorage.getItem('fullName');
    this.loadTasks();
  }

  loadTasks(): void {
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    if (userType && userId) {
      this.taskService.getTasks(parseInt(userType, 10), parseInt(userId, 10)).subscribe(data => {
        this.tasks = data;
      });
    }
  }

  deleteTask(taskId: number | undefined): void {
    if (taskId !== undefined) {
      this.taskService.deleteTask(taskId!).subscribe(() => {
        this.successMessage = 'Task deleted successfully';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000); // Clear this success message after 3 seconds
        this.loadTasks();
      });
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}