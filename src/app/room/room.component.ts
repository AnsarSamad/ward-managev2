import { Component, Input } from '@angular/core';
import { Room } from './Room';
import { Router } from '@angular/router'
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  //private rooms = null;
  @Input() room: Room;
  constructor(private service: SharedService, private router: Router) { }


  getCount() {
    return new Array(25);
  }

  doCheckIn(room: Room, status: boolean) {
    this.service.doCheckIn(room, status).subscribe(res => {
      console.log('room updated');
      if (!status && !this.service.isAdmin()) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAdmin');
        this.router.navigate(['login']);
      }
    })
  }

  deleteRoom(roomId: string) {
    this.service.deleteRoom(roomId).subscribe(res => {
      console.log('room deleted');
    })
  }
}
