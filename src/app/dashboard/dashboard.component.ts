import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public rooms: Object[];
  mode:string;
  loggedInUser: string;
  isAdmin: boolean;
  constructor(private service: SharedService, private router: Router) {
    this.mode = "start";
  }

  ngOnInit() {
    this.service.getRooms
      .subscribe((rooms: Array<object>) => {
        if (rooms != null) {
          this.rooms = rooms;
        }
      });
    this.loggedInUser = this.service.getLoggedInUsername();
    this.isAdmin = this.service.isAdmin();
  }

  navigateTo(mode:string){
    if(mode == 'logout'){
      this.logout();
    }else{
      this.mode = mode;
    }   
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

