import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  username: string = '';
  email: string = '';
  privileges: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.email = params['email'];
      this.privileges = params['privilige'];
      console.log('Username:', this.username);
      console.log('Email:', this.email);
      // Handle the retrieved parameters
    });
  }
}