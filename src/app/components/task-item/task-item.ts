import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.scss']
})
export class TaskItem {
  @Input() task!: Task;
  @Output() markDone = new EventEmitter<string>();

  onMarkDone() {
    this.markDone.emit(this.task.id);
  }
}