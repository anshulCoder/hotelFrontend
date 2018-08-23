import {Injectable} from "@angular/core";
import {HttpService} from "../services/http.service";
import {HttpParams} from "@angular/common/http";
import {GlobalVariables} from "../common/global";
import {SharingService} from "../services/sharing.service";

@Injectable()
export class HomeService {

  constructor(private httpService: HttpService,
              private shareService: SharingService) {
  }

  fetchRoomTypes(params?: any): any {
    let whichAPI = '/room_types';

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

  checkAvailableRooms(pData: any, params?: any): any {
    let whichAPI = '/room_availability';

    let customParams = new HttpParams({
      fromObject : params
    });

    let promise = new Promise((resolve, reject) => {
      this.httpService.postRequest(GlobalVariables.BASE_API_URL+whichAPI,
        pData,
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

  checkEmail(pData: any, params?: any): any {
    let whichAPI = '/email_check';

    let customParams = new HttpParams({
      fromObject : params
    });

    let promise = new Promise((resolve, reject) => {
      this.httpService.postRequest(GlobalVariables.BASE_API_URL+whichAPI,
        pData,
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

  saveBooking(pData: any, params?: any): any {
    let whichAPI = '/save_booking';

    let customParams = new HttpParams({
      fromObject : params
    });

    let promise = new Promise((resolve, reject) => {
      this.httpService.postRequest(GlobalVariables.BASE_API_URL+whichAPI,
        pData,
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

  saveUser(pData: any, params?: any): any {
    let whichAPI = '/save_user';

    let customParams = new HttpParams({
      fromObject : params
    });

    let promise = new Promise((resolve, reject) => {
      this.httpService.postRequest(GlobalVariables.BASE_API_URL+whichAPI,
        pData,
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

  checkLogin(pData: any, params?: any): any {
    let whichAPI = '/login';

    let customParams = new HttpParams({
      fromObject : params
    });

    let promise = new Promise((resolve, reject) => {
      this.httpService.postRequest(GlobalVariables.BASE_API_URL+whichAPI,
        pData,
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
