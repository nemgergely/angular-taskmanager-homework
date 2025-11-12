import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe(
  { name: 'taskDisplay' }
)
export class TaskDisplayPipe implements PipeTransform {
  transform(task: Task): string {
    const author = task.author ? ' — ${task.author}' : '';
    const status = task.done ? ' (Kész)' : '';
    return task.title + author + '\n' + task.description + status;
  }
}