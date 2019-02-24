import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { Room } from '../room/Room';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  room: Room;
  @Output() gotoHome = new EventEmitter<string>();

  constructor(private service: SharedService, private router: Router) {
    this.room = {
      roomNo: '',
      roomName: '',
      optedOutTime: '',
      optedInTime: '',
      isDoctorIn: false,
      desc: '',
      currentlyOptedIn: '',
    }
  }

  ngOnInit() {
  }

  addRoom() {
    this.service.addRoom(this.room).subscribe((res) => {
      this.router.navigate(['/dashboard']);
    })
  }

  home(){
    this.gotoHome.emit('start');
  }
}
