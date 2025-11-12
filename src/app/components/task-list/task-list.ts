import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { UserService } from '../../services/user-service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { TaskItem } from "../task-item/task-item";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss'],
  imports: [TaskItem]
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  user: string | null = null;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getAll();
    this.taskService.tasks$.subscribe(ts => this.tasks = ts);
    this.user = this.userService.getCurrent();
  }

  onNew() {
    this.router.navigateByUrl('/tasks/new');
  }

  markDone(id: string) {
    this.taskService.markDone(id);
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  tologinPage() {
    this.router.navigateByUrl('/login');
  }
}