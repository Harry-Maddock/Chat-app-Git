import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  id = 1;
  users: { [key: string]: any } = {["SuperAdmin"]: ["Pass123", "Admin@email.com", 0, "Super Admin"]};
  
  constructor() {
  }

  setItem(username: string, password: any, email: any){
    if (!(username in this.users)) {
      this.id++;
      this.users[username] = [password, email, this.id, "Chat User"];
      return("Account creates successfully");
    } 
    else{
      return("The username already exists");
    } 
  }
  getItem(username: string){
    return this.users[username];
  }

}
