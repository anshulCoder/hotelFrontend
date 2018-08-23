import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpService} from "./services/http.service";
import {SharingService} from "./services/sharing.service";
import {AuthGuard} from "./services/auth-guard.service";
import {AuthService} from "./services/auth.service";
import { HomeModule } from './home/home.module';
import { UserBookingsModule } from './user-bookings/user-bookings.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    UserBookingsModule
  ],
  providers: [HttpService, SharingService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
