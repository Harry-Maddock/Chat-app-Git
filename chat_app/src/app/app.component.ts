import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./home/home.component";
import { AccountComponent } from "./account/account.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AccountComponent, LoginComponent, ChatComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chat_app';
}
