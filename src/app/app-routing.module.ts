import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./services/auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {UserBookingsComponent} from "./user-bookings/user-bookings.component";


const myRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'bookings' , canActivate: [AuthGuard], component: UserBookingsComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'not-found'}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(myRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
