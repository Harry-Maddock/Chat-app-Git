import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  sign_in_username = '';
  sign_in_password = '';
  username = '';
  password = '';
  otherpassword = '';
  email = '';
  info = [];
  constructor(private userService: UserService, private router: Router){}
  Signup() {
    if (this.password != this.otherpassword){
      alert("Passwords do not match, try again")
    }
    else {
      this.userService.setItem(this.username, this.password, this.email);
      alert("Signed up successfully")
      console.log(this.userService.users);
      this.username = '';
      this.password = '';
      this.otherpassword = '';
      this.email = '';
    }
  }
  Login(){
    this.info = this.userService.getItem(this.sign_in_username);
    if(this.info[0] == this.sign_in_password){
      this.router.navigateByUrl(`/account?username=${encodeURIComponent(this.sign_in_username)}&email=${encodeURIComponent(this.info[1])}&privilige=${encodeURIComponent(this.info[3])}`);
    }
    else {
      alert("Username or password incorrect")
    }
  }
  ngOnInit() {
    
  }
}
