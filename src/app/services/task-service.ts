import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { STORAGE_KEYS } from '../constants';

@Injectable(
  { providedIn: 'root' }
)
export class TaskService {
  private _tasks$ = new BehaviorSubject<Task[]>([]);
  tasks$ = this._tasks$.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (raw) {
      try {
        const parsed: Task[] = JSON.parse(raw);
        this._tasks$.next(parsed);
      } catch (e) {
        console.error('Hiba a localStorage beolvasásakor', e);
        this._tasks$.next([]);
      }
    } else {
      this._tasks$.next([]);
    }
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this._tasks$.value));
  }

  getAll(): Task[] {
    return [...this._tasks$.value];
  }

  add(task: Partial<Task>) {
    const newTask: Task = {
      id: String(Date.now()),
      title: task.title || 'Névtelen',
      description: task.description || '',
      done: false,
      author: task.author
    };
    const updated = [newTask, ...this._tasks$.value];
    this._tasks$.next(updated);
    this.saveToStorage();
  }

  markDone(id: string) {
    const updated = this._tasks$.value.map(t => t.id === id ? { ...t, done: true } : t);
    this._tasks$.next(updated);
    this.saveToStorage();
  }

  // opcionális: restore/undo
  toggleDone(id: string) {
    const updated = this._tasks$.value.map(t => t.id === id ? { ...t, done: !t.done } : t);
    this._tasks$.next(updated);
    this.saveToStorage();
  }

  clearAll() {
    this._tasks$.next([]);
    this.saveToStorage();
  }
}