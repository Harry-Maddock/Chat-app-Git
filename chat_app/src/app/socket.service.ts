// socket.service.ts
import { Injectable } from '@angular/core';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Subject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {  } from "socket.io";

const SERVER_URL = 'http://localhost:3000';
@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
    private messageSubject = new Subject<string>();
    constructor() {}
  //Setup Connection to socket server 
    initSocket(){
      this.socket = io(SERVER_URL);
      return()=>{this.socket.disconnect();}
    }
    //Emit a message to the socket server
    send (message: string){
      this.socket.emit('message', message);
    }

    //Listen for "message" events from the socket server 
    getMessage(): Observable<string> {
      return this.messageSubject.asObservable();
    }
}
