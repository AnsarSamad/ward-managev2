import { Component, OnInit } from '@angular/core';
import { User } from '../login/User';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.css']
})
export class UsermanageComponent implements OnInit {

  users: Array<User>;
  constructor(private service: SharedService) { }

  ngOnInit() {
    this.service.getUsers.subscribe((res: Array<User>) => {
      this.users = res;
    })
  }

  approveUser(user: User, status: boolean) {
    this.service.approveUser(user, status).subscribe(res => {
    })
  }

  deleteUser(user: User) {
    this.service.deleteUser(user).subscribe((res)=>{
      
    })
  }

}
