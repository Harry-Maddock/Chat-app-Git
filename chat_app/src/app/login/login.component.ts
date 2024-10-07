import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
  ReactiveFormsModule, 
  FormsModule,
  RouterModule, 
  HttpClientModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  sign_in_username = '';
  sign_in_password = '';
  username = '';
  password = '';
  otherpassword = '';
  email = '';
  info: any;
  LoggedIn:string = '0';

  constructor(private userService: UserService, private router: Router) {}

  Signup() {
    if (this.password !== this.otherpassword) {
      alert("Passwords do not match, try again");
      this.empty();
    } else {
      this.userService.GetUser(this.username).subscribe({
        next: (data) => {
          if (data) {
            alert("Username taken");
            this.empty();
          } else {
            this.userService.Register(this.username, this.password, this.email).subscribe({
              next: (response) => {
                alert("Signed up successfully");
                console.log(response);
                this.empty();
              },
              error: (error)=> {
                alert("Error during signup: " + error.message);
                this.empty();
              }
          });
          }
        },
        error: (error) => {
          alert("Error fetching user: " + error.message);
          this.empty();
        }
      });
    }
  }

  Login() {
    this.userService.GetUser(this.sign_in_username).subscribe({
      next: (data) => {
        if (data) {
          if (data.password === this.sign_in_password) {
            document.cookie = "Login_id=" + this.sign_in_username + ";Max-Age=10000";
            this.empty();
            this.router.navigateByUrl(`/account`);
          } else {
            alert("Username or password incorrect");
            this.empty();
          }
        } else {
          alert("ERROR: username not found");
          this.empty();
        }
      },
      error: (error) => {
        alert("Error fetching user: " + error.message);
        this.empty();
      }
  });
  }

  empty() {
    this.sign_in_username = '';
    this.sign_in_password = '';
    this.username = '';
    this.password = '';
    this.otherpassword = '';
    this.email = '';
    this.info = undefined;
  }

  ngOnInit() {
    if(document.cookie.split("=")[1] === undefined){
      this.LoggedIn = '1'
    }

    else if(document.cookie.split("=")[1] === ''){
      this.LoggedIn = "2"
    }
    else{
      this.LoggedIn = "0"
    }
  }
}