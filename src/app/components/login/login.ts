import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'], 
  imports: [FormsModule]
})
export class Login {
  username = '';

  constructor(private userService: UserService, private router: Router) { }

  login() {
    if (!this.username) return;
    this.userService.login(this.username);
    this.router.navigateByUrl('/tasks');
  }

  skipLogin() {
    this.router.navigateByUrl('/tasks');
  }
}