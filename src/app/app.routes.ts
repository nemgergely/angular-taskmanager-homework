import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'tasks', component: TaskList },
  { path: 'tasks/new', component: TaskForm },
  { path: '**', redirectTo: '/tasks' }
];
