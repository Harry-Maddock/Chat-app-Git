import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

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
  loginId = ""
  info = [];
  Name = "";

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let Name = document.cookie.split(";");
    Name = (Name[0].split("="));
    this.info = this.userService.getItem(Name[1]);
    this.username = Name[1];
    this.email = this.info[1];
    this.privileges = this.info[3];
  }
}