import {Injectable} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {HttpService} from "./http.service";
import {GlobalVariables} from "../common/global";
import {SharingService} from "./sharing.service";
declare var require: any;

@Injectable()
export class AuthService {
  isAuthrized: boolean = false;
  currentUrl: string = '/';
  constructor(private router: Router,
              private httpService: HttpService,
              private shareService: SharingService) {
  }

  ifAuthenticated() {
    let userId = GlobalVariables.LOCAL_STORAGE_UTIL.getLocal('userid');
    if (userId !== null) {
      return true;
    } else {
      return false;
    }
  }

  setCurrentUrl(url) {
    this.currentUrl = url;
  }

  onLogin(username: string, pass: string) {
    this.shareService.loadingEmit.emit({
      loading: true
    });

    let whichAPI = '/login/';
    let postData = {
      'username': username,
      'password': pass
    };
    let promise = new Promise((resolve, reject) => {
      this.httpService.postRequest(GlobalVariables.BASE_API_URL+whichAPI,
        postData)
        .toPromise()
        .then(
          res => { // Success
            this.shareService.loadingEmit.emit({
              loading: false
            });
            let body = res.body;
            GlobalVariables.LOCAL_STORAGE_UTIL.setLocal('userid', body[0]['id'], (24 * 60 * 60 * 1000));
            this.isAuthrized = true;
            this.router.navigate([this.currentUrl]);
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
        })
    });

  }

}
