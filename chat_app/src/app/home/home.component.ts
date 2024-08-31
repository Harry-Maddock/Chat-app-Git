import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router){}

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
  goToAccount() {
    this.router.navigateByUrl('/account');
  }
  goToChat() {
    this.router.navigateByUrl('/chat');
  }
}