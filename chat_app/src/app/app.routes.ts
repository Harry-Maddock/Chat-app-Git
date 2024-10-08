import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ChatComponent } from "./chat/chat.component";
import { AccountComponent } from "./account/account.component";
import { ChatManagementComponent } from './chat-management/chat-management.component';


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'chat/:chat_name', component: ChatComponent},
    {path: 'account', component: AccountComponent},
    { path: 'chatmanagement/:chat_name', component: ChatManagementComponent },
];
