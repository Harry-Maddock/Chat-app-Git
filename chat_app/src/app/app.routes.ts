import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./home/home.component";
import { AccountComponent } from "./account/account.component";


export const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'login', component: LoginComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'account', component: AccountComponent}
];
