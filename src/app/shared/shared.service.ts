import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Room } from '../room/Room';
import { User } from '../login/User';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  ref = firebase.firestore().collection('room');
  constructor(public datePipe: DatePipe) {
  }

  getRooms = new Observable(observer => {
    this.ref.onSnapshot((querySnapshot) => {
      let rooms: Array<object> = [];
      querySnapshot.docs.forEach(r => {
        var obj = r.data();
        obj.id = r.id;
        rooms.push(obj);
      })
      observer.next(rooms)
    });
  });

  addRoom(room: object): Observable<any> {
    var id = Math.floor(Math.random() * 10000) + 1;
    return new Observable((observer) => {
      room['id'] = id + room['roomNo'];
      this.ref.firestore.collection('room').doc('' + id).set(room).then((rm) => {
        observer.next(rm);
      })
    });
  }

  validate(username:string,password:string):Observable<any>{
    return new Observable((observer)=>{
      this.ref.firestore.collection('users')
      .where("username","==",username)
      .where("password","==",password)
      .get()
      .then(res=>{
        if(res.docs.length ==1){
          observer.next(res.docs[0].data());
        }else{
          observer.next(false);
        }
      
      })
    })
  }

  getUsers = new Observable<Array<object>>(observer => {
    this.ref.firestore.collection('users').onSnapshot((QuerySnapshot) => {
      let users: Array<object> = [];
      QuerySnapshot.docs.forEach(r => {
        var obj = r.data();
        obj.id = r.id;
        users.push(obj);
      })
      observer.next(users);
    })
  })

  doCheckIn(room: Room, isChekIn: boolean): Observable<any> {
    return new Observable((observer) => {
      var user = sessionStorage.getItem('user').toString();
      var optedInTime = null;
      if (isChekIn) {
        room.currentlyOptedIn = user;
        room.optedInTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        room.isDoctorIn = true;
      } else {
        optedInTime = room.optedInTime;
        room.currentlyOptedIn = '';
        room.optedInTime = ''
        room.isDoctorIn = false;
      }
      this.ref.firestore.collection('room').doc(room.id).set(room).then(res => {
        if (!isChekIn) { // add to history while check out
          this.addHistory(room.roomNo, optedInTime)
            .then((status) => {
              observer.next(res);
            });
        } else {
          observer.next(res);
        }

      })
    });
  }

  addHistory(roomNo: string, OptedIn: string) {
    var optedInDate = new Date(OptedIn);
    var OptedOutDate = new Date();
    var diff = OptedOutDate.getSeconds() - optedInDate.getSeconds();
    var timeSpendInMinute = Math.round(diff/60);
    if(timeSpendInMinute < 1){
      timeSpendInMinute = 1;
    }
    console.log('timeSpendInMinute:'+timeSpendInMinute);
    var history = {
      "optedOut": this.datePipe.transform(OptedOutDate, 'yyyy-MM-dd HH:mm:ss'),
      "optedIn": OptedIn,
      "roomNo": roomNo,
      "timeSpend": timeSpendInMinute,
      "userid": this.getLoggedInUsername()
    };
    return new Promise((resolve, reject) => {
      this.ref.firestore.collection('history').add(history)
        .then((res) => {
          resolve(true);
        })
    })
  }

  deleteRoom(roomId: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.firestore.collection('room').doc(roomId).delete()
        .then(succ => {
          observer.next(succ);
        })
    })
  }

  approveUser(user: User, isApprove: boolean): Observable<any> {
    if (isApprove) {
      user.isApproved = true;
    } else {
      user.isApproved = false;
    }
    return new Observable((observer) => {
      this.ref.firestore.collection('users').doc(user.id).set(user)
        .then(res => {
          observer.next(res);
        })
    })
  }

  isUserAlreadyCheckedIn(user: string, isCheckIn: boolean): Observable<boolean> {
    return new Observable((observer) => {
      if (!isCheckIn) {
        observer.next(false);
      } else {
        this.ref.firestore.collection('room').where("currentlyOptedIn", "==", user.trim())
          .get().then((res) => {
            observer.next(res != null && res.docs.length > 0);
          })
      }
    })
  }

  getHistory(): Observable<any> {
    return new Observable((observer) => {
      this.ref.firestore.collection('history').onSnapshot((snap) => {
        let history: Array<object> = [];
        snap.docs.forEach(hist => {
          history.push(hist.data());
        })
        console.log('history data:' + JSON.stringify(history))
        var sortedHistory: Array<Object> = history.sort((obj1, obj2) => {
          const opt1 = obj1['optedIn'].toLowerCase();
          const opt2 = obj2['optedIn'].toLowerCase();
          if (opt1 > opt2) { return -1; }
          if (opt1 < opt2) { return 1; }
          return 0;
        })
        observer.next(sortedHistory);
      })
    })
  }
  addUser(user: User): Observable<any> {
    return new Observable((observer) => {
      this.ref.firestore.collection('users').add(user).then(res => {
        observer.next(true);
      })
    })
  }
  deleteUser(user: User): Observable<boolean> {
    return new Observable((observer) => {
      this.ref.firestore.collection('users').doc(user.id).delete()
        .then(res => {
          observer.next(true);
        })
    })
  }
  isLoggedIn() {
    var user = sessionStorage.getItem('user');
    return typeof user != 'undefined' && user != null;
  }

  getLoggedInUsername() {
    var user = sessionStorage['user'];
    return user;
  }

  isAdmin() {
    var admin = sessionStorage['isAdmin'];
    return admin == "true";
  }

}