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
        if (element.username == this.user.username && element.password == this.user.password) {
          if (element.isApproved) {
            console.log('username:' + JSON.stringify(element));
            sessionStorage.setItem('user', element.username.toString());
            sessionStorage.setItem('isAdmin', '' + element.isAdmin);
            this.router.navigate(['/dashboard']);
            console.log('got it user');
          } else {
            console.log('user not approved');
          }
          return;
        } else {
          console.log('invalid user');
        }
        
      });
    })
  }

  register() {
    console.log('register user:' + JSON.stringify(this.user))
    if (this.user.password == this.confirmpassword) {
      this.service.addUser(this.user).subscribe(res => {
        console.log('user registered');
        this.router.navigate(['/login']);
      })
    } else {
      console.log('password mismatch')
    }
  }

  toggleMode(mode: string) {
    this.mode = mode;
  }

}
