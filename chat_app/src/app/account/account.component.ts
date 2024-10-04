import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { ChatRoomsService } from '../chat-rooms.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  username: string = "";
  email: string = "";
  privileges: string = "";
  groups: any[] = [];
  sub_groups: any[] = [];
  users: any[] = [];
  member_of: any[] = [];
  admins: any[] = [];

  
  constructor(private userService: UserService, private chatroomService: ChatRoomsService, private router: Router) {}

  ngOnInit(): void {
    const cookie = document.cookie.split(";").find(c => c.trim().startsWith("name="));
    if (cookie) {
      const username = cookie.split("=")[1];

      this.userService.getItem(username).subscribe(info => {
        this.username = username;
        this.email = info.email; // Assuming info contains an email field
        this.privileges = info.privileges; // Assuming info contains a privileges field

        if (this.privileges === "Super Admin" || this.privileges === "Group Admin") {
          this.userService.getGroups(this.username).subscribe(groups => {
            this.groups = groups;

            for (const group of this.groups) {
              this.chatroomService.getItem(group).subscribe(result => {
                if (result[2] === this.username) {
                  this.users.push(result[0]);
                  this.sub_groups.push(result[1]);
                }
              });
            }
          });
        } else {
          this.loadUserGroups();
        }
      });
    }
  }

  private loadUserGroups(): void {
    const adminRooms = Object.keys(this.chatroomService.Admin);

    for (const room of adminRooms) {
      const adminInfo = this.chatroomService.Admin[room];
      
      this.userService.getGroups(this.username).subscribe(userGroups => {
        if (userGroups.includes(room)) {
          this.member_of.push(room);
        } else {
          this.groups.push(room);
        }
      });

      this.sub_groups.push(this.chatroomService.getItem(room));

      this.admins.push(adminInfo);
    }
  }
  makeRequest(name: string, user: string): void {
    this.chatroomService.AddRequest(name, user).subscribe();
  }
}