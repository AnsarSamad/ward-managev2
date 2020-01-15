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

  email:string
  username:string
  password:string
  confirmpassword: string;
  mode: string = "login";
  constructor(private service: SharedService, private router: Router, private snackbar: MatSnackBar) {
    this.reset();
  }

  ngOnInit() {
  }

  login() {
    if(this.username.length > 0 && this.password.length >0){
      this.service.signIn(this.username, this.password)
      .subscribe((res:any) => {
        if (res != null ) {
          if (!res.status) {
            this.openSnackBar(res.error, 'Waiting for approval');
          } else {
            sessionStorage.setItem('user', res.user['displayName']);
            sessionStorage.setItem('isAdmin', '' + res.isAdmin);
            this.router.navigate(['/dashboard']);
          }

        } else {
          this.openSnackBar('Invalid User, Please try again', 'Invalid');
        }
      })
    }else{
      this.openSnackBar('Invalid Username or Password, Please try again', 'Invalid');
    }
    
  }

  register() {
    if(this.email.length > 0 && this.username.length > 0 && this.password.length >0 && this.confirmpassword.length >0){
      if (this.password == this.confirmpassword) {
        this.service.signUp(this.email , this.username,this.password).subscribe((res:any) => {
          if(!res.status){
            this.openSnackBar(res.error,'');
          }else{
            this.mode = "login";
            this.reset();
            this.router.navigate(['/login']);
            this.openSnackBarv2('User added successfully, You will be able to login only after admin approve you ', 'Waiting for approval', 4000);  
          }
        })
      } else {
        this.openSnackBar('Password and Confirm password does not match', 'Password Mismatch')
      }
    }else{
      this.openSnackBar('Invalid Username or Password ,Please try again', 'Password Mismatch')
    }
    
  }

  toggleMode(mode: string) {
    this.reset();
    this.confirmpassword = "";
    this.mode = mode;
  }
  reset() {
    this.username = "";
    this.password = "";
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

  toggleModes(mode){
    this.mode = mode;
  }
}
