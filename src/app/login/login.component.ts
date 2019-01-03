import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  confirmpassword: string;
  mode: string = "login";
  constructor(private service: SharedService, private router: Router, private snackbar: MatSnackBar) {
    this.reset();
  }

  ngOnInit() {
  }

  login() {
    this.service.validate(this.user.username, this.user.password)
      .subscribe((res) => {
        if (res != null && res != false) {
          if (!res.isApproved) {
            this.openSnackBar('User not approved yet, Please contact admin', 'Waiting for approval');
          } else {
            sessionStorage.setItem('user', res.username.toString());
            sessionStorage.setItem('isAdmin', '' + res.isAdmin);
            this.router.navigate(['/dashboard']);
          }

        } else {
          this.openSnackBar('Invalid User, Please try again', 'Invalid');
        }
      })
  }

  register() {
    if (this.user.password == this.confirmpassword) {
      this.service.addUser(this.user).subscribe(res => {
        this.mode = "login";
        this.reset();
        this.router.navigate(['/login']);
        this.openSnackBarv2('User added successfully, You will be able to login only after admin approve you ', 'Waiting for approval', 4000);
      })
    } else {
      this.openSnackBar('Password and Confirm password does not match', 'Password Mismatch')
    }
  }

  toggleMode(mode: string) {
    this.reset();
    this.confirmpassword = "";
    this.mode = mode;
  }
  reset() {
    this.user = {
      username: '',
      password: '',
      isAdmin: false
    }
  }
  openSnackBarv2(message: string, action: string, duration: number) {
    this.snackbar.open(message, action, {
      duration: duration,
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }
}
