import {Injectable} from "@angular/core";
import {HttpService} from "../services/http.service";
import {HttpParams} from "@angular/common/http";
import {GlobalVariables} from "../common/global";
import {SharingService} from "../services/sharing.service";

@Injectable()
export class UserBookingsService {

  constructor(private httpService: HttpService,
              private shareService: SharingService) {
  }

  fetchBookings(params?: any): any {
    let whichAPI = '/user_bookings';

    let customParams = new HttpParams({
      fromObject : params
    });

    let promise = new Promise((resolve, reject) => {
      this.httpService.getRequest(GlobalVariables.BASE_API_URL+whichAPI,
        null,
        customParams)
        .toPromise()
        .then(
          res => { // Success
            resolve(res.body);
          }
        )
        .catch(error => {
          this.shareService.loadingEmit.emit({
            loading: false
          });
          this.shareService.alertEmit.emit({
            showAlert: true,
            aText: error,
            aType: 'error'
          });
          //(error);
        })
    });
    return promise;
  }
}
