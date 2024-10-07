import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../socket.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { ChatRoomsService } from '../chat-rooms.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit {
  chatName = '';
  username:string="";
  messagecontent:string=""; 
  messages: string[] = []; 
  rooms: any[] = [];
  ioConnection: any;
  subgroup: string = '';

  constructor(private chatroomService: ChatRoomsService, private route: ActivatedRoute, private socketService:SocketService) { }
  ngOnInit() {
    if (document.cookie) {
      this.username = document.cookie.split("=")[1];
    }
    this.route.paramMap.subscribe(params => {
      if(params.get('chat_name') !== null){
        this.chatName = params.get('chat_name') as string;
      }
    })
    this.chatroomService.GetChatRoom(this.chatName).subscribe({
      next: (results) => {
          this.rooms.push(results.subgroups)
        }
      });
    }
subgroupConnect(room: string){
  if(this.subgroup != room){
    this.subgroup = room
    this.chatroomService.getLastFiveMessages(this.chatName, this.subgroup[0]).subscribe(
      result => {
        this.messages = result.last_5; 
      })
    this.initIoConnection();
  }
}

  private initIoConnection(){
    this.socketService.initSocket(this.chatName + this.subgroup, this.username);
    this.socketService.send(this.chatName, `User ${this.username} just joined the server`, "Server")
    this.ioConnection = this.socketService.getMessage().subscribe(
      (data) => {
        this.messages.push(data.sender + ": " + data.message); 
      });
}

  chat(){
    if(this.messagecontent){
      this.socketService.send(this.chatName + this.subgroup, this.messagecontent, this.username);
      const store = this.username + ": " + this.messagecontent
      this.chatroomService.updateLastFive(this.chatName, this.subgroup, store).subscribe({
        next: (response) => {
        },
        error: (error) => {
            console.error("Error updating last five messages:", error);
        }
    })
      this.messagecontent='';
    }else{
      console.log("no message");
      }
  }
}