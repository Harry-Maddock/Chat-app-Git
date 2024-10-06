import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../socket.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router';

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
  messagecontent:string=""; 
  messages: string[] = []; 
  ioConnection: any;
  constructor(private route: ActivatedRoute, private socketService:SocketService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get('chat_name') !== null){
        this.chatName = params.get('chat_name') as string;
      }
    })
    this.initIoConnection();
  }
  private initIoConnection(){
  this.socketService.initSocket();
  this.ioConnection = this.socketService.getMessage().subscribe(
    (message:string) => {
    this.messages.push(message);
    });
  }
  chat(){
    if(this.messagecontent){
  //chek there is a message to send 
  this.socketService.send(this.messagecontent);
  this.messagecontent='';
  }else{
  console.log("no message");
  }
}
}