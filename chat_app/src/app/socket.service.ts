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
    private messageSubject = new Subject<{message: string, sender: string}>();
    constructor() {}

    initSocket(roomName: string, username: string){
      this.socket = io(SERVER_URL);
      this.socket.emit('joinRoom', roomName, username);
      this.socket.on('message', (data) => {
        this.messageSubject.next(data);
      });
      return()=>{
        this.send(roomName, `User ${username} just left the server`, "Server").then(() => {
          this.socket.disconnect();
      });
    }
  }

  send(roomName: string, message: string, sender: string): Promise<void> {
    return new Promise((resolve, reject) => {
        this.socket.emit('chatMessage', { roomName, message, sender }, (response: any) => {
            if (response && response.success) {
                resolve();
            } else {
                reject(new Error('Message not sent'));
            }
        });
    });
  }

    getMessage(): Observable<{message: string, sender: string}> {
      return this.messageSubject.asObservable();
    }
}
