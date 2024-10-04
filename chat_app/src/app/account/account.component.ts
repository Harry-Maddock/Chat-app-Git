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
  username: string = '';
  email: string = '';
  privileges: string = '';
  loginId = ""
  info = [];
  Name = "";
  Added_user = '';
  Added_group = '';
  Added_sub_group = '';
  test_val = 1;
  groups: string[] = [];
  member_of: string[] = [];
  admins: string[] = [];
  users: string[][] = [];
  sub_groups: string[][] = [];
  
  constructor(private userService: UserService, private chatroomService: ChatRoomsService, private router: Router) {}

  logout(){
    document.cookie="";
    alert("logout successful, returning to login page.");
    this.router.navigateByUrl('/login');
  }
  request(room:string){
    this.chatroomService.AddRequest(room, this.username);
  }
  delete_account(){
    this.userService.removeItem(this.username);
    document.cookie="";
    alert("account successfully deleted!");
    this.router.navigateByUrl('/login');
  }

  Add_group(){
    this.chatroomService.set_Item(this.username, this.Added_group);
    this.userService.addGroup(this.username, this.Added_group);
  }
  chat(chatName: string): void {
    this.router.navigateByUrl(`/chat/${chatName}`);
  }
  Manage(chatName: string): void {
    this.router.navigateByUrl(`/chatmanagement/${chatName}`);
  }

  ngOnInit(): void {
    let Name = document.cookie.split(";");
    Name = (Name[0].split("="));
    this.info = this.userService.getItem(Name[1]);
    this.username = Name[1];
    this.email = this.info[1];
    this.privileges = this.info[3];
    if(this.privileges == "Super Admin" || this.privileges == "Group Admin"){
      this.groups = this.userService.getGroups(this.username);
      for (const group of this.groups) {
        const result = this.chatroomService.getItem(group);
        if (result[2] == this.username){
          var temp = [];
          for(var set in result[0]){
              temp.push(result[0][set]);
            }
            this.users.push(temp);
            var temp = [];
          for(var set in result[1]){
            temp.push(result[1][set]);
            }
            this.sub_groups.push(temp);
        }
        else{
          this.groups.slice(-1, 1);
        }
      }
    }
    else{
      for(var room in Object.keys(this.chatroomService.Admin)){
        var temp = [];
        for(var check in this.userService.users_groups[this.username]){
          if(Object.keys(this.chatroomService.Admin)[room] == this.userService.users_groups[this.username][check]){
            this.member_of.push(this.userService.users_groups[this.username][check])
          }
          else{
            this.groups.push(Object.keys(this.chatroomService.Admin)[room]);
          }
        }
        this.sub_groups.push(this.chatroomService.getItem(Object.keys(this.chatroomService.Admin)[room])[1]);
      }
      for(var room in Object.values(this.chatroomService.Admin)){
        this.admins.push(Object.values(this.chatroomService.Admin)[room]);
      }
    }
  }
}

