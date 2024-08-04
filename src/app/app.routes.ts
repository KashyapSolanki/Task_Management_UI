import { Routes  } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'tasks', component: TaskListComponent },
    { path: 'tasks/edit/:id', component: EditTaskComponent },
    { path: 'report', component: ReportComponent },
    { path: '**', redirectTo: '/tasks' } 
];