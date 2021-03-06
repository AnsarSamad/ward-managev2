import { Component, ViewChild,ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  @Output() gotoHome = new EventEmitter<string>();
  rows = [];

  temp = [];

  columns = [
    { name: 'userid' },
    { name: 'roomNo' },
    { name: 'optedIn' },
    { name: 'optedOut' },
    { name: 'timeSpend' }
  ];
  constructor(public service:SharedService) {
    this.service.getHistory().subscribe((data) => {
      this.temp = [...data];
      this.rows = data;
    });
  }

   updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.userid.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }

  home(){
    this.gotoHome.emit('start');
  }
}
