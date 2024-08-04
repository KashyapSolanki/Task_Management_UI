import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://localhost:44376/api/';

  getTasks(employeeType: number | 0, userId: number | 0): Observable<Task[]> {
    const url = `${this.apiUrl}GetAllTasks?employeeType=${employeeType}&userId=${userId}`;
    return new Observable<Task[]>((observer) => {
      fetch(url)
        .then(response => response.json())
        .then((data: Task[]) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error('Error fetching tasks: ' + error));
    });
  }

  getTaskById(id: number): Observable<Task> {
    return new Observable<Task>((observer) => {
      fetch(`${this.apiUrl}GetTaskById/${id}`)
        .then(response => response.json())
        .then((data: Task) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error('Error fetching task by id: ' + error));
    });
  }

  addTask(task: Task): Observable<Task> {
    return new Observable<Task>((observer) => {
      fetch(this.apiUrl + 'CreateTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
        .then(response => response.json())
        .then((data: Task) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error('Error adding task: ' + error));
    });
  }

  updateTask(formData: FormData): Observable<void> {
    return new Observable<void>((observer) => {
      fetch(`${this.apiUrl}UpdateTask`, {
        method: 'PUT',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            observer.next();
            observer.complete();
          } else {
            response.text().then(errorMessage => observer.error('Failed to update task: ' + errorMessage));
          }
        })
        .catch(error => observer.error('Error updating task: ' + error));
    });
  }

  deleteTask(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      fetch(`${this.apiUrl}DeleteTask/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            observer.next();
            observer.complete();
          } else {
            observer.error('Failed to delete task');
          }
        })
        .catch(error => observer.error('Error deleting task: ' + error));
    });
  }
}
