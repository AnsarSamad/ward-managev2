import { Component, Input, OnInit } from '@angular/core';
import { Room } from './Room';
import { Router } from '@angular/router'
import { SharedService } from '../shared/shared.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  //private rooms = null;
  @Input() room: Room;
  isAdmin: boolean;
  currentlyLoggesIn:string;
  constructor(private service: SharedService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isAdmin = this.service.isAdmin();
    this.currentlyLoggesIn = this.service.getLoggedInUsername();
  }

  getCount() {
    return new Array(25);
  }

  doCheckIn(room: Room, status: boolean) {
    const user = sessionStorage.getItem('user');
    this.service.isUserAlreadyCheckedIn(user, status)
      .subscribe((isAlreadyCheckedIn) => {
        if (isAlreadyCheckedIn) {
          this.openSnackBar('User is already checked in', 'Already Checked In');
        } else {
          this.service.doCheckIn(room, status).subscribe(res => {
            if (!status && !this.service.isAdmin()) {
              sessionStorage.removeItem('user');
              sessionStorage.removeItem('isAdmin');
              this.openSnackBar(status ? "User Checked In" : "User Checked Out Successfully", 'Checked Out');
              this.router.navigate(['login']);
            } else {
              this.openSnackBar(status ? "User Checked In Successfully" : "User Checked Out Successfully", status ? 'Checked In' : 'Checked Out');
            }
          })
        }
      })

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  deleteRoom(roomId: string) {
    this.service.deleteRoom(roomId).subscribe(res => {
    })
  }
}
