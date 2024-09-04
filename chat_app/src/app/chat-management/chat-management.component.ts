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

  approve(member: string){}
  deny(member: string){}
  remove(member: string){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chatName = params.get('chat_name');
    });
    let Name = document.cookie.split(";");
    Name = (Name[0].split("="));
    this.info = this.userService.getItem(Name[1]);
    this.username = Name[1];
    this.email = this.info[1];
    this.privileges = this.info[3];
    for(var room in Object.keys(this.chatroomService.Admin)){
      this.Rooms.push(room);
      var temp = this.chatroomService.getItem(room)[1];
      this.Requests.push(temp);
      var temp = this.chatroomService.getItem(room)[0];
      this.Members.push(temp);

    }
    for(var room in Object.keys(this.chatroomService.Admin)){
      this.Admins.push(room);
    }
    
  }
}