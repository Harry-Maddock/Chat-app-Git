import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private userService: UserService){}
  setItem(){
    this.userService.setItem(this.username, this.password);
    console.log(this.userService.users);
  }
}
