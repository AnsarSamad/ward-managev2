import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import * as firebase from 'firebase';
import { Room } from '../room/Room';
import { User } from '../login/User';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  ref = firebase.firestore().collection('room');
  constructor() {
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

  getUsers = new Observable<Array<object>>(observer => {
    this.ref.firestore.collection('users').get().then(QuerySnapshot => {
      let users: Array<object> = [];
      QuerySnapshot.docs.forEach(r => {
        var obj = r.data();
        obj.id = r.id;
        users.push(obj);
      })
      observer.next(users)
    })
  })

  doCheckIn(room: Room, isChekIn: boolean): Observable<any> {
    return new Observable((observer) => {
      var user = sessionStorage.getItem('user').toString();
      if (isChekIn) {
        room.currentlyOptedIn = user;
        room.optedInTime = new Date().toString();
        room.isDoctorIn = true;
      } else {
        room.currentlyOptedIn = '';
        room.optedInTime = ''
        room.isDoctorIn = false;
      }
      this.ref.firestore.collection('room').doc(room.id).set(room).then(res => {
        observer.next(res);
      })
    });

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

  addUser(user: User): Observable<any> {
    return new Observable((observer) => {
      this.ref.firestore.collection('users').add(user).then(res => {
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