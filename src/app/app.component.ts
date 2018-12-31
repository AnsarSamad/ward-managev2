import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../../src/environments/environment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ward-manage';
  rooms = new Array(25);
  private settings = { timestampsInSnapshots: true };
  ngOnInit() {
    firebase.initializeApp(environment.firebase_config);
    firebase.firestore().settings(this.settings);

  }
  constructor() {

  }
}
