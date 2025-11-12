import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task-service';
import { UserService } from '../../services/user-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss'], 
  imports: [FormsModule]
})
export class TaskForm {
  title = '';
  description = '';

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) { }

  save() {
    const author = this.userService.getCurrent() || undefined;
    this.taskService.add({ title: this.title, description: this.description, author });
    this.router.navigateByUrl('/tasks');
  }

  cancel() {
    this.router.navigateByUrl('/tasks');
  }
}