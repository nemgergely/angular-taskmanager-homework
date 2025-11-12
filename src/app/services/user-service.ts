import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEYS } from '../constants';

@Injectable(
  { providedIn: 'root' }
)
export class UserService {
  private _user$ = new BehaviorSubject<string | null>(null);
  user$ = this._user$.asObservable();

  constructor() {
    const name = localStorage.getItem(STORAGE_KEYS.USER);
    if (name) this._user$.next(name);
  }

  login(username: string) {
    this._user$.next(username);
    localStorage.setItem(STORAGE_KEYS.USER, username);
  }

  logout() {
    this._user$.next(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  getCurrent() {
    return this._user$.value;
  }
}