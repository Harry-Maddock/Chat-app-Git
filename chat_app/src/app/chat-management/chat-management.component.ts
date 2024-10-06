import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { ChatRoomsService } from '../chat-rooms.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat-management',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule
  ],
  templateUrl: './chat-management.component.html',
  styleUrl: './chat-management.component.css'
})

export class ChatManagementComponent implements OnInit {
  chatName: string = '';
  username: string = '';
  SubgroupName: string = '';
  Rooms: string[] = [];
  Sub_groups: string[] = [];
  Admins: string[] = [];
  Requests: string[] = [];
  Members: string[] = [];
  constructor(private route: ActivatedRoute, private chatroomService: ChatRoomsService, private userService: UserService, private router: Router) { }

  approve(member: string){
    if(this.chatName != null){ 
      this.userService.AddGroup(member, this.chatName).subscribe({
        next: (response) => {
          console.log("Group added", response)
        },
        error: (error) => {
          console.error('Error creating group', error);
        }
      });
      this.chatroomService.Remove_request(this.chatName, member).subscribe({
        next: (response) => {
          console.log("request removed", response)
        },
        error: (error) => {
          console.error('Error creating group', error);
        }
      });
      this.chatroomService.Adduser(this.chatName, member).subscribe({
        next: (response) => {
          console.log("User added", response)
        },
        error: (error) => {
          console.error('Error creating group', error);
        }
      });
      window.location.reload()
    } 
  }
  deny(member: string){
    if(this.chatName != null){
      this.chatroomService.Remove_request(this.chatName, member);
    }
    window.location.reload()
  }
  remove(member: string){
    if(this.chatName != null){
      this.userService.RemoveGroup(this.chatName, member);
      this.chatroomService.Remove_member(this.chatName, member);
    }
    window.location.reload()
  }
  back(){
    this.router.navigateByUrl('/account');
  }

  addSubGroup() {
    const addedSubGroup = this.SubgroupName; 
    this.chatroomService.Addsubgroup(this.chatName, addedSubGroup).subscribe({
      next: (response) => {
        window.location.reload()
      },
      error: (error) => {
        console.error('Error creating group', error);
      }
    });
  }

  removeSubgroup(name: string){
      this.chatroomService.DeleteSubGroup(this.chatName, name).subscribe({
        next: (response) => {
          window.location.reload()
        },
        error: (error) => {
          console.error('Error creating group', error);
        }
      });
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    if(params.get('chat_name') !== null){
      this.chatName = params.get('chat_name') as string;
    }
    else{
      console.log("error getting chat name")
    }
    });
    this.username = document.cookie.split("=")[1];
    if (this.chatName) {
      this.chatroomService.GetChatRoom(this.chatName).subscribe({
        next: (info) => {
          this.Members = info.members;
          this.Rooms = info.subgroups;
          this.Requests = info.requests;
        },
          error: (error) => {
            console.error("Error fetching user information:", error);
          }
      })
      
    }
  }
}