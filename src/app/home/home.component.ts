import { Component, OnInit, ViewChild } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { HomeService } from './home.service';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '../services/auth.service';
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap";
import { GlobalVariables } from '../common/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  availableRoomTypes = [];
  roomsAvailability = [];
  bsRangeValue : Date[];
  minDate: Date;
  emailCheckDone = false;
  passLabel = '';
  selectedRoomIds = [];
  isExistingUser = false;
  @ViewChild(ModalDirective) signupModal: ModalDirective;

  constructor(private shareService: SharingService,
              private homeService: HomeService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    //Setting minimum date for datepicker
    this.minDate = new Date();
    this.shareService.loadingEmit.emit({
      loading: true
    });
    //Getting all available Room Types
    this.getRoomTypes().then(
      (data) => {
        this.shareService.loadingEmit.emit({
          loading: false
        });
        this.availableRoomTypes = data;
      }
    );
  }

  checkRooms(bookForm: NgForm) {
    if (bookForm.value.bDate.length !== 0) {
      let dates: Date[] = bookForm.value.bDate;
      let endD = moment(dates[1]);
      let startD = moment(dates[0]);
      let rType = bookForm.value.rType;
      // Basic Date validations
      if (this.basicDateChecks(startD, endD)) {
        let pData = {
          'start_date': startD.format('YYYY-MM-DD'),
          'end_date': endD.format('YYYY-MM-DD')
        };
        if (rType !== '') {
          pData['room_type'] = rType;
        }
        this.shareService.loadingEmit.emit({
          loading: true
        });
        this.roomAvailability(pData).then(
          (data) => {
            this.shareService.loadingEmit.emit({
              loading: false
            });
            let rooms = {};
            for (let r of data) {
              if (typeof rooms[r['room_name']] === 'undefined') {
                rooms[r['room_name']] = {};
                rooms[r['room_name']]['total'] = 0;
                rooms[r['room_name']]['roomIds'] = [];
              }
              rooms[r['room_name']]['name'] = r['room_name'];
              rooms[r['room_name']]['description'] = r['room_description'];
              rooms[r['room_name']]['total']++;
              rooms[r['room_name']]['roomIds'].push(r['id']);
            }
            this.roomsAvailability = Object.values(rooms);
          }
        );
      }
    } else {
      this.shareService.alertEmit.emit({
        showAlert: true,
        aText: 'Invalid Date Range',
        aType: 'error'
      });
    }
  }

  basicDateChecks(sDate, eDate) {
    if (sDate.isValid() && eDate.isValid()) {
      if (sDate.isSameOrAfter(eDate)) {
        this.shareService.alertEmit.emit({
          showAlert: true,
          aText: 'Start date can not be same or greater than End date!',
          aType: 'error'
        });
        return false;
      } else {
        var today = moment();
        var dur = moment.duration(eDate.diff(today));
        var months = Math.round(dur.as('months'));
        if (months > 6) {
          this.shareService.alertEmit.emit({
            showAlert: true,
            aText: 'Date Range Should be within 6 months!',
            aType: 'error'
          });
          return false;
        } else {
          return true;
        }

      }
    } else {
      this.shareService.alertEmit.emit({
        showAlert: true,
        aText: 'Start and End date should have valid format (YYYY-MM-DD)',
        aType: 'error'
      });
      return false;
    }
  }

  // For Booking a room
  bookNow(roomIds: any[]) {
    this.selectedRoomIds = roomIds;
    console.log(roomIds, this.bsRangeValue);
    if (this.authService.ifAuthenticated()) {
      let userId = GlobalVariables.LOCAL_STORAGE_UTIL.getLocal('userid');
      this.saveBooking(userId);
    } else {
      this.signupModal.show();
    }
  }

  checkEmail(emailForm: NgForm) {
    if (this.emailCheckDone) {
      if (emailForm.value.email !== '' && emailForm.value.password !== '') {
        if (!this.isExistingUser) {
          // Save user
          let postUser = {
            email: emailForm.value.email,
            password: emailForm.value.password
          }
          this.shareService.loadingEmit.emit({
            loading: true
          });
          this.registerUser(postUser).then(
            (data) => {
              this.shareService.loadingEmit.emit({
                loading: false
              });
              let userId = data['insertId'];
              GlobalVariables.LOCAL_STORAGE_UTIL.setLocal('userid', userId, (24 * 60 * 60 * 1000));
              this.saveBooking(userId);
            }
          );
        } else {
          //Check for login
          let postUser = {
            username: emailForm.value.email,
            password: emailForm.value.password
          }
          this.shareService.loadingEmit.emit({
            loading: true
          });
          this.checkLogin(postUser).then(
            (data) => {
              this.shareService.loadingEmit.emit({
                loading: false
              });
              let userId = data[0]['id'];
              GlobalVariables.LOCAL_STORAGE_UTIL.setLocal('userid', userId, (24 * 60 * 60 * 1000));
              this.saveBooking(userId);
            }
          );
        }
      } else {
        this.shareService.alertEmit.emit({
          showAlert: true,
          aText: 'Email and Password is required!',
          aType: 'error'
        });
      }
    } else {

    }
    if (emailForm.value.email !== '') {
      let pData = {
        email: emailForm.value.email
      };
      this.checkUserEmail(pData).then(
        (data) => {
          if (data.length === 0) {
            // User Not Registered
            this.emailCheckDone = true;
            this.passLabel = 'Create Password';
          } else {
            // User Registered
            this.emailCheckDone = true;
            this.passLabel = 'Enter Password';
            this.isExistingUser = true;
          }
        }
      );
    } else {
      this.shareService.alertEmit.emit({
        showAlert: true,
        aText: 'Please Provide Email',
        aType: 'error'
      });
    }
  }

  saveBooking(userId) {
    var roomId = this.selectedRoomIds[Math.floor(Math.random()*this.selectedRoomIds.length)];
    let endD = moment(this.bsRangeValue[1]);
    let startD = moment(this.bsRangeValue[0]);
    GlobalVariables.LOCAL_STORAGE_UTIL.setLocal('userid', userId, (24 * 60 * 60 * 1000));
    let postBook = {
      user_id: userId,
      start_date: startD.format('YYYY-MM-DD'),
      end_date: endD.format('YYYY-MM-DD'),
      room_id: roomId
    };
    this.shareService.loadingEmit.emit({
      loading: true
    });
    this.bookRoom(postBook).then(
      (data) => {
        this.shareService.loadingEmit.emit({
          loading: false
        });
        this.shareService.alertEmit.emit({
          showAlert: true,
          aText: 'Booking is Done!',
          aType:'success'
        });
        this.router.navigate(['bookings']);
      }
    );
  }

  closeModal() {
    this.signupModal.hide();
    this.isExistingUser = false;
    this.emailCheckDone = false;
  }


  /* API Related space */
  async getRoomTypes() {
    return await this.homeService.fetchRoomTypes();
  }

  async roomAvailability(pData) {
    return await this.homeService.checkAvailableRooms(pData);
  }

  async checkUserEmail(postData) {
    return await this.homeService.checkEmail(postData);
  }

  async bookRoom(pData) {
    return await this.homeService.saveBooking(pData);
  }

  async registerUser(pData) {
    return await this.homeService.saveUser(pData);
  }

  async checkLogin(pData) {
    return await this.homeService.checkLogin(pData);
  }
}
