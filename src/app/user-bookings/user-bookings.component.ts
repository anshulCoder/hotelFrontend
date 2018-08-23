import { Component, OnInit } from '@angular/core';
import { UserBookingsService } from './user-bookings.service';
import { GlobalVariables } from '../common/global';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {

  bookingsHolder = [];

  constructor(private bookingService: UserBookingsService,
              private shareService: SharingService) { }

  ngOnInit() {
    let userId = GlobalVariables.LOCAL_STORAGE_UTIL.getLocal('userid');
    if (userId !== null) {
      let p = {
        userid: userId
      };
      this.shareService.loadingEmit.emit({
        loading: true
      });
      this.getUserBookings(p).then(
        (data) => {
          this.shareService.loadingEmit.emit({
            loading: false
          });
          this.bookingsHolder = data;
        }
      )
    } else {
      this.shareService.alertEmit.emit({
        showAlert: true,
        aText: 'Invalid User',
        aType: 'error'
      });
    }
  }


  async getUserBookings(params) {
    return await this.bookingService.fetchBookings(params);
  }
}
