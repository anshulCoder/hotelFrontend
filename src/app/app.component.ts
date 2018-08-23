import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import {SharingService} from "./services/sharing.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  isLoading = false;
  alertText = '';
  alertType = '';
  showAlert = false;

  constructor(private sharingService: SharingService,
              private cdRef: ChangeDetectorRef) {}


  ngOnInit() {
    this.sharingService.loadingEmit.subscribe(
      (data) => {
        if (data.loading === true) {
          this.isLoading = true;
        } else {
          this.isLoading = false;
        }
      }
    );

    this.sharingService.alertEmit.subscribe(
      (data) => {
        if (data.showAlert === true) {
          this.showAlert = true;
          this.alertType = data.aType;
          this.alertText = data.aText;
          this.fadeAlertAway();
        }
      }
    );
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  fadeAlertAway() {
    setTimeout(() => {
      this.showAlert = false;
    }, 10000);
  }
}
