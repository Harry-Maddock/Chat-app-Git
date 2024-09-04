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
    if (!localStorage.getItem('Members Default')) {
      localStorage.setItem("Members Default", "Super");
    }
    if (!localStorage.getItem('Admin Default')) {  
      localStorage.setItem("Admin Default", "Super");
    }
    if (!localStorage.getItem('Subgroups Default')) {  
      localStorage.setItem("Subgroups Default", "default"); 
    }
    if (!localStorage.getItem('Requests Default')) {  
      localStorage.setItem("Requests Default", ""); 
    }
    for (let i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i); 
      if(key !== null){
        if (key.includes("Members")) {
          const value = localStorage.getItem(key); 
          localStorage.getItem
          key = key.replace("Members ", ""); 
          this.Members[key] = value?.split(",");
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
    if(!(Username in this.Members[Name])){
      this.Members[Name].push(Username);
      this.save(Name);
    }
  }
  Remove_request(Name: string, member: string){
    this.Requests[Name].splice(this.Requests[Name].indexOf(member), 1);
    this.save(Name);
  }
  Addsubgroup(Name: string, Sub_group: string){
    if(!(Sub_group in this.Subgroups[Name])){
      this.Subgroups[Name].push(Sub_group);
      this.save(Name);
    }
  }
  Remove_member(Name: string, member: string){
    this.Members[Name].splice(this.Members[Name].indexOf(member), 1);
    this.save(Name);
  }
    
  getItem(Name: string){
    return[this.Members[Name], this.Subgroups[Name], this.Admin[Name], this.Requests[Name]]; 
  }

  AddRequest(Name: string, user: string){
    var check = 0;
    for(var req in this.Requests[Name]){
      for(var x in this.Requests[Name][req]){
        if(user == this.Requests[Name][req][x]){
          check = 1;
        }
      }
    }
    if(check == 0){
      this.Requests[Name].push(user);
      this.Requests[Name].shift();
      this.save(Name);
    }
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
