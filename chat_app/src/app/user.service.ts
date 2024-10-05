import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private baseUrl = 'http://localhost:3000'; 
  users: { [key: string]: any } = {};
  
  constructor(private http: HttpClient) {}

  Register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password, email });
  }

  GetUser(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${username}`);
  }

  RemoveUser(username: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${username}`);
  }

  AddGroup(username: string, group: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/addGroup`, { username, group });
  }

  GetGroups(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/groups/${username}`);
  }

  RemoveGroup(username: string, group: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/removeGroup`, { username, group });
  }
}