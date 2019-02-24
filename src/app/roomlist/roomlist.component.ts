import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {

  @Input() rooms: Object[];
  constructor() { }

  ngOnInit() {
  }

}
