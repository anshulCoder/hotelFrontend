import { Component, OnInit } from '@angular/core';
import {SharingService} from "../services/sharing.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {GlobalVariables} from "../common/global";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private shareService: SharingService,
              private router: Router) { }

  ngOnInit() {
  }

  isLogged() {
    return this.authService.ifAuthenticated();
  }

  logout() {
    GlobalVariables.LOCAL_STORAGE_UTIL.delLocal('userid');
    this.router.navigate(['login']);
  }
}
