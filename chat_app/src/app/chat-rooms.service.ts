import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService {
  private baseUrl = 'http://localhost:3000'; // Your server URL
  Admin: { [key: string]: any } = {};
  constructor(private http: HttpClient) {}

  CreateRoom(admin: string, name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/setItem`, { admin, name });
  }

  Adduser(name: string, username: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUser`, { name, username });
  }

  Remove_request(name: string, member: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/removeRequest`, { name, member });
  }

  Addsubgroup(name: string, subgroup: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/addSubgroup`, { name, subgroup });
  }

  Remove_member(name: string, member: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/removeMember`, { name, member });
  }

  GetChatRoom(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRoom/${name}`);
  }

  GetAllRooms():Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }

  AddRequest(name: string, user: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/addRequest`, { name, user });
  }

  DeleteRoom(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteRoom/${name}`);
  }

  DeleteSubGroup(name: string, SubgroupName: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/RemoveSubgroup/${name}/${SubgroupName}`);
  }

  updateLastFive(chatName: string, subgroup: string, message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateLastFive`, { chatName, subgroup, message });
  }
  
  getLastFiveMessages(chatName: string, subgroup: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/getLastFive/${chatName}/${subgroup}`);
  }
}