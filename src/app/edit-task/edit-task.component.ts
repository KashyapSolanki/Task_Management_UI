import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  task: any = {};
  userType: number = 0; // Define user type property
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskId = +params.get('id')!;
      this.userType = parseInt(localStorage.getItem('userType') || '0', 10);
      this.loadTask(taskId);
    });
  }

  loadTask(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe(task => {
      this.task = task;
      this.task.dueDate = this.formatDateForInput(this.task.dueDate);
    });
  }

  // Convert ISO date format to YYYY-MM-DD for the input field
  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset() * 60000; // timezone offset in milliseconds
    const localDate = new Date(date.getTime() - offset); // adjust date to local timezone
    return localDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
  }

  updateTask(): void {
    const formData = new FormData();

    let dueDate: string;
    if (this.task.dueDate instanceof Date) {
        dueDate = this.task.dueDate.toISOString();
    } else if (typeof this.task.dueDate === 'string') {
        const parsedDate = new Date(this.task.dueDate);
        dueDate = parsedDate.toISOString();
    } else {
        dueDate = new Date().toISOString();
    }

    formData.append('id', this.task.id);
    formData.append('title', this.task.title);
    formData.append('description', this.task.description || '');
    formData.append('dueDate', dueDate);
    formData.append('isCompleted', this.task.isCompleted);
    formData.append('notes', this.task.notes || '');
    formData.append('employeeId', this.task.employeeId);
    formData.append('teamLeaderId', this.task.teamLeaderId);

    // Append file if exists
    const fileInput = document.getElementById('documents') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append('documents', fileInput.files[0]);
    }

    this.taskService.updateTask(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Error updating task', error);
      }
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}