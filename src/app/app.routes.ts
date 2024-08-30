import { Routes  } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuardService] },
    { path: 'tasks/edit/:id', component: EditTaskComponent, canActivate: [AuthGuardService]  },
    { path: 'report', component: ReportComponent, canActivate: [AuthGuardService]  }
];