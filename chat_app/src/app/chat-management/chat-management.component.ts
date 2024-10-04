import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { ChatRoomsService } from '../chat-rooms.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-management.component.html',
  styleUrl: './chat-management.component.css'
})
export class ChatManagementComponent implements OnInit {
  chatName: string | null = null;
  username: string = '';
  email: string = '';
  privileges: string = '';
  info = [];
  Rooms: string[] = [];
  Admins: string[] = [];
  Requests: string[] = [];
  Members: string[] = [];
  constructor(private route: ActivatedRoute, private chatroomService: ChatRoomsService, private userService: UserService, private router: Router) { }

  approve(member: string){
    if(this.chatName != null){
      this.userService.addGroup(member, this.chatName);
      this.chatroomService.Remove_request(this.chatName, member);
      this.chatroomService.Adduser(this.chatName, member);
    } 
  }
  deny(member: string){
    if(this.chatName != null){
      this.chatroomService.Remove_request(this.chatName, member);
    }
  }
  remove(member: string){
    if(this.chatName != null){
      this.userService.remove_group(this.chatName, member);
      this.chatroomService.Remove_member(this.chatName, member);
    }
  }
  back(){
    this.router.navigateByUrl('/account');
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.chatName = params.get('chat_name');
    });

    const cookieData = document.cookie.split(";").find(row => row.trim().startsWith('username='));
    if (cookieData) {
        this.username = cookieData.split("=")[1];
        this.info = this.userService.getItem(this.username);
        this.email = this.info[1];
        this.privileges = this.info[3];
        
        if (this.chatName) {
            const roomData = this.chatroomService.getItem(this.chatName);
            this.Members = roomData[0];
            this.Rooms = roomData[1];
            this.Admins = roomData[2];
            this.Requests = roomData[3];

            // Remove any 'undefined' entries from Requests
            this.Requests = this.Requests.filter(request => request !== "undefined");
        }
    }
  }
}