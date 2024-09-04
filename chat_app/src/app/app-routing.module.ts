import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./home/home.component";
import { AccountComponent } from "./account/account.component";
import { ChatManagementComponent } from './chat-management/chat-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'account', component: AccountComponent},
  { path: 'chatmanagement/:chat_name', component: ChatManagementComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
