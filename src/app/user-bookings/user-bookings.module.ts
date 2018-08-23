import {NgModule} from "@angular/core";
import {UserBookingsComponent} from "./user-bookings.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserBookingsService} from "./user-bookings.service";
import {BsDatepickerModule, ModalModule} from "ngx-bootstrap";

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    UserBookingsComponent
  ],
  providers: [UserBookingsService]
})

export class UserBookingsModule {

}
