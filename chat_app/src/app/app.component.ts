import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Router } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ChatComponent } from "./chat/chat.component";
import { AccountComponent } from "./account/account.component";
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    AccountComponent, 
    LoginComponent, 
    ChatComponent,
    RouterModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule],
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  constructor(private router: Router) {}
  title = 'chat_app';
  
  goToLogin() {
    this.router.navigateByUrl('/login');
  }
  goToAccount() {
    this.router.navigateByUrl('/account');
  }
  logout() {
    document.cookie = "Login_id=" + '' + ";Max-Age=1";
    this.router.navigate(['/login'])
    sleep(1500).then(() => {
      window.location.reload()});
  }
}

function sleep(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}