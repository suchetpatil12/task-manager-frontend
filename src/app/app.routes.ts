import { Routes } from '@angular/router';


import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
    {
  path: '',
  redirectTo: 'auth',
  pathMatch: 'full'
},

  { path: 'auth', component:AuthComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'projects', component: ProjectsComponent },

  // 🔥 dynamic project id
  { path: 'tasks/:projectId', component: TasksComponent },
  {
  path: 'create-project',
  component: CreateProjectComponent
},
{
  path: 'create-task/:projectId',
  component: CreateTaskComponent
},
{
  path: 'edit-task/:id',
  component: EditTaskComponent
},
];