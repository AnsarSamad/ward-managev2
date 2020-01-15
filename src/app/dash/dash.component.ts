import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  menu:string  =  "Dashboard";
  constructor() { }

  ngOnInit() {
  }

  setMenu(menuSelected){
    this.menu = menuSelected;
  }
}
