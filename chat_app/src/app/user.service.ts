import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  id = 1;
  users: { [key: string]: any } = {};
  users_groups: { [key: string]: any } = {};
  
  constructor() {
    if (!localStorage.getItem('user Super')) {
      localStorage.setItem("user Super", "123,Admin@email.com,0,Super Admin");
    }
    if (!localStorage.getItem('rooms Super')) {
      localStorage.setItem("rooms Super", "Default");
    }
    for (let i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i); 
      if(key !== null){
        if (key.includes("user")) {
          const value = localStorage.getItem(key); 
          localStorage.getItem
          key = key.replace("user ", ""); 
          this.users[key] = value?.split(",");
        }
        if (key.includes("rooms")) {
          const value = localStorage.getItem(key); 
          key = key.replace("rooms ", ""); 
          this.users_groups[key] = value?.split(",");
        } 
      }
    }
  } 
  setItem(username: string, password: any, email: any){
      this.id++;
      this.users[username] = [password, email, this.id, "Chat User"];
      this.save(username);
  }
  getItem(username: string){
    return this.users[username];
  }
  removeItem(username: string): void {
    delete this.users[username];
    this.save(username);
  }
  addGroup(username: string, group: string){
    this.users_groups[username].push(group);
    this.users_groups[username].shift();
    this.save(username);
  }
  getGroups(username: string){
    return this.users_groups[username];
  }
  remove_group(username: string, group: string){
    this.users_groups[username].splice(this.users_groups[username].indexOf(group), 1);
    this.save(username);
  }
  save(username: string){
    localStorage.setItem("user "+username, this.users[username]);
    localStorage.setItem("rooms "+username, this.users_groups[username]);
  }
}
