import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService {
  private URL = 'http://localhost:3000'; // Your server URL
  Admin: { [key: string]: any } = {};
  constructor(private http: HttpClient) {}

  CreateRoom(admin: string, name: string): Observable<any> {
    return this.http.post(`${this.URL}/setItem`, { admin, name });
  }

  Adduser(name: string, username: any): Observable<any> {
    return this.http.post(`${this.URL}/addUser`, { name, username });
  }

  Remove_request(name: string, member: string): Observable<any> {
    return this.http.post(`${this.URL}/removeRequest`, { name, member });
  }

  Addsubgroup(name: string, subgroup: string): Observable<any> {
    return this.http.post(`${this.URL}/addSubgroup`, { name, subgroup });
  }

  Remove_member(name: string, member: string): Observable<any> {
    return this.http.post(`${this.URL}/removeMember`, { name, member });
  }

  GetChatRoom(name: string): Observable<any> {
    return this.http.get(`${this.URL}/getItem/${name}`);
  }

  GetAllRooms():Observable<any> {
    return this.http.get(`${this.URL}/getAll`);
  }

  AddRequest(name: string, user: string): Observable<any> {
    return this.http.post(`${this.URL}/addRequest`, { name, user });
  }

  RemoveItem(name: string): Observable<any> {
    return this.http.delete(`${this.URL}/removeItem/${name}`);
  }
}