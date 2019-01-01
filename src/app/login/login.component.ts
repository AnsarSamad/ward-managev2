import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  confirmpassword: string;
  mode: string = "login";
  constructor(private service: SharedService, private router: Router) {
    this.user = {
      username: '',
      password: '',
      isAdmin: false
    }
  }

  ngOnInit() {
  }

  login() {
    this.service.getUsers.subscribe((res) => {
      res.forEach((element: User) => {
        if (element.username.toUpperCase() == this.user.username.toUpperCase() && element.password.toUpperCase() == this.user.password.toUpperCase()) {
          if (element.isApproved) {
            sessionStorage.setItem('user', element.username.toString());
            sessionStorage.setItem('isAdmin', '' + element.isAdmin);
            this.router.navigate(['/dashboard']);
          } else {

          }
          return;
        } else {

        }

      });
    })
  }

  register() {
    if (this.user.password == this.confirmpassword) {
      this.service.addUser(this.user).subscribe(res => {
        this.router.navigate(['/login']);
      })
    } else {
    }
  }

  toggleMode(mode: string) {
    this.mode = mode;
  }

}
