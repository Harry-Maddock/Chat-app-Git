import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService {
  Members: { [key: string]: any } = {};
  Admin: { [key: string]: any } = {};
  Subgroups: { [key: string]: any}  = {};
  Requests: { [key: string]: any} = {}
  constructor() {
    localStorage.setItem("Members Default", "Super");
    localStorage.setItem("Admin Default", "Super");
    localStorage.setItem("Subgroups Default", "default");
    localStorage.setItem("Requests Default", "");
    for (let i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i); 
      if(key !== null){
        if (key.includes("Members")) {
          const value = localStorage.getItem(key); 
          localStorage.getItem
          key = key.replace("Members ", ""); 
          this.Members[key] = [value?.split(",")];
        }
        if (key.includes("Admin")) {
          const value = localStorage.getItem(key); 
          key = key.replace("Admin ", ""); 
          this.Admin[key] = value;
        }
        if (key.includes("Subgroups")) {
          const value = localStorage.getItem(key); 
          localStorage.getItem
          key = key.replace("Subgroups ", ""); 
          this.Subgroups[key] = [value?.split(",")];
        }
        if (key.includes("Requests")) {
          const value = localStorage.getItem(key); 
          key = key.replace("Requests ", ""); 
          this.Requests[key] = [value?.split(",")];
        }
      }
    }
  }

  set_Item(admin: string, Name: string){
    this.Admin[Name] = admin;
    this.Members[Name] = [admin];
    this.Subgroups[Name] = [];
    this.save(Name);
  }

  Adduser(Name: string, Username: any){
    this.Members[Name].push(Username);
    this.save(Name);
  }

  Addsubgroup(Name: string, Sub_group: string){
    this.Subgroups[Name].push(Sub_group);
    this.save(Name);
  }

  getItem(Name: string){
    return[this.Members[Name], this.Subgroups[Name], this.Admin[Name]]; 
  }

  AddRequest(Name: string, user: string){
    this.Requests[Name].push(user);
    this.save(Name);
  }

  removeItem(Name: string) {
    delete this.Admin[Name]; 
    delete this.Members[Name]; 
    delete this.Subgroups[Name];
    this.save(Name);
  }
  save(Name: string){
    localStorage.setItem("Members "+Name, this.Members[Name]);
    localStorage.setItem("Admin "+Name, this.Admin[Name]);
    localStorage.setItem("Subgroups "+Name, this.Subgroups[Name]);
    localStorage.setItem("Requests "+Name, this.Requests[Name])
  }
}
