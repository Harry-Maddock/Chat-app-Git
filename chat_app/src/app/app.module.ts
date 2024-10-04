import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AccountComponent } from "./account/account.component";
import { HomeComponent } from "./home/home.component";
import { ChatComponent } from "./chat/chat.component";
import { UserService } from './user.service'; 
import { ChatRoomsService } from "./chat-management/chat-management.component";

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule, 
        AppComponent,
        LoginComponent,
        ChatComponent,
        HomeComponent,
        AccountComponent,
        ChatRoomsService
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {}
