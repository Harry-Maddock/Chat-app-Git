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
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  username: string = "";
  email: string = "";
  privileges: string = "";
  groups: any[] = [];
  sub_groups: any[] = [];
  member_of: any[] = [];
  admins: any[] = [];
  allGroups: any[] = [];
  users: any[] = [];
  Added_group:string = "";
  AllUsers: any[] = [];

  
  constructor(private userService: UserService, private chatroomService: ChatRoomsService, private router: Router) {}

  ngOnInit(): void {
    if (document.cookie) {
      const username = document.cookie.split("=")[1];
      this.userService.GetAllUsers().subscribe(
        results => {  
          for(let i=0; i<results.length; i++){
            this.AllUsers.push([results[i].username, results[i].role])
          }
        });
      this.userService.GetUser(username).subscribe(
        info => {
        this.username = username;
        this.email = info.email; 
        this.privileges = info.role;
        this.userService.GetGroups(this.username).subscribe(
          groups => {
          this.groups = groups;
          for (const group of this.groups) {
            this.chatroomService.GetChatRoom(group).subscribe(
              result => {
              if (result.members.includes(this.username)) {
                this.member_of.push(result.name)
                this.users.push(result.members)
                this.sub_groups.push(result.subgroups)
                this.admins.push(result.admin)
              }
            });
          }
        });
        this.chatroomService.GetAllRooms().subscribe(
          results => {  
            for(let i=0; i<results.length; i++){
              var list = [];
              list.push(results[i].name)
              list.push(results[i].subgroups)
              list.push(results[i].admin)
              this.allGroups.push(list)
            }
          }
        )
      })
    }
    
    else{
      this.router.navigateByUrl('/login');
    }
  }
  logout() {
    document.cookie = "Login_id=" + '' + ";Max-Age=1";
    this.router.navigate(['/login'])
    sleep(1500).then(() => {
      window.location.reload()});
  }
  
  makeRequest(name: string, user: string): void {
    this.chatroomService.AddRequest(name, user).subscribe({
      next: (response) => {
        console.log("request successful", response)
      },
      error: (error) => {
        console.error('Error making request', error);
      }
    });
  }

  deleteAccount() {
    if (this.username) {
      this.userService.RemoveUser(this.username).subscribe({
        next: (response) => {
          console.log('User deleted successfully', response);
          this.logout();
        },
        error: (error) => {
          console.error('Error deleting user', error);
        }
      });
    } else {
      console.error('No username found in login_id cookie');
    }
  }

  addGroup() {
    const addedGroup = this.Added_group; 
    this.chatroomService.CreateRoom(this.username, addedGroup).subscribe({
      next: (response) => {
        this.userService.AddGroup(this.username, addedGroup).subscribe()
        console.log('Group created successfully', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error creating group', error);
      }
    });
  }

  Promote(username: string, role: string){
    this.userService.PromoteUser(username, role).subscribe({
      next: (response) => {
        window.location.reload();
      },
      error: (error) => {
        console.error('Error prmoting user', error);
      }
    })
  }
}

function sleep(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}