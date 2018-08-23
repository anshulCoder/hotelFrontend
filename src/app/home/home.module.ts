import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HomeService} from "./home.service";
import {BsDatepickerModule, ModalModule} from "ngx-bootstrap";

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    HomeComponent
  ],
  providers: [HomeService]
})

export class HomeModule {

}
